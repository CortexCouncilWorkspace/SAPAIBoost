import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadString } from "@firebase/storage";

// OAuth scopes to request in order to access the user's Google Drive files (read only)
const GOOGLE_DRIVE_OAUTH_SCOPES = "email profile https://www.googleapis.com/auth/drive.readonly openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email"

// Google Drive file mimetypes for docs, sheets and presentations
const GOOGLE_DRIVE_MIMETYPES = "application/vnd.google-apps.document,application/vnd.google-apps.presentation,application/vnd.google-apps.spreadsheet,application/pdf,image/png,image/jpeg,text/csv";

// Title of the Google Drive Picker window
const GOOGLE_DRIVE_PICKER_TITLE = "Upload Files";

// Message to display if a user is attempting to process a file without adequate premissions
const GOOGLE_DRIVE_INADEQUATE_PERMISSIONS_MESSAGE = "You do not have adequate permissions to process this document. " +
    "Contact the document owner and ensure that document viewers have the option to download and copy. " +
    "For more information, see the following help article: https://support.google.com/docs/answer/2494893";

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  // expose OAuth Scope constant for the authentication service
  public static readonly GOOGLE_DRIVE_OAUTH_SCOPES = GOOGLE_DRIVE_OAUTH_SCOPES;

  // currently uploaded document metadata and bytes for upload on next prompt send
  public processingFileMetadata: any[];

  private storage: any;

  private applicationFolderId: string;

  constructor(private authService: AuthService, private errorService: GlobalErrorHandlerService, private snackBar: MatSnackBar) { 
    this.storage = getStorage();
  }

  /**
   * Initialize Google API client.
   * 
   * TODO: Consider changing GAPI to async / defer and initializing on load.
   */
  public initGAPI() {
    gapi.load('client', function() {
      gapi.client.load('drive', 'v3', function () { });
    });
  }

  /**
   * Open Google drive picker to select a document for processing.
   */
  public openDrivePicker() {
    
    // ensure we have access to Google Drive
    if (!this.authService.googleAccessToken) {
      this.authService.ensureDriveAccess().then((value) => {
        this.authService.googleAccessToken = value;
        this.openDrivePicker();
      });
      return;
    }

    // load the drive picker and show the interface
    gapi.load('picker', () => {
      const showPicker = () => {

        // show documents, presentations and spreadsheets, inclusive of shared drives
        const myDriveView = new google.picker.DocsView().setOwnedByMe(true).setIncludeFolders(true).setMimeTypes(GOOGLE_DRIVE_MIMETYPES);
        const docsView = new google.picker.DocsView().setOwnedByMe(false).setMimeTypes(GOOGLE_DRIVE_MIMETYPES);
        const sharedDriveView = new google.picker.DocsView().setOwnedByMe(false).setEnableDrives(true).setIncludeFolders(true).setMode(google.picker.DocsViewMode.LIST).setMimeTypes(GOOGLE_DRIVE_MIMETYPES);
        const starredView = new google.picker.DocsView().setStarred(true).setIncludeFolders(true).setLabel("Starred").setMimeTypes(GOOGLE_DRIVE_MIMETYPES);
        const uploadView = new google.picker.DocsUploadView().setMimeTypes(GOOGLE_DRIVE_MIMETYPES);
        
        // build and show the picker
        const picker = new google.picker.PickerBuilder()
            .addView(myDriveView)
            .addView(docsView)
            .addView(sharedDriveView)
            .addView(starredView)
            .addView(uploadView)
            .setOAuthToken(this.authService.googleAccessToken)
            .setDeveloperKey(environment.firebase.apiKey)
            .setCallback(this.drivePickerCallback.bind(this))
            .setAppId(environment.firebase.appId)
            .setTitle(GOOGLE_DRIVE_PICKER_TITLE)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
            .setMaxItems(50)
            .build();
        picker.setVisible(true);
      }
      showPicker();
    });
  }

  /**
   * Process a document after it is selected within the drive picker
   */
  private drivePickerCallback(data) {

    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {

      // get the selected document id
      let driveDocs = data[google.picker.Response.DOCUMENTS];

      // extract the list of ids
      let driveDocIds: string[] = [];
      driveDocs.forEach(driveDoc => { driveDocIds.push(driveDoc.id)} );

      // process each of the selected files
      this.processDriveFiles(driveDocIds).then((result) => { })
      .catch((error) => this.errorService.handleError(error));
    }
  }

  /**
   * Process a document for inclusion in a prompt.
   */
  public async processDriveFiles(driveDocIds: string[]) {

    let promises: any[] = [];

    driveDocIds.forEach(driveDocId => {

      promises.push(new Promise<any[]>((resolve, reject) => {

        // get the selected document metadata
        gapi.client.drive.files.get({'fileId': driveDocId, fields: '*', supportsAllDrives: 'true' }).then((r) => {

          if (r.result.exportLinks == null) {

            let error = "processDriveFile(): exportLinks is null. [canCopy: " + r.result.capabilities.canCopy + 
              ", copyRequiresWriterPermission: " + r.result.copyRequiresWriterPermission +
              ", viewersCanCopyContent = " + r.result.viewersCanCopyContent + "]";

            // show the user inadequate permissions message
            this.snackBar.open(GOOGLE_DRIVE_INADEQUATE_PERMISSIONS_MESSAGE, "Close");
            
            reject(error);
          }
          else {

            // save the document metadata for display in the UI
            this.processingFileMetadata.push(r.result);

            // extract the URL to retrieve a PDF of the selected document
            var exportLink = r.result.exportLinks['application/pdf'];

            // get the document bytes in base64 format for sending in the next prompt
            this.getDocFromUrl(exportLink)
              .then(docBytes => {

                // strip the header to suport base64 decoding
                let docBytesFinal = (docBytes + "").replace("data:application/pdf;base64,", "");

                // upload document to Cloud Storage using a unique id
                let docName = uuidv4()
                let storageRef = ref(this.storage, "fileUpload/" + docName);
                uploadString(storageRef, docBytesFinal, 'base64', { contentType: 'application/pdf' }).then((snapshot) => {

                  // set file Cloud Storage URI and indicate the document is loaded
                  r.result.processingFileUri = snapshot.ref + "";
                  r.result.loaded = true;

                  resolve(this.processingFileMetadata);
                });
              })
              .catch(error => {
                this.errorService.handleError(error);
                reject(error);
              });
            }
        }).catch((error) => this.errorService.handleError(error));

      }));

    });
    
    return Promise.all(promises);
  }

  /**
   * Get a document from Google Drive based on the url
   */
  private async getDocFromUrl(url) {

    // added acess token and fetch the document as a blob
    const headers = { 'Authorization': 'Bearer ' + this.authService.googleAccessToken };
    var res = await fetch(url, { headers });
    var blob = await res.blob();

    // read the document bytes and return
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  /**
   * Returns whether documents have been loaded
   */
  public get documentsLoaded(): boolean {
    if (!this.processingFileMetadata || this.processingFileMetadata.length == 0)
      return true;

    let loaded = true;
    this.processingFileMetadata.forEach(file => {
      if (!file.loaded) loaded = false;
    });

    return loaded;
  }

  /**
   * Copy a file.
   */
  public copyFile(fileId: string, newFileName: string, callback: any) {
    
    // ensure we have access to Google Drive
    if (!this.authService.googleAccessToken) {
      this.authService.ensureDriveAccess().then((value) => {
        this.authService.googleAccessToken = value;
        this.copyFile(fileId, newFileName, callback);
      });
      return;
    }

    // if the app folder id hasn't been set, (look up the existing folder or create a new folder) and recur
    if (!this.applicationFolderId) {

      gapi.client.drive.files.list({
        'q': 'name=\'AI Marketing Studio\' and mimeType=\'application/vnd.google-apps.folder\' and trashed=false'
      }).then((response) => {
        
        // if the application folder does not exist create it and recur with new folder id, else recur with existing folder id
        if (response.result.files.length < 1) {

          // create the application folder
          gapi.client.drive.files.create({
            'mimeType': 'application/vnd.google-apps.folder',
            'name': 'AI Marketing Studio'
          }).then((response) => {

            this.applicationFolderId = response.result.id;

            // recur and pass in the new folder id
            this.copyFile(fileId, newFileName, callback);
            
          }, (error) => {
            this.errorService.handleError(error);
          });

        } else {

          this.applicationFolderId = response.result.files[0].id

          // recur and pass in the existing folder id
          this.copyFile(fileId, newFileName, callback);
          
        }

      }, (error) => {
        this.errorService.handleError(error);
      })

    } else {

      // copy the requested file into the application folder and callback
      gapi.client.drive.files.copy({
        'fileId': fileId,
        'supportsAllDrives': true,
        'name': newFileName,
        'parents' : [ this.applicationFolderId ]
      }).then((response) => {
        callback(response);
      }, (error) => {
        this.errorService.handleError(error);
      });

    }
  }
  
}
