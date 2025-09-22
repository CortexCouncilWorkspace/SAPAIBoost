import { AfterViewInit, Component, OnInit, isDevMode } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { Tooltip } from '@google/glue/lib/tooltip';
import { Header } from '@google/glue/lib/header';

import { AnalyticsService, ConfigService } from "./services"
import { AuthService } from './services'
import { GoogleDriveService } from './services/google-drive.service';

// TODO: move consent into it's own component
// TODO: handle nav highlighting differently

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  consent1: boolean = false;
  consent2: boolean = false;
  consent3: boolean = false;
  consent4: boolean = false;
  consent5: boolean = false;

  showConsent: boolean = true;
  showConsentError: boolean = false;
  hasConsented: boolean = false;
  cookieTimestamp: string = "";

  navHomeSelected: boolean = true;
  navFeedbackSelected: boolean = false;
  navAboutSelected: boolean = false;
  navAdminSelected: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private driveService: GoogleDriveService, private analyticsService: AnalyticsService, public router: Router, public authService: AuthService, public configService: ConfigService) {

    // subscribe to new navigation events
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationStart) {
          // only allow navigation to the admin view for administrators
          if (!isDevMode() && (event.url == "/admin" && (!authService.signedIn || !authService.user.isAdmin))) {
            // route to the original location
            const currentRoute = this.router.routerState;
            this.router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
          }
        }

        if (event instanceof NavigationEnd) {

          if (event.url == '/') {
            this.navHomeSelected = true;
            this.navFeedbackSelected = false;
            this.navAboutSelected = false;
            this.navAdminSelected = false;
          } else if (event.url == '/feedback') {
            this.navHomeSelected = false;
            this.navFeedbackSelected = true;
            this.navAboutSelected = false;
            this.navAdminSelected = false;
          }
          else if (event.url == '/about') {
            this.navHomeSelected = false;
            this.navFeedbackSelected = false;
            this.navAboutSelected = true;
            this.navAdminSelected = false;
          }
          else if (event.url == '/admin') {
            this.navHomeSelected = false;
            this.navFeedbackSelected = false;
            this.navAboutSelected = false;
            this.navAdminSelected = true;
          }
        }

        if (event instanceof NavigationError) {
            console.log(event.error);
        }
    });
   }

  ngOnInit() {

    this.cookieTimestamp = this.cookieService.get('consent-timestamp');
    if (this.cookieTimestamp !== null && this.cookieTimestamp.trim() !== "") {
      this.showConsent = false;
      this.hasConsented = true;
    }

    this.analyticsService.trackScreenView('Home')
  }

  ngAfterViewInit(): void {
    const tooltipEls = document.querySelectorAll('.glue-tooltip') as NodeListOf<HTMLElement>;
    tooltipEls.forEach((elem) => {
      new Tooltip(elem);
    });

    const headerEl = document.querySelector<HTMLElement>('.glue-header');
    if (headerEl) {
      new Header(headerEl);
    }

    if (this.hasConsented)
      this.authService.initGoogleSignIn();

    this.driveService.initGAPI();
  }
  
  consent(): void {
    if (this.consent1 && this.consent2 && this.consent3 && this.consent4 && this.consent5)
    {
      this.showConsent = false;
      this.hasConsented = true;
      this.authService.initGoogleSignIn();
      this.cookieService.set('consent-timestamp', new Date().toLocaleString(), 30);
    }
    else
    {
      this.showConsentError = true;
    }

  }

  signOut() {
    this.authService.signOut().then(() => {
      this.driveService.processingFileMetadata = [];
      this.configService.resetUserConfig();
    })
  }
  
}
