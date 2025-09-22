import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services';
import { GlobalErrorHandlerService } from 'src/app/services/global-error-handler.service';
import { environment } from 'src/environments/environment';

// server-side endpoint to capture feedback for results
const FEEDBACK_ENDPOINT: string = "/feedbackFormResults";

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  feedbackList: any;

  constructor(private http: HttpClient, public configService: ConfigService, private snackBar: MatSnackBar, private router: Router, private errorService: GlobalErrorHandlerService) {}

  ngOnInit() {

    this.http.get<Response>(environment.service_prefix + FEEDBACK_ENDPOINT, {}).subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.feedbackList = data.response;
          }
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
  }

}
  
interface Response {
  status: string;
  response: string;
}
