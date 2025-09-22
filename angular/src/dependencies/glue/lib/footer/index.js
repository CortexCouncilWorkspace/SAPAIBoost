import {Component} from '../base';
import {ExpansionPanels} from '../expansionpanels';
import {CssClasses as ExpansionPanelsClasses} from '../expansionpanels/constants';
import {ResponsiveMonitor} from '../responsivemonitor/';

import {CssClasses, DataAttr} from './constants';

/**
 * Class for creating Footer.
 */
class Footer extends Component {
  /**
   * @param root The element that contains the footer sitelinks.
   * @param options Footer sitelink options.
   */
  constructor(root, options) {
    super(root);
    this.options = Object.assign({}, Footer.defaults, options);
    // Set up expansion panel options
    this.panelsOptions = {
      isAnimated: this.options.isAnimated,
      panelsCount: this.options.columnCount,
    };
    this.panelGroupEl =
        this.root.querySelector(`.${CssClasses.FOOTER_PANELS_GROUP}`);
    // Set up rules for Responsive Monitor if panel group exists
    if (this.panelGroupEl) {
      this.responsiveSitelinks = new ResponsiveMonitor({
        breakpoint: this.options.panelsBreakpoints,
        enter: () => {
          if (this.panelGroupEl) {
            // Set up expansion panels
            this.configureExpansionPanels(true);
            this.panelsComponent =
                new ExpansionPanels(this.panelGroupEl, this.panelsOptions);
          }
        },
        leave: () => {
          var _a;
          if (this.panelGroupEl) {
            // Remove expansion panels
            (_a = this.panelsComponent) === null || _a === void 0 ?
                void 0 :
                _a.destroy();
            this.configureExpansionPanels(false);
          }
        },
      });
    }
  }
  /**
   * Default footer sitelinks options.
   */
  static get defaults() {
    return {
      panelsBreakpoints: ['sm'],
      isAnimated: true,
      columnCount: 4,
    };
  }
  /**
   * Destroy the component.
   */
  destroy() {
    var _a;
    // Destroy panels (if set)
    if (this.panelsComponent) {
      this.panelsComponent.destroy();
      this.configureExpansionPanels(false);
    }
    // Destroy Responsive monitor instance
    (_a = this.responsiveSitelinks) === null || _a === void 0 ? void 0 :
                                                                _a.destroy();
  }
  /**
   * Configure expansion panels if they exist
   */
  configureExpansionPanels(isPanels) {
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
             `.${CssClasses.FOOTER_PANELS_PANEL}`)) {
      const panelToggleEl =
          panelEl.querySelector(`.${CssClasses.FOOTER_PANELS_TOGGLE}`);
      const panelButtonEl =
          panelEl.querySelector(`.${CssClasses.FOOTER_PANELS_BUTTON}`);
      const panelContentEl =
          panelEl.querySelector(`.${CssClasses.FOOTER_PANELS_CONTENT}`);
      panelEl === null || panelEl === void 0 ?
          void 0 :
          panelEl.classList.toggle(ExpansionPanelsClasses.PANEL, isPanels);
      panelToggleEl === null || panelToggleEl === void 0 ?
          void 0 :
          panelToggleEl.classList.toggle(
              ExpansionPanelsClasses.TOGGLE, isPanels);
      panelButtonEl === null || panelButtonEl === void 0 ?
          void 0 :
          panelButtonEl.classList.toggle(
              ExpansionPanelsClasses.BUTTON, isPanels);
      panelContentEl === null || panelContentEl === void 0 ?
          void 0 :
          panelContentEl.classList.toggle(
              ExpansionPanelsClasses.CONTENT, isPanels);
      // Accessibility attributes for various elements
      if (isPanels && panelButtonEl && panelContentEl) {
        panelButtonEl.dataset[DataAttr.TOGGLEFOR] = panelContentEl.id;
      } else {
        panelButtonEl === null || panelButtonEl === void 0 ?
            void 0 :
            panelButtonEl.removeAttribute(DataAttr.TOGGLEFOR);
      }
    }
  }
}
export {Footer};
