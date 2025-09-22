import os
from flask import Flask, request, jsonify, send_from_directory, send_file, make_response, session
from flask_cors import CORS,cross_origin
from google.cloud import aiplatform, firestore, texttospeech
import datetime
from vertexai.generative_models import GenerativeModel, Part
from vertexai.preview.vision_models import ImageGenerationModel
#from vertexai.preview.language_models import TextGenerationModel
import markdown
from uuid import uuid4
from google.oauth2 import id_token
from google.auth.transport import requests
import urllib.request
from base64 import b64encode

app = Flask(__name__)
app.secret_key = "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you."
CORS(app)

db = firestore.Client()
sessions = db.collection('sessions')
feedbackForm = db.collection('feedbackForm')
users = db.collection('users')

messages = []

chat_parameters = {
    "temperature": 0.2,
    "max_output_tokens": 2048,
    "top_p": 0.95,
    "top_k": 40
}

CLIENT_ID = "1022151286765-id3ertjpl53etspt77venjnjn6ur5mfu.apps.googleusercontent.com"

# config = GenerationConfig(max_output_tokens=2048, temperature=0.4, top_p=1, top_k=32)

# Serve Angular static files
@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
  return send_from_directory(os.path.join(os.path.dirname(__file__), './angular/dist/angular'), path)

# Serve the main Angular application
@app.route('/', methods=['GET'])
@app.route('/feedback', methods=['GET'])
@app.route('/about', methods=['GET'])
@app.route('/admin', methods=['GET'])
def serve_app():
    return send_from_directory(os.path.join(os.path.dirname(__file__), './angular/dist/angular'), 'index.html')


@app.route('/login', methods=['POST'])
def login():
  data = request.json
  user = None

  # log in with credential token (first-time login for a new user)
  if 'token' in data and 'uid' in data:
    idinfo = None

    try:
      idinfo = id_token.verify_firebase_token(data['token'], requests.Request())
    except ValueError as error:
      return jsonify({'status': 'error', 'errorMessage': 'ValueError on login(): ' + str(error)})

    if idinfo is not None and 'sub' in idinfo:
      userId = idinfo['sub']
      
      doc_ref = users.document(document_id=data['uid'])
      doc = doc_ref.get()
      if doc.exists:
        user = doc.to_dict()
      else:
        
        fullNameArray = idinfo['name'].strip().split()
        givenName = ''
        familyName = ''
        if len(fullNameArray) > 0:
          givenName = fullNameArray[0]
          familyName = fullNameArray[-1]
        
        user = {
          'id': userId,
          'email': idinfo['email'],
          'familyName': familyName,
          'givenName': givenName,
          'name': idinfo['name'],
          'photoUrl': idinfo.get('picture', '/assets/user_icon.png')
        }
        doc_ref.set(user)

      return jsonify({'status': 'success', 'user': user})
    else:
      return jsonify({'status': 'error', 'errorMessage': 'The request could not be processed. (1)'})

  # log in with user id (auto login for an existing user)
  elif 'uid' in data:
    doc_ref = users.document(document_id=data['uid'])
    doc = doc_ref.get()
    user = doc.to_dict()
    if doc.exists:
      return jsonify({'status': 'success', 'user': user})
    else:
      return jsonify({'status': 'error', 'errorMessage': 'User not found.'})

  else:
    return jsonify({'status': 'error', 'errorMessage': 'The request could not be processed. (2)'})



# send_message service call
@app.route('/send_message', methods=['POST'])
def send_message():
  data = request.json
  if 'message' in data and 'sessionId' in data:
      message = data['message']
      sessionId = data['sessionId']

      systemPrompt = ""
      if 'systemPrompt' in data:
        systemPrompt = data['systemPrompt']
      
      documents = None
      if 'documents' in data:
        documents = data['documents']

      model = GenerativeModel(model_name="gemini-1.5-pro-002", system_instruction=[systemPrompt])

      chatResponse = generate_chat_response(model, sessionId, message, documents)

      response = make_response(jsonify({'status': 'success', 'response': chatResponse}))

      return response
  else:
    return jsonify({'status': 'error', 'errorMessage': 'The request could not be processed.'})

