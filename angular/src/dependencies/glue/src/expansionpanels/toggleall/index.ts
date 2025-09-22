import {Component} from '../../base';
import {Attribute} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {CssClasses, DataAttr, EventNames, Strings} from '../constants';
import {ExpansionPanelsModel} from '../model';
import {ModelFactory} from '../model/modelfactory';

/**
 * Class for creating expansion panel toggle all.
 */
class ExpansionPanelsToggleAll extends Component {
  private readonly model: ExpansionPanelsModel;
  private readonly statusChangeHandler: () => void;
  private readonly clickHandler: (e: MouseEvent) => void;
  private readonly keydownHandler: (e: KeyboardEvent) => void;
  private readonly keyupHandler: (e: KeyboardEvent) => void;

  /**
   * @param root The HTML element containing the panel group's toggle all.
   */
  constructor(root: HTMLElement) {
    super(root);

    this.statusChangeHandler = () => {
      this.updateToggleAllStatus();
    };

    this.clickHandler = (e: MouseEvent) => {
      e.preventDefault();
      this.toggleAll();
    };

    this.keydownHandler = (e: KeyboardEvent) => {
      this.handleKeydown(e);
    };

    this.keyupHandler = (e: KeyboardEvent) => {
      this.handleKeyup(e);
    };

    this.model = ModelFactory.get(
      this.root.closest<HTMLElement>(`.${CssClasses.GROUP}`)?.dataset[
        DataAttr.KEY
      ],
    );

    this.init();
  }

  /**
   * Initialize component.
   */
  private init() {
    // set up accessibility features
    this.addA11yFeatures();

    // set up handlers
    this.root.addEventListener(EventType.CLICK, this.clickHandler);
    this.root.addEventListener(EventType.KEYDOWN, this.keydownHandler);
    this.root.addEventListener(EventType.KEYUP, this.keyupHandler);

    // listen for status change events
    this.model.listen(
      EventNames.PANELGROUP_STATUS_CHANGED,
      this.statusChangeHandler,
    );
  }

  override destroy() {
    // remove accessibility features
    this.removeA11yFeatures();

    // remove handlers
    this.root.removeEventListener(EventType.CLICK, this.clickHandler);
    this.root.removeEventListener(EventType.KEYDOWN, this.keydownHandler);
    this.root.removeEventListener(EventType.KEYUP, this.keyupHandler);

    // remove listener for update events
    this.model.unlisten(
      EventNames.PANELGROUP_STATUS_CHANGED,
      this.statusChangeHandler,
    );
  }

  /**
   * Toggles all the panels in the group to either expand or collapsed based
   * on the panel group's status
   */
  private toggleAll() {
    if (this.model.panelsStatus === Strings.EXPANDED) {
      // if all panels are expanded, collapse all panels
      this.model.dispatchEvent(EventNames.COLLAPSE_ALL_CONTENT);
    } else {
      // if at least one panel is collapsed, expand all panels
      this.model.dispatchEvent(EventNames.EXPAND_ALL_CONTENT);
    }
    // Update group status
    this.model.updatePanelsStatus();
  }

  /**
   * Triggers a toggleAll on the ENTER or SPACE keyboard event.
   */
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === Key.ENTER || event.key === Key.SPACE) {
      event.preventDefault();
      this.toggleAll();
    }
  }

  /**
   * Prevents Firefox from firing a click event on spacebar keyup event
   * Fixes http://b/194148554
   */
  private handleKeyup(event: KeyboardEvent) {
    if (event.key === Key.SPACE) {
      event.preventDefault();
    }
  }

  /**
   * Add a11y features.
   */
  private addA11yFeatures() {
    this.root.setAttribute(
      Attribute.ARIA_EXPANDED,
      this.model.panelsStatus === Strings.EXPANDED ? 'true' : 'false',
    );
    const toggleText = Array.from(
      this.root.querySelectorAll(`.${CssClasses.TOGGLE_ALL_TEXT}`),
    );
    for (const text of toggleText) {
      text.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    }
  }

  /**
   * Remove a11y features.
   */
  private removeA11yFeatures() {
    this.root.removeAttribute(Attribute.ARIA_EXPANDED);
    const toggleText = Array.from(
      this.root.querySelectorAll(`.${CssClasses.TOGGLE_ALL_TEXT}`),
    );
    for (const text of toggleText) {
      text.removeAttribute(Attribute.ARIA_HIDDEN);
    }
  }

  /**
   * Update the aria-expanded attribute on toggle button
   */
  private updateToggleAllStatus() {
    if (this.model.panelsStatus === Strings.EXPANDED) {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'true');
    } else {
      this.root.setAttribute(Attribute.ARIA_EXPANDED, 'false');
    }
  }
}

export {ExpansionPanelsToggleAll};
