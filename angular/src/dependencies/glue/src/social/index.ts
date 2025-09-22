/**
 * @fileoverview Glue Social component
 * Initializes available subcomponents (popover, copy, expansion panels)
 */

import {Component} from '../base';
import {Attribute, Role} from '../constants/attribute';
import {Copy} from '../copy';
import {CssClasses as CopyCssClasses} from '../copy/constants';
import {ExpansionPanels} from '../expansionpanels';
import {
  CssClasses as ExpanelsCssClasses,
  DataAttr as ExpanelsDataAttr,
} from '../expansionpanels/constants';
import {Popover} from '../popover';
import {
  CssClasses as PopoverCssClasses,
  DataAttr as PopoverDataAttr,
} from '../popover/constants';
import {Tooltip} from '../tooltip';
import {
  CssClasses as TooltipCssClasses,
  DataAttrs as TooltipDataAttr,
} from '../tooltip/constants';

import {CssClasses} from './constants';

// Add class methods here to prevent deletion in the CDN.
declare interface SocialDef {
  tooltipComponents: Tooltip[];
}

class Social extends Component implements SocialDef {
  private readonly copyEl: HTMLElement | null;
  private copyComponent?: Copy;

  private readonly popoverEl: HTMLElement | null;
  private popoverComponent?: Popover;

  private readonly panelsEl: HTMLElement | null;
  private readonly panelTitleEl: HTMLElement | null;
  private readonly socialListEl: HTMLElement | null;
  private expanelsComponent?: ExpansionPanels;

  private readonly tooltipEls: HTMLElement[];
  tooltipComponents: Tooltip[] = [];

  /**
   * @param root The social element container.
   */
  constructor(root: HTMLElement) {
    super(root);

    // Grabs subcomponent elements if they exist
    this.copyEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.COPY_ROOT}`,
    );

    this.popoverEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_ROOT}`,
    );

    this.panelsEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.SOCIAL_GROUP}`,
    );
    this.panelTitleEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.SOCIAL_TITLE}`,
    );
    this.socialListEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.SOCIAL_LIST}`,
    );

    this.tooltipEls = Array.from(
      this.root.querySelectorAll(`.${CssClasses.TOOLTIP_ROOT}`),
    );

    this.initialize();
  }

  /** Initializes the component. */
  private initialize() {
    this.addCopy();
    this.addPopover();
    this.addPanels();
    this.addTooltips();
  }

  /**
   * Destroys the social instance and any subcomponents.
   */
  override destroy() {
    this.removeCopy();
    this.removePopover();
    this.removePanels();
    this.removeTooltips();
  }

  /**
   * Sets up copy component if elements are present
   */
  private addCopy() {
    const copyInput = this.copyEl?.querySelector<HTMLElement>(
      `.${CssClasses.COPY_INPUT}`,
    );
    const copyButton = this.copyEl?.querySelector<HTMLElement>(
      `.${CssClasses.COPY_BUTTON}`,
    );

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
  private removeCopy() {
    const copyInput = this.copyEl?.querySelector<HTMLElement>(
      `.${CssClasses.COPY_INPUT}`,
    );
    const copyButton = this.copyEl?.querySelector<HTMLElement>(
      `.${CssClasses.COPY_BUTTON}`,
    );

    if (!this.copyEl || !copyInput || !copyButton) {
      return;
    }

    // Destroy the component
    this.copyComponent?.destroy();

    // Remove classes and attributes
    this.copyEl.classList.remove(CopyCssClasses.ROOT);
    copyInput.classList.remove(CopyCssClasses.VALUE);
    copyButton.classList.remove(CopyCssClasses.BUTTON);
    copyButton.removeAttribute(Attribute.ARIA_LIVE);
  }

  /**
   * Sets up popover component if elements are present
   */
  private addPopover() {
    const popoverTrigger = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_TRIGGER}`,
    );
    const popoverDialog = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_DIALOG}`,
    );
    const popoverClose = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_CLOSE}`,
    );

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
  private removePopover() {
    const popoverTrigger = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_TRIGGER}`,
    );
    const popoverDialog = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_DIALOG}`,
    );
    const popoverClose = this.popoverEl?.querySelector<HTMLElement>(
      `.${CssClasses.POPOVER_CLOSE}`,
    );

    if (!this.popoverEl || !popoverTrigger || !popoverDialog || !popoverClose) {
      return;
    }

    // Destroy the component
    this.popoverComponent?.destroy();

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
  private addPanels() {
    if (
      !this.root.classList.contains(CssClasses.PANELS_VARIANT) ||
      !this.panelsEl ||
      !this.panelTitleEl ||
      !this.socialListEl
    ) {
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
  private removePanels() {
    if (
      !this.root.classList.contains(CssClasses.PANELS_VARIANT) ||
      !this.panelsEl ||
      !this.panelTitleEl ||
      !this.socialListEl
    ) {
      return;
    }

    // Destroy the component
    this.expanelsComponent?.destroy();

    // Remove panel content
    const panelContentEl = this.panelsEl.querySelector<HTMLElement>(
      `.${ExpanelsCssClasses.CONTENT}`,
    );
    this.panelsEl.appendChild(this.socialListEl);
    panelContentEl?.remove();

    const panelsButtonEl = this.panelTitleEl.querySelector<HTMLElement>(
      `.${ExpanelsCssClasses.BUTTON}`,
    );
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
  private addTooltips() {
    for (const tooltipEl of this.tooltipEls) {
      const tooltipTrigger = tooltipEl.querySelector<HTMLElement>(
        `.${CssClasses.TOOLTIP_TRIGGER}`,
      );
      const tooltipContent = tooltipEl.querySelector<HTMLElement>(
        `.${CssClasses.TOOLTIP_CONTENT}`,
      );

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
  private removeTooltips() {
    while (this.tooltipComponents.length > 0) {
      const tooltipComponent = this.tooltipComponents.pop();
      tooltipComponent?.destroy();
    }

    for (const tooltipEl of this.tooltipEls) {
      const tooltipTrigger = tooltipEl.querySelector<HTMLElement>(
        `.${CssClasses.TOOLTIP_TRIGGER}`,
      );
      const tooltipContent = tooltipEl.querySelector<HTMLElement>(
        `.${CssClasses.TOOLTIP_CONTENT}`,
      );

      tooltipEl.classList.remove(`${TooltipCssClasses.ROOT}`);
      delete tooltipEl.dataset[TooltipDataAttr.AUTO_POSITION];
      tooltipTrigger?.classList.remove(`${TooltipCssClasses.TRIGGER}`);
      tooltipContent?.classList.remove(`${TooltipCssClasses.CONTENT}`);
      tooltipContent?.removeAttribute(Attribute.ROLE);
    }
  }
}

export {Social};
