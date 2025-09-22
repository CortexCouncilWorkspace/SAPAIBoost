import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabPanels, TabPanelsOptions } from '@google/glue/lib/tabpanels';
import { environment } from 'src/environments/environment';
import { CardConfigComponent } from './card-config/card-config.component';
import { ConfigService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';

const SAVE_FAILED_MESSAGE = "The configuration failed to save. Please try again.";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient, public configService: ConfigService, private snackBar: MatSnackBar, private router: Router, private errorService: GlobalErrorHandlerService) {}

  ngOnInit() {

  }

  /**
   * After the view is available
   */
  ngAfterViewInit() {
    const tabPanelsEl = document.querySelector<HTMLElement>('.admin-tabpanels');
    const tabPanelsOpts: Partial<TabPanelsOptions> = {
      panelsCount: 2
    };
    if (tabPanelsEl) new TabPanels(tabPanelsEl, tabPanelsOpts);
  }

  public save() {
    if (this.configService.hasChanged) {
      this.configService.saveConfig().then((response) => {
        location.reload();
      }).catch((error) => {
        this.errorService.handleError(error);
        console.error(this.configService.config);
        this.snackBar.open(SAVE_FAILED_MESSAGE, "Close");
      })
    }
  }

  public preview() {
    if (this.configService.hasChanged)
      this.router.navigateByUrl('/');
  }

  public abandon() {
    if (this.configService.hasChanged)
      location.reload();
  }
}
