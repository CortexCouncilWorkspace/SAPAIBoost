import { Component } from '@angular/core';
import { ConfigService, ActionCardCategoryConfig, ActionCardConfig } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { CardCategoryEditDialogComponent } from './card-category-edit-dialog/card-category-edit-dialog.component';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService } from 'src/app/services/global-error-handler.service';

enum MoveDirection {
  Up = -1,
  Down = 1
}

const SAVE_FAILED_MESSAGE = "The configuration failed to save. Please try again.";

@Component({
  selector: 'app-card-config',
  templateUrl: './card-config.component.html',
  styleUrls: ['./card-config.component.scss']
})
export class CardConfigComponent {

  constructor(public configService: ConfigService, public dialog: MatDialog, public router: Router, private snackBar: MatSnackBar, private errorService: GlobalErrorHandlerService) { }

  public get MoveDirection() {
    return MoveDirection; 
  }

  public move(moveDirection: MoveDirection, actionCardCategory: ActionCardCategoryConfig, actionCard?: ActionCardConfig) {

    let currentConfig = this.configService.config.actionCardCategoryConfig;

    if (!actionCard) {
      let actionCardCategoryIndex = currentConfig.findIndex((category) => category.name === actionCardCategory.name);
      if ((moveDirection === MoveDirection.Up && actionCardCategoryIndex > 0) || 
          (moveDirection === MoveDirection.Down && actionCardCategoryIndex < currentConfig.length - 1)) {
        currentConfig.splice(actionCardCategoryIndex, 1);
        currentConfig.splice(actionCardCategoryIndex + moveDirection, 0, actionCardCategory);
      }
    } else {
      let actionCardCategoryIndex = currentConfig.findIndex((category) => category.name === actionCardCategory.name);
      let actionCardIndex = currentConfig[actionCardCategoryIndex].actionCardConfig.findIndex((card) => card.name === actionCard.name)
      if ((moveDirection === MoveDirection.Up && actionCardIndex > 0) || 
          (moveDirection === MoveDirection.Down && actionCardIndex < currentConfig[actionCardCategoryIndex].actionCardConfig.length - 1)) {
        currentConfig[actionCardCategoryIndex].actionCardConfig.splice(actionCardIndex, 1);
        currentConfig[actionCardCategoryIndex].actionCardConfig.splice(actionCardIndex + moveDirection, 0, actionCard);
      }
    }

    this.configService.hasChanged = true;
  }

  public editActionCardCategory(category?: ActionCardCategoryConfig) {
    let isNew: boolean = false;
    if (!category) isNew = true;
    this.dialog.open(CardCategoryEditDialogComponent, { data: category }).afterClosed().subscribe(result => {

      // if the card category edit was saved
      if (result) {
        if (isNew) this.configService.config.actionCardCategoryConfig.push(result);
        this.configService.hasChanged = true;
      }

    });
  }

  public editActionCard(category?: ActionCardCategoryConfig, card?: ActionCardConfig) {
    let isNew: boolean = false;
    let currentCardName;
    if (card) currentCardName = card.name;
    if (!card) isNew = true;
    this.dialog.open(CardEditDialogComponent, { data: card }).afterClosed().subscribe(result => {

      // if the card edit was saved
      if (result) {

        if (isNew) {

          if (!result.category.actionCardConfig)
            result.category.actionCardConfig = [];

          // add card to new category
          result.category.actionCardConfig.push(result);

        } else {

          // if the card moved categories, remove it from the previous category and add it to the new category
          if (category && result.category.name !== category.name ) {
            const index = category.actionCardConfig.findIndex((element) => element.name === currentCardName);
            if (index > -1) category.actionCardConfig.splice(index, 1);
            result.category.actionCardConfig.push(result);
          }  
        }

        delete result.category;
        this.configService.hasChanged = true;
      }
    });
  }

  public save() {
    if (this.configService.hasChanged) {
      this.configService.saveConfig().then((response) => {
        location.reload();
      }).catch((error) => {
        this.errorService.handleError(error);
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
