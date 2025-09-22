import { Component, isDevMode } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ErrorStateMatcher } from '@angular/material/core';

import { AnalyticsService, AuthService } from "../services"
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {

  // create a form group for feedback
  feedbackForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    feedbackType: new FormControl<string>('general'),
    feedbackDetails: new FormControl<string>(''),
    rating: new FormControl<string>('')
  });

  // init error handling
  public matcher = new FeedbackFormErrorStateMatcher();
  public hasSubmitted = false;
  public hasCompleted = false;

  constructor(private http: HttpClient, private analyticsService: AnalyticsService, private router: Router, private authService: AuthService, private errorService: GlobalErrorHandlerService) { 
    router.events.subscribe(
    (event) => {
        if ( event instanceof NavigationEnd ) {
          // if navgitaing away from the Feedback form, reset
            this.hasCompleted = false;
        }
    });

    // if signed in, pre-populate the email
    if (authService.signedIn)
      this.feedbackForm.patchValue({
        email: authService.user.email + ""
      });
  } 

  submit(): void {

    // indicate user form submission
    this.hasSubmitted = true;

    // if valid, post the form to the backend
    if (this.feedbackForm.valid) {
      this.http.post<Response>(environment.service_prefix + '/feedbackForm', { feedback:  this.feedbackForm.value }).subscribe({
        next: (data) => {
          this.hasCompleted = true;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }

    this.analyticsService.trackEvent('submit', 'feedbackForm', ''+this.feedbackForm.controls.feedbackType);
  }
}

// error when invalid control is dirty, touched, or submitted.
export class FeedbackFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
