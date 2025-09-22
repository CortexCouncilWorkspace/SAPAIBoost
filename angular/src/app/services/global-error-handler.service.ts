import { ErrorHandler, Injectable } from '@angular/core';
import { escape } from 'querystring';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  errorHandler: any;

  constructor() {
    
    document.addEventListener('DOMContentLoaded', () => {
      if (environment.production) {
        this.errorHandler = new (window as any).StackdriverErrorReporter();
        this.errorHandler.start({
          key: environment.firebase.apiKey,
          projectId: environment.firebase.projectId
        });
      }
      else {
        this.errorHandler = { report: console.error };
      }
    });
  }

  public handleError(e: any): void {

    // if we are running in production
    if (environment.production) {

      // if the error doesn't have a proper stack trace, wrap it in an error
      let error = e;
      if (!e.stack) {
        if (typeof e === 'string' || e instanceof String)
          error = new Error(e + '');
        else if (e instanceof Error)
          error = new Error(e.message, {cause: e});
        else
          error = new Error(e + '');
      }
      
      // report the error
      this.errorHandler.report(error);
    }

    console.error(e);
  }

}
