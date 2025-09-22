import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CookieService } from 'ngx-cookie-service';

import { initializeApp } from '@firebase/app';
import { GoogleAuthProvider, signInWithCredential, getAuth, setPersistence, browserLocalPersistence, UserCredential, signOut, onAuthStateChanged } from "@firebase/auth";

import { environment } from 'src/environments/environment';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { ConfigService } from './config.service';
import { GoogleDriveService } from './google-drive.service';

// TODO: move Google Drive processing out of the service

// the HTML container element id defined in the header which contains the Google Sign-In button
const GOOGLE_SIGN_IN_ELEMENT_ID = "google-button";

// path to the login endpoint on the server
const LOGIN_ENDPOINT = "/login";

// declare variables that will be present at runtime to avoid typescript complilation issues
declare var window: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
/**
 * Provides services to authenticate the user and authorize access to Google Drive
 */
export class AuthService {

  // user object when logged in
  public user: any;

  // signed in or out?
  public signedIn: boolean = false;
  @Output() signedInStateChanged = new EventEmitter<boolean>();

  // firebase auth and storage objects
  private auth: any;

  // google access token for accessing Drive APIs
  public googleAccessToken?: string;

  // google access token provider for Drive APIs
  private tokenClient: any;

  // flag to indicate we are going through an initial firebase login and user creation flow
  private initialLogin = false;

  /**
   * Initialize components
   */
  constructor(private http: HttpClient, private cookieService: CookieService, private configService: ConfigService, private snackBar: MatSnackBar, private errorService: GlobalErrorHandlerService) { 
    
    // initialize firebase, firebase auth, and firebase storage
    initializeApp(environment.firebase);
    this.auth = getAuth();

    // persist user in local storage for auto-login
    setPersistence(this.auth, browserLocalPersistence);
    
    // firebase auto-login
    onAuthStateChanged(this.auth, (user) => {

      if (user && !this.initialLogin) {

        let uid = user.uid;

        // sign in on the server using a uid
        this.signInOnServer(undefined, uid).then((appUser) => {

          // set the user object
          this.setUserObjectAfterSignIn(user, appUser);

        }).catch(error => this.errorService.handleError(error));

      }
    });

  }

  /**
   * Initialize Google Sign-in and One Tap
   */
  initGoogleSignIn() {
      
    // init Google Sign-In and One Tap
    google.accounts.id.initialize({
      client_id: environment.client_id,
      callback: this.handleSignInCredentialResponse.bind(this),
      auto_select: true,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true,
      itp_support: true
    });

    // render sign-in button
    google.accounts.id.renderButton(document.getElementById(GOOGLE_SIGN_IN_ELEMENT_ID), { theme: "outline", size: "large" } );

    // render one tap after a delay (allow Firebase auto-login to complete first)
    setTimeout(() => {
      if (!this.signedIn) {
        google.accounts.id.prompt();
      }
    }, 1000);
  }


  /**
   * Handle credential response for Google Sign-in
   */
  private async handleSignInCredentialResponse(response: any) {
    if (response && response.credential) {

      this.initialLogin = true;

      // sign in with firebase
      var idCredential = GoogleAuthProvider.credential(response.credential);
      signInWithCredential(this.auth, idCredential).then((r) => {

        r.user.getIdToken().then((idToken) => {

          // sign in on the server, including validating the credential token
          this.signInOnServer(idToken, r.user.uid).then((appUser) => {

            // set the user object
            this.setUserObjectAfterSignIn(r.user, appUser)
            this.initialLogin = false;

          }).catch(error => {
            this.initialLogin = false;
            this.errorService.handleError(error);
          });

        }).catch(error => {
          this.initialLogin = false;
          this.errorService.handleError(error);
        });

      }).catch(error => {
        this.initialLogin = false;
        this.errorService.handleError(error);
      });
      
    }
  }

