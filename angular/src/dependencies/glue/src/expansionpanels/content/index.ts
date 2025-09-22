import {Component} from '../../base';
import {Attribute, Role, TabIndex} from '../../constants/attribute';
import {EventLike, EventTargetHandler} from '../../events/eventtarget';
import {EventType} from '../../events/eventtype';
import * as focusUtil from '../../focus/';
import {
  CssClasses,
  DataAttr,
  ErrorMessages,
  EventNames,
  Strings,
} from '../constants';
import {ExpansionPanelsModel} from '../model';
import {ModelFactory} from '../model/modelfactory';

/**
 * Class for creating expansion panels content.
 */
class ExpansionPanelsContent extends Component {
  private readonly model: ExpansionPanelsModel;
  private readonly groupEl: HTMLElement | null;
  private readonly panelEl: HTMLElement | null;
  private readonly toggleButton: HTMLElement | null;

  /**
   * An array to hold the tabindex value of focusable child elements of panel
   * content, so it can be adjusted when the panel content is expanded or
   * collapsed.
   */
  private tabIndexArr: number[] = [];

  private isCollapsed: boolean = true;
  private readonly toggleContentHandler: EventTargetHandler;
  private readonly expandHandler: () => void;
  private readonly collapseHandler: () => void;
  private readonly transitionendHandler: () => void;

  /**
   * Keeps track of the panel height (unitless, but ultimately in pixels).
   */
  private panelHeight: number = 0;

  /**
   * @param root The HTML element containing the individual panel's content.
   */
  constructor(root: HTMLElement) {
    super(root);

    this.groupEl = this.root.closest(`.${CssClasses.GROUP}`);
    this.panelEl = this.root.closest(`.${CssClasses.PANEL}`);

    this.toggleButton =
      this.panelEl?.querySelector<HTMLElement>(`.${CssClasses.BUTTON}`) ?? null;

    this.toggleContentHandler = (target?: EventLike) => {
      this.toggleContent(target);
    };

    this.expandHandler = () => {
      this.expand();
    };

    this.collapseHandler = () => {
      this.collapse();
    };

    this.transitionendHandler = () => {
      this.unsetPanelHeight();
    };

    const modelKey = this.root.closest<HTMLElement>(`.${CssClasses.GROUP}`)
      ?.dataset[DataAttr.KEY];
    this.model = ModelFactory.get(modelKey);

    if (!this.root.id) {
      throw new Error(ErrorMessages.MISSING_CONTENT_ID);
    }

    this.init();
  }

  init() {
    // Store initial tabIndex value for all focusable elements in panel content.
    this.tabIndexArr = this.getTabIndexArray();

    // Toggle the panel's initial state
    if (this.root.dataset[DataAttr.INITIAL] === 'expanded') {
      this.isCollapsed = false;
      this.updateHtmlAttributes(false);
      this.setPanelHeight('');
      this.updateStatus(false);
    } else {
      this.isCollapsed = true;
      this.updateHtmlAttributes(true);
      this.setPanelHeight('0px');
    }

    // start listening for events
    this.model.listen(EventNames.TOGGLE_CONTENT, this.toggleContentHandler);
    this.model.listen(EventNames.EXPAND_ALL_CONTENT, this.expandHandler);
    this.model.listen(EventNames.COLLAPSE_ALL_CONTENT, this.collapseHandler);
    if (this.model.isAnimated === true) {
      this.root.addEventListener(
        EventType.TRANSITIONEND,
        this.transitionendHandler,
      );
    }

    // set aria properties
    this.addA11yFeatures();
  }

  override destroy() {
    // remove styles and attributes
    this.panelEl?.classList.remove(
      CssClasses.IS_COLLAPSED,
      CssClasses.IS_EXPANDED,
    );
    this.setPanelHeight('');

    // reset accessibility properties from expanded/collapsed state
    this.removeAriaAttributes();
    this.setFocusableElements(false, this.tabIndexArr);

    // clear tabindex values
    this.tabIndexArr = [];

    // stop listening for events
    this.model.unlisten(EventNames.TOGGLE_CONTENT, this.toggleContentHandler);
    this.model.unlisten(EventNames.EXPAND_ALL_CONTENT, this.expandHandler);
    this.model.unlisten(EventNames.COLLAPSE_ALL_CONTENT, this.collapseHandler);
    if (this.model.isAnimated === true) {
      this.root.removeEventListener(
        EventType.TRANSITIONEND,
        this.transitionendHandler,
      );
    }

    // reset aria properties
    this.removeA11yFeatures();
  }

  /**
   * Expands (shows) the content, both visually and to screen readers
   */
  expand() {
    if (this.isCollapsed === false) {
      return;
    }
    this.updateHtmlAttributes(false);
    this.updateHeight(false);
    this.updateStatus(false);
  }

  /**
   * Collapses (hides) the content, both visually and to screen readers
   */
  collapse() {
    if (this.isCollapsed === true) {
      return;
    }
    this.updateHtmlAttributes(true);
    this.updateHeight(true);
    this.updateStatus(true);
  }

  /**
   * When toggle event is fired, expands or collapses the content element.
   * @param target The ID of the panel that should be toggled.
   */
  private toggleContent(target?: EventLike) {
    if (target === this.root.id) {
      this.isCollapsed ? this.expand() : this.collapse();
    }
  }

