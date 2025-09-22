# AI Boost Toolbox for SAP RISE

AI Boost Toolbox for SAP RISE is your primary resource to access the best of Gemini and other Gen AI tools, delivered within a SAP consultant-friendly interface to jump start your creativity.

Using AI AI Boost Toolbox for SAP RISE, you are empowered to generate content & images, conduct research, identify insights, generate ideas, and accelerate your productivity. Simply click on a relevant card and we'll get the conversation started with the most capable AI model. In addition, we're providing links to other Generative AI tools available within Google to guide marketers towards the best solutions.

This document is a deployment guide targeted towards AI Boost Toolbox for SAP RISE engineers and vendor partners.
It is a fork of AI Marketing Toolbox

Original AI Marketing Toolbox Author: <stdawson@google.com>

Current team: palkin@google.com, adrianbe@google.com

<br/>

## Technical Overview

AI Boost Toolbox for SAP RISE is a Google Cloud AppEngine application that uses Flask for serving, Angular for the user interface, and Firestore for data storage. The Glue front-end library and Material Design is used extensively across the user interface to deliver a Googley, accessible, and on-brand interface.

As it relates to Generative AI, we've intgrated with the latest-available models within Google, including Gemini 1.5 Pro and Imagen 3.

We seamlessly switch to the best available AI model based on the desired marketing activity -- all of which is transparent to the user and delivered through a unified chat experience. In addition, we support multi-modal conversations involving text, documents, images and more.

The Action Cards in the user interface drive system prompts, which utilize prompt engineering best practices to prime the model for use in a Google Marketing context. In addition, users now have the ability to create their own action cards, similar to Gemini Gems.

Finally, we're using SynthId watermarking for image outputs.

<br/>

## GCP Environments

| Environment      | GCP Project Id                          | URL                                                        |
| ---------------- | --------------------------------------- | ---------------------------------------------------------- |
| Production (new) | tbd                                     | tbd                                                        |
| Staging          | sapboost-ai-4cdf-nonprod                | https://sapboost-ai-4cdf-nonprod.ew.r.appspot.com/         |

<br/>

## Architecture

![Architecture Diagram](architecture.png)<br/>
_Source: https://gcpdraw.googleplex.com/diagrams/7a8de358-23e9-44dc-9f57-4aeda0e1a825_

<br/>

## Codebase

The codebase is hosted on Git-on-Borg.

**Source Code Repository:** tbd

**Gerritt:** tbd

**Key Components:**

| Path                         | Notes |
| ---------------------------- | ----- |
| ./                           | Root directory containing flask backend (main.py) |
| ./angular/*                  | Angular UI application root |
| ./angular/src/app/*          | Angular UI source code and index page |
| ./angular/src/app/chat/*     | Chat UI components |
| ./angular/src/app/about/*    | About UI components |
| ./angular/src/app/admin/*    | Admin UI components |
| ./angular/src/app/admin/*    | Global services |
| ./angular/src/assets/*       | Static assets (e.g. images) |
| ./angular/src/environments/* | Build config files for local development, staging & production |
<br/>

## Build & Deployment

Setting the GCP deployment environment:

```bash
gcloud init
```

Building the Angular application:

```bash
ng build --configuration <ENVIRONMENT_NAME>
```

_Note: <ENVIRONMENT_NAME> can be either "staging" or "production" (without quotes)_

Deploying to Google Cloud:

```bash
gcloud app deploy
```

_Note: Ensure configuration used for the Angular build matches the target GCP environment_

<br/>

## Configuring a new GCP environment

_Note: These steps are only necessary if we are creating a new GCP enviroment from scratch (e.g. staging, prod, etc)_

- Create a new GCP project in Overground in the relevant folder based on the type of environment.
- Create new Firebase project and associate it to the existing GCP Project. Do not create an Analytics account.
- Enable Firebase Authentication and the Google provider.
- Enable Cloud Firestore Database (defaults, production mode).
- Copy / Paste Firestore rules.
- Enable AppEngine in GCP console (required before enabling Storage in Firebase).
- Create Storage Bucket in Firebase.
- Copy / Paste Storage rules.
- Enable Vertex AI in GCP console.
- Create a new Web App in Firebase and create new environment profile in /angular/src/environments/.
- Update angular.json to configure build settings for new environment.
- Add a lifecycle rule to the Cloud Storage bucket. Select an Action: Delete object. Select Object Conditions - Object name matches prefix: fileUpload/. Set Conditions - Age: 1 day.
- Export / import relevant database tables (/configuration/production/ at a minimum). Grant access using:
```bash
gsutil iam ch serviceAccount:service-<SOURCE_PROJECT_NUMBER>@gcp-sa-firestore.iam.gserviceaccount.com:roles/storage.admin gs://<TARGET_BUCKET_NAME>
```
- Update the Web Client Credentials in GCP Console to include new JavaScript origins: http://localhost:4200 and https://<GCP_PROJECT_ID>.googleplex.com
- Configure the OAuth Consent screen and OAuth Scopes.
- Grant editor access to the default AppEngine service account.
- Deploy Cloud Storage CORS configuration:
```bash
gsutil cors set cors.json gs://<BUCKET_NAME>
```