# send_image_request service call
@app.route('/send_image_request', methods=['POST'])
def send_image_request():
    data = request.json
    if 'message' in data:
        response = generate_image_response(data['message'])

        if (response is not None and len(response.images) > 0):
            
            # yikes, this is hacky -- clean up. jsonify doesn't natively support lists. can't call len() directly on response object.
            jsonResponse = ''
            imageCount = len(response.images)
            if (imageCount == 4):
                jsonResponse = jsonify({'status': 'success', 'image1': response[0]._as_base64_string(), 'image2': response[1]._as_base64_string(), 'image3': response[2]._as_base64_string(), 'image4': response[3]._as_base64_string()})
            elif (imageCount == 3):
                jsonResponse = jsonify({'status': 'success', 'image1': response[0]._as_base64_string(), 'image2': response[1]._as_base64_string(), 'image3': response[2]._as_base64_string()})
            elif (imageCount == 2):
                jsonResponse = jsonify({'status': 'success', 'image1': response[0]._as_base64_string(), 'image2': response[1]._as_base64_string()})
            elif (imageCount == 1):
                jsonResponse = jsonify({'status': 'success', 'image1': response[0]._as_base64_string()})
            else:
                jsonResponse = jsonify({'status': 'error'})
            return jsonResponse
        else:
            return jsonify({'status': 'error', 'errorMessage': 'Apologies, I wasn\'t able to provide the requested images 😔. One of the images generated may have been caught by a safety filter. For instance, images generated with humans, copyrighted material, or other sensitive categories may have been blocked. Don\'t worry, you\'ve done nothing wrong 🙏 -- just try again with a new prompt!'})
    else:
        return jsonify({'status': 'error', 'errorMessage': 'Apologies, I didn\'t see a prompt in the request. Please provide a prompt.'})
    

# send_audio_request service call
@app.route('/send_audio_request', methods=['POST'])
def send_audio_request():
    data = request.json
    if 'message' in data and 'locale' in data and 'gender' in data and 'name' in data:
      response = generate_audio_response(data['message'], data['locale'], data['gender'], data['name'])
      if (response is not None and response.audio_content is not None):
        response = jsonify({'status': 'success', 'audio' : b64encode(response.audio_content).decode('utf-8')})
        return response
      else:
        return jsonify({'status': 'error', 'errorMessage': 'Apologies, I wasn\'t able to process your request. Please try again! If the issue persists, please submit feedback.'})
    else:
      return jsonify({'status': 'error', 'errorMessage': 'Apologies, I didn\'t see a prompt in the request. Please provide a prompt.'})


# Gen AI response feedback service call
@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    if 'feedback' in data and 'sessionId' in data and 'botMessageIndex' in data and (data['feedback'] == 'positive' or data['feedback'] == 'negative'):
        botMessageIndex = data['botMessageIndex']
        feedback = data['feedback']
        sessionId = data['sessionId']

        save_feedback(sessionId, botMessageIndex, feedback)

        response = make_response(jsonify({'status': 'success', 'response': ''}))

        return response
    else:
      return jsonify({'status': 'error', 'errorMessage': 'The request could not be processed.'})


# Form feedback service call
@app.route('/feedbackForm', methods=['POST'])
def feedback_form():
    data = request.json
    if 'feedback' in data:

      save_feedback_form(data['feedback'])

      response = make_response(jsonify({'status': 'success', 'response': ''}))

      return response
    else:
      return jsonify({'status': 'error', 'errorMessage': 'The request could not be processed.'})