  /**
   * Updates content element's ARIA attributes and adds/removes classes based
   * on context (Expanded / Collapsed).
   * @param flag The flag to check if the state is
   * expanded or collapsed.
   */
  private updateHtmlAttributes(flag: boolean) {
    this.setAriaAttributes(flag);
    this.setFocusableElements(flag, this.tabIndexArr);
    const addClass = flag ? CssClasses.IS_COLLAPSED : CssClasses.IS_EXPANDED;
    const removeClass = flag ? CssClasses.IS_EXPANDED : CssClasses.IS_COLLAPSED;
    this.panelEl?.classList.add(addClass);
    this.panelEl?.classList.remove(removeClass);
  }

  /**
   * Updates height of content element based on context (Expanded / Collapsed).
   * @param flag The flag to check if the state is
   * expanded or collapsed.
   */
  private updateHeight(flag: boolean) {
    this.panelHeight = this.root.scrollHeight;
    if (this.model.isAnimated === true) {
      this.setPanelHeight(`${this.panelHeight}px`);

      // Applicable when the panels are to be collapsed.
      if (flag) {
        // Force a redraw of the layout by calling scrollHeight again,
        // then set the height to 0 after a brief delay (1ms)
        // This is so broswers will reliably transition the height change
        this.panelHeight = this.root.scrollHeight;
        window.setTimeout(this.setPanelHeight.bind(this), 1, '0px');
      }
    } else {
      // If no animation is set, immediately set the height to
      // 0 or unset depending on the context.
      this.setPanelHeight(flag ? '0px' : '');
    }
  }

  /**
   * Updates status of content element based on context (Expanded / Collapsed).
   * @param flag The flag to check if the state is
   * expanded or collapsed.
   */
  private updateStatus(flag: boolean) {
    flag ? this.model.panelsCollapsed++ : this.model.panelsCollapsed--;
    this.model.updatePanelsStatus();
    this.isCollapsed = flag;
  }

  /**
   * Get tabindex array.
   */
  private getTabIndexArray(): number[] {
    const focusableEls = focusUtil.getFocusableElements(this.root);
    const tabIndexArray = focusableEls.map((el) => el.tabIndex);
    return tabIndexArray;
  }

  /**
   * Set content height.
   */
  private setPanelHeight(height: string) {
    this.root.style.height = height;
  }

  /**
   * Unset content height.
   */
  private unsetPanelHeight() {
    if (this.root.style.height !== '0px') {
      this.root.style.height = '';
    }
  }

  /**
   * Get localised tooltip text from the template file
   * @param isPanelExpanded The flag to check if the panel is expanded or not
   */
  private getTooltipText(isPanelExpanded: boolean = false): string {
    const tooltipText = isPanelExpanded
      ? this.groupEl?.dataset[DataAttr.EXPAND_TOOLTIP] ?? Strings.TOOLTIP_EXPAND
      : this.groupEl?.dataset[DataAttr.COLLAPSE_TOOLTIP] ??
        Strings.TOOLTIP_COLLAPSE;

    return tooltipText;
  }

  /**
   * Set aria attributes.
   */
  private setAriaAttributes(isPanelCollapsed: boolean) {
    this.root.hidden = isPanelCollapsed;
    if (this.toggleButton) {
      this.toggleButton.title = this.getTooltipText(isPanelCollapsed);
      this.toggleButton.setAttribute(
        Attribute.ARIA_EXPANDED,
        String(!isPanelCollapsed),
      );
    }
    if (isPanelCollapsed) {
      this.root.setAttribute(Attribute.ARIA_HIDDEN, String(isPanelCollapsed));
    } else {
      this.root.removeAttribute(Attribute.ARIA_HIDDEN);
    }
  }

  /**
   * Remove aria attributes.
   */
  private removeAriaAttributes() {
    this.toggleButton?.removeAttribute(Attribute.ARIA_EXPANDED);
    this.toggleButton?.removeAttribute('title');
    this.root.removeAttribute(Attribute.ARIA_HIDDEN);
    this.root.hidden = false;
  }

  /**
   * Set focusable elements.
   */
  private setFocusableElements(
    isPanelCollapsed: boolean,
    tabIndexArr: number[],
  ) {
    const focusableEls = focusUtil.getFocusableElements(this.root);
    if (isPanelCollapsed) {
      for (const el of focusableEls) {
        el.tabIndex = TabIndex.NOT_TABBABLE;
      }
    } else {
      for (let i = 0; i < focusableEls.length; i++) {
        const el = focusableEls[i];
        el.tabIndex = tabIndexArr[i];
      }
    }
  }

  /**
   * Add a11y features.
   */
  private addA11yFeatures() {
    this.root.setAttribute(
      Attribute.ARIA_LABELLEDBY,
      this.toggleButton?.id ?? '',
    );
    this.root.setAttribute(Attribute.ROLE, Role.REGION);
  }

  /**
   * Remove a11y features.
   */
  private removeA11yFeatures() {
    this.root.removeAttribute(Attribute.ARIA_LABELLEDBY);
    this.root.removeAttribute(Attribute.ROLE);
  }
}

export {ExpansionPanelsContent};
