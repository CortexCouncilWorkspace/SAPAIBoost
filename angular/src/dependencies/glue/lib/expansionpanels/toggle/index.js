import {Component} from '../../base';
import {Attribute, Role, TabIndex} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {CssClasses, DataAttr, ErrorMessages, EventNames} from '../constants';
import {ModelFactory} from '../model/modelfactory';
/**
 * Class for creating expansion panels toggle.
 */
class ExpansionPanelsToggle extends Component {
  /**
   * @param root The HTML element containing the individual panel's toggle.
   */
  constructor(root) {
    var _a;
    super(root);
    this.clickHandler = (e) => {
      e.preventDefault();
      this.toggle();
    };
    this.keydownHandler = (e) => {
      this.handleKeydown(e);
    };
    const modelKey =
        (_a = this.root.closest(`.${CssClasses.GROUP}`)) === null ||
            _a === void 0 ?
        void 0 :
        _a.dataset[DataAttr.KEY];
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
  init() {
    // stop initialization if content element is not found
    const panelEl = this.root.closest(`.${CssClasses.PANEL}`);
    const contentEl = panelEl === null || panelEl === void 0 ?
        void 0 :
        panelEl.querySelector('#' + this.contentId);
    if (!contentEl) {
      throw new Error(ErrorMessages.TOGGLE_MISSING_CONTENT_ELEMENT);
    }
    // set up accessibility features
    this.addA11yFeatures();
    // set up handlers
    this.root.addEventListener(EventType.CLICK, this.clickHandler);
    this.root.addEventListener(EventType.KEYDOWN, this.keydownHandler);
  }
  destroy() {
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
  toggle() {
    this.model.dispatchEvent(EventNames.TOGGLE_CONTENT, this.contentId);
  }
  /**
   * Triggers a toggle on the ENTER or SPACE keyboard event.
   */
  handleKeydown(event) {
    if (event.key === Key.ENTER || event.key === Key.SPACE) {
      event.preventDefault();
      this.toggle();
    }
  }
  /**
   * Add a11y features.
   */
  addA11yFeatures() {
    this.root.setAttribute(Attribute.ARIA_CONTROLS, this.contentId);
    this.root.setAttribute(Attribute.ROLE, Role.BUTTON);
    this.root.tabIndex = TabIndex.TABBABLE;
  }
  /**
   * Remove a11y features.
   */
  removeA11yFeatures() {
    this.root.removeAttribute(Attribute.ARIA_CONTROLS);
    this.root.removeAttribute(Attribute.ROLE);
    this.root.removeAttribute(Attribute.TAB_INDEX);
  }
}
export {ExpansionPanelsToggle};