# Form feedback retrieval
@app.route('/feedbackFormResults', methods=['GET'])
def feedback_form_results():
    #doc_ref = feedbackForm.document()
    feedbackList = feedbackForm.order_by("timestamp").stream()

    docs = []
    for feedbackItem in feedbackList:
      newDoc = feedbackItem.to_dict()
      docs.append(newDoc)

    if len(docs) > 0:
        return jsonify({'status': 'success', 'response': docs})
    else:
        return jsonify({'status': 'error', 'errorMessage': 'There is no feedback to return.'})


@app.route("/_ah/warmup")
def warmup():
    return "", 200, {}


@app.after_request
def add_header(response):
  response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
  response.headers['Pragma'] = 'no-cache'
  return response


def generate_chat_response(model, sessionId, message, documents):
  transaction = db.transaction()
  session = get_session_data(transaction, sessionId)

  parts = []
  if (documents != None):
    for document in documents:
      parts.append({
        'file_data': {
          'mime_type': "application/pdf",
          'file_uri': document
       }
      })
  parts.append({'text': message})

  session['history'].append({'role':'user', 'parts': parts})

  response = model.generate_content(session['history'])
  session['history'].append({'role': response.candidates[0].content.role, 'parts': [{"text": response.candidates[0].content.text}]})
  set_session_data(transaction, sessionId, session)
  return markdown.markdown(response.candidates[0].content.text)


def save_feedback(sessionId, botMessageIndex, feedback):

  transaction = db.transaction()
  session = get_session_data(transaction, sessionId)
  if (len(session['history']) > 0):
    session['feedback'].append({'botMessageIndex': botMessageIndex, 'feedback': feedback})
  set_session_data(transaction, sessionId, session)


def save_feedback_form(data):
  doc_ref = feedbackForm.document()
  data['timestamp'] = firestore.SERVER_TIMESTAMP;
  doc_ref.set(data)


def generate_image_response(message):
    try:
        images = imagen.generate_images(
            prompt=message,
            number_of_images=4,
            language="en",
            add_watermark=True,
            aspect_ratio="1:1",
            safety_filter_level="block_some",
            person_generation="dont_allow"
        )
        return images
    except:
        return None


def generate_audio_response(message, locale, gender, name):
    try:
        client = texttospeech.TextToSpeechClient()

        ssml_gender = texttospeech.SsmlVoiceGender.FEMALE
        if (gender == 'MALE'):
          ssml_gender = texttospeech.SsmlVoiceGender.MALE
        elif (gender == 'NEUTRAL'):
          ssml_gender = texttospeech.SsmlVoiceGender.NEUTRAL
        
        synthesis_input = texttospeech.SynthesisInput(text = message)
        voice = texttospeech.VoiceSelectionParams(
          language_code=locale,
          ssml_gender=ssml_gender,
          name=name
        )
        audio_config = texttospeech.AudioConfig(
          audio_encoding=texttospeech.AudioEncoding.LINEAR16
        )
        response = client.synthesize_speech(
          input=synthesis_input, voice=voice, audio_config=audio_config
        )
        return response
    except:
        return None
    

def init_imagen():
    global imagen
    imagen = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")


@firestore.transactional
def get_session_data(transaction, session_id):

  doc_ref = sessions.document(document_id=session_id)
  doc = doc_ref.get(transaction=transaction)
  if doc.exists:
      session = doc.to_dict()
  else:
      session = {
        'session_id': session_id,
        'history': [],
        'feedback': [],
        'timestamp': firestore.SERVER_TIMESTAMP,
        'expireAt': datetime.datetime.now() + datetime.timedelta(days=1)
      }

  transaction.set(doc_ref, session)
  return session


@firestore.transactional
def set_session_data(transaction, session_id, session):

  doc_ref = sessions.document(document_id=session_id)
  doc = doc_ref.get(transaction=transaction)
  session['timestamp'] = firestore.SERVER_TIMESTAMP
  if doc.exists:
      transaction.set(doc_ref, session)

  return session


init_imagen()

if __name__ == '__main__':
    app.run(debug=True)
