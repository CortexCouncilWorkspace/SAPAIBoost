import {Component} from '../base';

import {CssClasses, DataAttr, EventNames, Strings} from './constants';
import {ExpansionPanelsContent} from './content';
import {ExpansionPanelOptions, ExpansionPanelsModel} from './model';
import {ModelFactory} from './model/modelfactory';
import {ExpansionPanelsToggle} from './toggle';
import {ExpansionPanelsToggleAll} from './toggleall';

/**
 * Class for creating expansion panels panel group.
 */
class ExpansionPanels extends Component {
  private readonly options: ExpansionPanelOptions;
  private readonly model: ExpansionPanelsModel;
  private readonly statusChangeHandler: () => void;
  private readonly modelKey: string;

  private readonly toggleAllComponents: ExpansionPanelsToggleAll[] = [];
  private readonly panelContentComponents: ExpansionPanelsContent[] = [];
  private readonly panelToggleComponents: ExpansionPanelsToggle[] = [];

  /**
   * @param root The HTML element containing the panel group.
   * @param options Expansion Panels options object.
   */
  constructor(root: HTMLElement, options?: Partial<ExpansionPanelOptions>) {
    super(root);
    this.options = Object.assign({}, ExpansionPanelsModel.defaults, options);

    this.statusChangeHandler = () => {
      this.updateStatus();
    };

    this.modelKey =
      this.root.dataset[DataAttr.KEY] || Strings.DEFAULT_INSTANCE_ID;
    this.model = ModelFactory.get(this.modelKey, this.options);

    this.init();
  }

  /**
   * Initialize the component.
   */
  private init() {
    this.model.panelsCount = this.root.getElementsByClassName(
      CssClasses.PANEL,
    ).length;
    this.model.panelsCollapsed = this.model.panelsCount;

    // Initialize child components. Track them so component can be fully
    // destroyed
    for (const toggleAllEl of this.root.querySelectorAll(
      `.${CssClasses.TOGGLE_ALL}`,
    )) {
      this.toggleAllComponents.push(
        new ExpansionPanelsToggleAll(toggleAllEl as HTMLElement),
      );
    }
    for (const panelContentEl of this.root.querySelectorAll(
      `.${CssClasses.CONTENT}`,
    )) {
      this.panelContentComponents.push(
        new ExpansionPanelsContent(panelContentEl as HTMLElement),
      );
    }
    for (const panelToggleEl of this.root.querySelectorAll(
      `.${CssClasses.BUTTON}`,
    )) {
      this.panelToggleComponents.push(
        new ExpansionPanelsToggle(panelToggleEl as HTMLElement),
      );
    }

    // listen for status change events
    this.model.listen(
      EventNames.PANELGROUP_STATUS_CHANGED,
      this.statusChangeHandler,
    );

    // Set panel group's initial status
    this.model.updatePanelsStatus();
  }

  override destroy() {
    // Destroy child components
    let subcomponent;
    while (this.toggleAllComponents.length > 0) {
      subcomponent = this.toggleAllComponents.pop() as ExpansionPanelsToggleAll;
      subcomponent.destroy();
    }
    while (this.panelContentComponents.length > 0) {
      subcomponent =
        this.panelContentComponents.pop() as ExpansionPanelsContent;
      subcomponent.destroy();
    }
    while (this.panelToggleComponents.length > 0) {
      subcomponent = this.panelToggleComponents.pop() as ExpansionPanelsToggle;
      subcomponent.destroy();
    }

    // reset panel group class
    this.model.panelsCount = 0;
    this.model.updatePanelsStatus();

    // remove listener for update events
    this.model.unlisten(
      EventNames.PANELGROUP_STATUS_CHANGED,
      this.statusChangeHandler,
    );

    // remove instance from models list
    ModelFactory.clearSingle(this.modelKey);
  }

  /**
   * Update the class on panel group root indicating current status
   */
  private updateStatus() {
    this.root.classList.remove(
      CssClasses.IS_COLLAPSED,
      CssClasses.IS_MIXED,
      CssClasses.IS_EXPANDED,
    );
    if (this.model.panelsStatus) {
      this.root.classList.add(`glue-is-${this.model.panelsStatus}`);
    }
  }
}

export {ExpansionPanels};