  /**
   * Set the user object based on the firebase user and user record in Firestore. Set signed in to true.
   */
  private setUserObjectAfterSignIn(firebaseUser, appUser) {
    this.user = firebaseUser;
    this.user.givenName = appUser['givenName'];
    if (appUser['isAdmin'])
      this.user.isAdmin = appUser['isAdmin'];
    if (appUser['isBeta'])
      this.user.isBeta = appUser['isBeta'];
    
    this.configService.loadUserConfig(this.user.uid).then((value) =>
    {
      this.signedIn = true;
      this.signedInStateChanged.emit(this.signedIn);
    })
    .catch((error) => this.errorService.handleError(error));
  }

  /**
   * Sign in on the server, includign validating credential tokens
   */
  private async signInOnServer(token?, uid?) {

    // build credential request if credentials were passed (on initial sign-in)
    let requestJson;
    if (token && uid)
      requestJson = { token: token, uid: uid }
    else if (uid)
      requestJson = { uid: uid }

    return new Promise((resolve, reject) => {
      // log user in on the server
      this.http.post<LoginResponse>(environment.service_prefix + LOGIN_ENDPOINT, requestJson).subscribe({
        next: (data) => {
          if (data.status == "success") {
            // return firebase user object
            resolve(data.user);
          }
          else {
            this.errorService.handleError(data.errorMessage);
            return reject(this);
          }
        },
        error: (error) => {
          this.errorService.handleError(error);
          return reject(this);
        }
      });
    });
  }

  private async ensureDriveAccessCallback(response: any) {

    return new Promise((resolve, reject) => {
      
      this.initialLogin = true;

      // sign in with firebase
      var accessCredential = GoogleAuthProvider.credential(null, response.access_token);

      signInWithCredential(this.auth, accessCredential).then((r) => {

        r.user.getIdToken().then((idToken) => {

          // sign in on the server, including validating the credential token
          this.signInOnServer(idToken, r.user.uid).then((appUser) => {

            // set the user object
            this.setUserObjectAfterSignIn(r.user, appUser)
            this.initialLogin = false;

            this.googleAccessToken = response.access_token;
            resolve(this.googleAccessToken);

          }).catch(error => {
            this.initialLogin = false;
            this.errorService.handleError(error);
          });
          
        }).catch(error => {
          this.initialLogin = false;
          this.errorService.handleError(error);
        });

      }).catch(error => {
        this.initialLogin = false;
        this.errorService.handleError(error);
      });

    });
  }

  /**
   * Ensure Drive access by requesting access token if one doesn't already exist
   */
  public async ensureDriveAccess() {
    
    return new Promise<string>((resolve, reject) => {
      if (!this.googleAccessToken) {
        if (!this.tokenClient) {

          let tokenClientConfig = {
            client_id: environment.client_id,
            scope: GoogleDriveService.GOOGLE_DRIVE_OAUTH_SCOPES,
            prompt: '',
            ux_mode: 'popup',
            callback: (response) => {
              this.ensureDriveAccessCallback(response).then((googleAccessToken) => {
                resolve(googleAccessToken + "");
              });
            }
          };

          if (this.user && this.user.email)
            tokenClientConfig['login_hint'] = this.user.email;

          // init Google Drive token client
          this.tokenClient = google.accounts.oauth2.initTokenClient(tokenClientConfig);
        }
        this.tokenClient.requestAccessToken();
      }
      else {
        resolve(this.googleAccessToken);
      } 
    });
  }

  public async signOut() {
    return signOut(this.auth).then(() => {
      // change sign in flag, remove user, and remove uploaded docs
      this.signedIn = false;
      this.signedInStateChanged.emit(this.signedIn);
      this.user = null;
    }).catch((error) => {
      this.errorService.handleError(error);
    });
  }

}

interface LoginResponse {
  status: string;
  user?: User;
  errorMessage?: string;
}

export class User {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  displayName?: string;
  uid?: string;
  photoURL?: string;
}
