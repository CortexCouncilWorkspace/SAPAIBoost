import { Injectable } from '@angular/core';

// prevent compilation errors -- gtag is defined in index.html
declare var gtag : any;

const APP_NAME = 'Gemini for SAP RISE'

@Injectable({providedIn: 'root'})
/**
 * Service to capture GA4 analytics events.
 */
export class AnalyticsService {
  trackEvent(eventName: string, eventCategory: string, eventLabel: string) {
    gtag('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel
    })
  }
  trackScreenView(screenName: string){
    gtag('event', 'screen_view', {
      'app_name': APP_NAME,
      'screen_name': screenName
    })
  }
}
