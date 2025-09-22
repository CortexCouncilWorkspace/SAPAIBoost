/**
 * @fileoverview Glue Social component
 * Initializes available subcomponents (popover, copy, expansion panels)
 */
import {Component} from '../base';
import {Attribute, Role} from '../constants/attribute';
import {Copy} from '../copy';
import {CssClasses as CopyCssClasses} from '../copy/constants';
import {ExpansionPanels} from '../expansionpanels';
import {CssClasses as ExpanelsCssClasses, DataAttr as ExpanelsDataAttr,} from '../expansionpanels/constants';
import {Popover} from '../popover';
import {CssClasses as PopoverCssClasses, DataAttr as PopoverDataAttr,} from '../popover/constants';
import {Tooltip} from '../tooltip';
import {CssClasses as TooltipCssClasses, DataAttrs as TooltipDataAttr,} from '../tooltip/constants';

import {CssClasses} from './constants';

class Social extends Component {
  /**
   * @param root The social element container.
   */
  constructor(root) {
    super(root);
    this.tooltipComponents = [];
    // Grabs subcomponent elements if they exist
    this.copyEl = this.root.querySelector(`.${CssClasses.COPY_ROOT}`);
    this.popoverEl = this.root.querySelector(`.${CssClasses.POPOVER_ROOT}`);
    this.panelsEl = this.root.querySelector(`.${CssClasses.SOCIAL_GROUP}`);
    this.panelTitleEl = this.root.querySelector(`.${CssClasses.SOCIAL_TITLE}`);
    this.socialListEl = this.root.querySelector(`.${CssClasses.SOCIAL_LIST}`);
    this.tooltipEls =
        Array.from(this.root.querySelectorAll(`.${CssClasses.TOOLTIP_ROOT}`));
    this.initialize();
  }
  /** Initializes the component. */
  initialize() {
    this.addCopy();
    this.addPopover();
    this.addPanels();
    this.addTooltips();
  }
  /**
   * Destroys the social instance and any subcomponents.
   */
  destroy() {
    this.removeCopy();
    this.removePopover();
    this.removePanels();
    this.removeTooltips();
  }
  /**
   * Sets up copy component if elements are present
   */
  addCopy() {
    var _a, _b;
    const copyInput = (_a = this.copyEl) === null || _a === void 0 ?
        void 0 :
        _a.querySelector(`.${CssClasses.COPY_INPUT}`);
    const copyButton = (_b = this.copyEl) === null || _b === void 0 ?
        void 0 :
        _b.querySelector(`.${CssClasses.COPY_BUTTON}`);
    if (!this.copyEl || !copyInput || !copyButton) {
      return;
    }
    // Add classes and attributes to the various sub elements
    this.copyEl.classList.add(CopyCssClasses.ROOT);
    copyInput.classList.add(CopyCssClasses.VALUE);
    copyButton.classList.add(CopyCssClasses.BUTTON);
    copyButton.setAttribute(Attribute.ARIA_LIVE, 'polite');
    // Initialize the component
    this.copyComponent = new Copy(this.copyEl);
  }
  /**
   * Removes copy component if present
   */
  removeCopy() {
    var _a, _b, _c;
    const copyInput = (_a = this.copyEl) === null || _a === void 0 ?
        void 0 :
        _a.querySelector(`.${CssClasses.COPY_INPUT}`);
    const copyButton = (_b = this.copyEl) === null || _b === void 0 ?
        void 0 :
        _b.querySelector(`.${CssClasses.COPY_BUTTON}`);
    if (!this.copyEl || !copyInput || !copyButton) {
      return;
    }
    // Destroy the component
    (_c = this.copyComponent) === null || _c === void 0 ? void 0 : _c.destroy();
    // Remove classes and attributes
    this.copyEl.classList.remove(CopyCssClasses.ROOT);
    copyInput.classList.remove(CopyCssClasses.VALUE);
    copyButton.classList.remove(CopyCssClasses.BUTTON);
    copyButton.removeAttribute(Attribute.ARIA_LIVE);
  }
  /**
   * Sets up popover component if elements are present
   */
  addPopover() {
    var _a, _b, _c;
    const popoverTrigger = (_a = this.popoverEl) === null || _a === void 0 ?
        void 0 :
        _a.querySelector(`.${CssClasses.POPOVER_TRIGGER}`);
    const popoverDialog = (_b = this.popoverEl) === null || _b === void 0 ?
        void 0 :
        _b.querySelector(`.${CssClasses.POPOVER_DIALOG}`);
    const popoverClose = (_c = this.popoverEl) === null || _c === void 0 ?
        void 0 :
        _c.querySelector(`.${CssClasses.POPOVER_CLOSE}`);
    if (!this.popoverEl || !popoverTrigger || !popoverDialog || !popoverClose) {
      return;
    }
    // Add classes and attributes to the various sub elements
    this.popoverEl.classList.add(PopoverCssClasses.ROOT);
    this.popoverEl.dataset[PopoverDataAttr.TRIGGER] = 'click';
    popoverTrigger.classList.add(PopoverCssClasses.TRIGGER);
    popoverDialog.classList.add(PopoverCssClasses.DIALOG);
    popoverClose.classList.add(PopoverCssClasses.CLOSE_BTN);
    // Initialize the component
    this.popoverComponent = new Popover(this.popoverEl, {placement: 'right'});
  }
  /**
   * Removes popover component if present
   */
  removePopover() {
    var _a, _b, _c, _d;
    const popoverTrigger = (_a = this.popoverEl) === null || _a === void 0 ?
        void 0 :
        _a.querySelector(`.${CssClasses.POPOVER_TRIGGER}`);
    const popoverDialog = (_b = this.popoverEl) === null || _b === void 0 ?
        void 0 :
        _b.querySelector(`.${CssClasses.POPOVER_DIALOG}`);
    const popoverClose = (_c = this.popoverEl) === null || _c === void 0 ?
        void 0 :
        _c.querySelector(`.${CssClasses.POPOVER_CLOSE}`);
    if (!this.popoverEl || !popoverTrigger || !popoverDialog || !popoverClose) {
      return;
    }
    // Destroy the component
    (_d = this.popoverComponent) === null || _d === void 0 ? void 0 :
                                                             _d.destroy();
    // Remove classes and attributes
    this.popoverEl.classList.remove(PopoverCssClasses.ROOT);
    delete this.popoverEl.dataset[PopoverDataAttr.TRIGGER];
    popoverTrigger.classList.remove(PopoverCssClasses.TRIGGER);
    popoverDialog.classList.remove(PopoverCssClasses.DIALOG);
    popoverClose.classList.remove(PopoverCssClasses.CLOSE_BTN);
  }
  /**
   * Sets up expansion panels component if elements are present
   */
  addPanels() {
    if (!this.root.classList.contains(CssClasses.PANELS_VARIANT) ||
        !this.panelsEl || !this.panelTitleEl || !this.socialListEl) {
      return;
    }
    // Add classes and attributes to the various sub elements
    const panelsId = this.root.id ? this.root.id : 'social-panels';
    this.root.classList.add(`${ExpanelsCssClasses.GROUP}`);
    this.root.dataset[ExpanelsDataAttr.KEY] = panelsId;
    this.panelsEl.classList.add(`${ExpanelsCssClasses.PANEL}`);
    // Set up panel title/button
    const panelsButtonEl = document.createElement('button');
    panelsButtonEl.className = this.panelTitleEl.className;
    panelsButtonEl.classList.add(`${ExpanelsCssClasses.BUTTON}`);
    panelsButtonEl.id = panelsId + '-toggle';
    panelsButtonEl.dataset[ExpanelsDataAttr.TOGGLEFOR] = panelsId + '-content';
    panelsButtonEl.replaceChildren(...this.panelTitleEl.childNodes);
    this.panelTitleEl.replaceChildren();
    this.panelTitleEl.className = '';
    this.panelTitleEl.appendChild(panelsButtonEl);
    this.panelTitleEl.classList.add(`${ExpanelsCssClasses.TOGGLE}`);
    // Set up panel content
    const panelContentEl = document.createElement('div');
    panelContentEl.classList.add(`${ExpanelsCssClasses.CONTENT}`);
    this.panelsEl.appendChild(panelContentEl);
    panelContentEl.appendChild(this.socialListEl);
    panelContentEl.id = panelsId + '-content';
    // Initialize the component
    this.expanelsComponent = new ExpansionPanels(this.root);
  }
  /**
   * Removes expansion panels component if present
   */
  removePanels() {
    var _a;
    if (!this.root.classList.contains(CssClasses.PANELS_VARIANT) ||
        !this.panelsEl || !this.panelTitleEl || !this.socialListEl) {
      return;
    }
    // Destroy the component
    (_a = this.expanelsComponent) === null || _a === void 0 ? void 0 :
                                                              _a.destroy();
    // Remove panel content
    const panelContentEl =
        this.panelsEl.querySelector(`.${ExpanelsCssClasses.CONTENT}`);
    this.panelsEl.appendChild(this.socialListEl);
    panelContentEl === null || panelContentEl === void 0 ?
        void 0 :
        panelContentEl.remove();
    const panelsButtonEl =
        this.panelTitleEl.querySelector(`.${ExpanelsCssClasses.BUTTON}`);
    if (panelsButtonEl) {
      panelsButtonEl.classList.remove(`${ExpanelsCssClasses.BUTTON}`);
      this.panelTitleEl.className = panelsButtonEl.className;
      this.panelTitleEl.replaceChildren(...panelsButtonEl.childNodes);
      panelsButtonEl.remove();
    }
    // remove panels classes/attributes
    this.root.classList.remove(`${ExpanelsCssClasses.GROUP}`);
    delete this.root.dataset[ExpanelsDataAttr.KEY];
    this.panelsEl.classList.remove(`${ExpanelsCssClasses.PANEL}`);
  }
  /**
   * Sets up tooltip components if elements are present
   */
  addTooltips() {
    for (const tooltipEl of this.tooltipEls) {
      const tooltipTrigger =
          tooltipEl.querySelector(`.${CssClasses.TOOLTIP_TRIGGER}`);
      const tooltipContent =
          tooltipEl.querySelector(`.${CssClasses.TOOLTIP_CONTENT}`);
      if (tooltipTrigger && tooltipContent) {
        tooltipEl.classList.add(`${TooltipCssClasses.ROOT}`);
        if (this.root.classList.contains(CssClasses.PERSISTENT_VARIANT)) {
          // Use manual positioning for persistent variant tooltips
          tooltipEl.dataset[TooltipDataAttr.AUTO_POSITION] = 'false';
        }
        tooltipTrigger.classList.add(`${TooltipCssClasses.TRIGGER}`);
        tooltipContent.classList.add(`${TooltipCssClasses.CONTENT}`);
        tooltipContent.setAttribute(Attribute.ROLE, Role.TOOLTIP);
        // Initialize tooltip Component
        this.tooltipComponents.push(new Tooltip(tooltipEl));
      }
    }
  }
  /**
   * Removes tooltip components if present
   */
  removeTooltips() {
    while (this.tooltipComponents.length > 0) {
      const tooltipComponent = this.tooltipComponents.pop();
      tooltipComponent === null || tooltipComponent === void 0 ?
          void 0 :
          tooltipComponent.destroy();
    }
    for (const tooltipEl of this.tooltipEls) {
      const tooltipTrigger =
          tooltipEl.querySelector(`.${CssClasses.TOOLTIP_TRIGGER}`);
      const tooltipContent =
          tooltipEl.querySelector(`.${CssClasses.TOOLTIP_CONTENT}`);
      tooltipEl.classList.remove(`${TooltipCssClasses.ROOT}`);
      delete tooltipEl.dataset[TooltipDataAttr.AUTO_POSITION];
      tooltipTrigger === null || tooltipTrigger === void 0 ?
          void 0 :
          tooltipTrigger.classList.remove(`${TooltipCssClasses.TRIGGER}`);
      tooltipContent === null || tooltipContent === void 0 ?
          void 0 :
          tooltipContent.classList.remove(`${TooltipCssClasses.CONTENT}`);
      tooltipContent === null || tooltipContent === void 0 ?
          void 0 :
          tooltipContent.removeAttribute(Attribute.ROLE);
    }
  }
}
export {Social};
