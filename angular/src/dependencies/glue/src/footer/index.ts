import {Component} from '../base';
import {ExpansionPanels} from '../expansionpanels';
import {CssClasses as ExpansionPanelsClasses} from '../expansionpanels/constants';
import {ExpansionPanelOptions} from '../expansionpanels/model';
import {ResponsiveMonitor} from '../responsivemonitor/';

import {CssClasses, DataAttr} from './constants';

declare interface FooterOptions {
  panelsBreakpoints: string[];
  isAnimated: boolean;
  columnCount: number;
}

declare interface FooterDef {
  configureExpansionPanels: (isPanels: boolean) => void;
}

/**
 * Class for creating Footer.
 */
class Footer extends Component implements FooterDef {
  options: FooterOptions;
  private readonly responsiveSitelinks?: ResponsiveMonitor;
  private panelsComponent?: ExpansionPanels;
  private readonly panelsOptions: ExpansionPanelOptions;
  private readonly panelGroupEl: HTMLElement | null;

  /**
   * @param root The element that contains the footer sitelinks.
   * @param options Footer sitelink options.
   */
  constructor(root: HTMLElement, options?: Partial<FooterOptions>) {
    super(root);

    this.options = Object.assign({}, Footer.defaults, options);

    // Set up expansion panel options
    this.panelsOptions = {
      isAnimated: this.options.isAnimated,
      panelsCount: this.options.columnCount,
    };

    this.panelGroupEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.FOOTER_PANELS_GROUP}`,
    );

    // Set up rules for Responsive Monitor if panel group exists
    if (this.panelGroupEl) {
      this.responsiveSitelinks = new ResponsiveMonitor({
        breakpoint: this.options.panelsBreakpoints,
        enter: () => {
          if (this.panelGroupEl) {
            // Set up expansion panels
            this.configureExpansionPanels(true);
            this.panelsComponent = new ExpansionPanels(
              this.panelGroupEl,
              this.panelsOptions,
            );
          }
        },
        leave: () => {
          if (this.panelGroupEl) {
            // Remove expansion panels
            this.panelsComponent?.destroy();
            this.configureExpansionPanels(false);
          }
        },
      });
    }
  }

  /**
   * Default footer sitelinks options.
   */
  static get defaults(): FooterOptions {
    return {
      panelsBreakpoints: ['sm'],
      isAnimated: true,
      columnCount: 4,
    };
  }

  /**
   * Destroy the component.
   */
  override destroy() {
    // Destroy panels (if set)
    if (this.panelsComponent) {
      this.panelsComponent.destroy();
      this.configureExpansionPanels(false);
    }

    // Destroy Responsive monitor instance
    this.responsiveSitelinks?.destroy();
  }

  /**
   * Configure expansion panels if they exist
   */
  configureExpansionPanels(isPanels: boolean) {
    if (!this.panelGroupEl) {
      return;
    }

    // Group settings
    this.panelGroupEl.classList.toggle(ExpansionPanelsClasses.GROUP, isPanels);
    if (isPanels) {
      this.panelGroupEl.dataset[DataAttr.KEY] = DataAttr.MODEL_NAME;
    } else {
      delete this.panelGroupEl.dataset[DataAttr.KEY];
    }

    // Individual panel settings
    for (const panelEl of this.panelGroupEl.querySelectorAll(
      `.${CssClasses.FOOTER_PANELS_PANEL}`,
    )) {
      const panelToggleEl = panelEl.querySelector<HTMLElement>(
        `.${CssClasses.FOOTER_PANELS_TOGGLE}`,
      );
      const panelButtonEl = panelEl.querySelector<HTMLElement>(
        `.${CssClasses.FOOTER_PANELS_BUTTON}`,
      );
      const panelContentEl = panelEl.querySelector<HTMLElement>(
        `.${CssClasses.FOOTER_PANELS_CONTENT}`,
      );
      panelEl?.classList.toggle(ExpansionPanelsClasses.PANEL, isPanels);
      panelToggleEl?.classList.toggle(ExpansionPanelsClasses.TOGGLE, isPanels);
      panelButtonEl?.classList.toggle(ExpansionPanelsClasses.BUTTON, isPanels);
      panelContentEl?.classList.toggle(
        ExpansionPanelsClasses.CONTENT,
        isPanels,
      );
      // Accessibility attributes for various elements
      if (isPanels && panelButtonEl && panelContentEl) {
        panelButtonEl.dataset[DataAttr.TOGGLEFOR] = panelContentEl.id;
      } else {
        panelButtonEl?.removeAttribute(DataAttr.TOGGLEFOR);
      }
    }
  }
}

export {Footer, type FooterOptions};
