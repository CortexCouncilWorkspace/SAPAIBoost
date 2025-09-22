import {Component} from '../../base';
import {Attribute, Role, TabIndex} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {CssClasses, DataAttr, ErrorMessages, EventNames} from '../constants';
import {ExpansionPanelsModel} from '../model';
import {ModelFactory} from '../model/modelfactory';

/**
 * Class for creating expansion panels toggle.
 */
class ExpansionPanelsToggle extends Component {
  private readonly model: ExpansionPanelsModel;
  private readonly clickHandler: (e: MouseEvent) => void;
  private readonly keydownHandler: (e: KeyboardEvent) => void;

  private readonly contentId: string;

  /**
   * @param root The HTML element containing the individual panel's toggle.
   */
  constructor(root: HTMLElement) {
    super(root);

    this.clickHandler = (e: MouseEvent) => {
      e.preventDefault();
      this.toggle();
    };

    this.keydownHandler = (e: KeyboardEvent) => {
      this.handleKeydown(e);
    };

    const modelKey = this.root.closest<HTMLElement>(`.${CssClasses.GROUP}`)
      ?.dataset[DataAttr.KEY];
    this.model = ModelFactory.get(modelKey);

    const contentId = this.root.dataset[DataAttr.TOGGLEFOR];

    // stop setup if toggle cannot be linked to content
    if (!contentId) {
      throw new Error(ErrorMessages.TOGGLE_MISSING_CONTENT_ID);
    } else {
      this.contentId = contentId;
    }

    this.init();
  }

  /**
   * Initialize the component.
   */
  private init() {
    // stop initialization if content element is not found
    const panelEl = this.root.closest<HTMLElement>(`.${CssClasses.PANEL}`);
    const contentEl = panelEl?.querySelector<HTMLElement>(
      '#' + this.contentId,
    )!;
    if (!contentEl) {
      throw new Error(ErrorMessages.TOGGLE_MISSING_CONTENT_ELEMENT);
    }

    // set up accessibility features
    this.addA11yFeatures();

    // set up handlers
    this.root.addEventListener(EventType.CLICK, this.clickHandler);
    this.root.addEventListener(EventType.KEYDOWN, this.keydownHandler);
  }

  override destroy() {
    // remove accessibility features
    this.removeA11yFeatures();

    // remove handlers
    this.root.removeEventListener(EventType.CLICK, this.clickHandler);
    this.root.removeEventListener(EventType.KEYDOWN, this.keydownHandler);
  }

  /**
   * Toggles a panel open or closed depending on its current state.
   * Dispatches an event so the panel content targeted will expand/collapse.
   */
  private toggle() {
    this.model.dispatchEvent(EventNames.TOGGLE_CONTENT, this.contentId);
  }

  /**
   * Triggers a toggle on the ENTER or SPACE keyboard event.
   */
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === Key.ENTER || event.key === Key.SPACE) {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Add a11y features.
   */
  private addA11yFeatures() {
    this.root.setAttribute(Attribute.ARIA_CONTROLS, this.contentId);
    this.root.setAttribute(Attribute.ROLE, Role.BUTTON);
    this.root.tabIndex = TabIndex.TABBABLE;
  }

  /**
   * Remove a11y features.
   */
  private removeA11yFeatures() {
    this.root.removeAttribute(Attribute.ARIA_CONTROLS);
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
  }
}

export {ExpansionPanelsToggle};
