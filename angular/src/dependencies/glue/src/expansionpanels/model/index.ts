import {EventTarget, EventTargetHandler} from '../../events/eventtarget';
import {EventNames, Strings} from '../constants';

declare interface ExpansionPanelOptions {
  isAnimated: boolean;
  panelsCount: number;
}

/**
 * The data model used for an Expansion Panel group (a collection of one or
 * more expansion panels).
 * @unrestricted
 */
class ExpansionPanelsModel {
  isAnimated: boolean;
  panelsCount: number;
  panelsCollapsed: number;
  panelsStatus: string;
  private readonly eventTarget: EventTarget;

  /**
   * @param options Expansion Panels options object.
   */
  constructor(options?: Partial<ExpansionPanelOptions>) {
    const mergedOptions: ExpansionPanelOptions = Object.assign(
      {},
      ExpansionPanelsModel.defaults,
      options,
    );

    /**
     * Whether the panels are animated on activation or not.
     */
    this.isAnimated = mergedOptions.isAnimated;

    /**
     * Total number of panels in this group.
     */
    this.panelsCount = mergedOptions.panelsCount;

    /**
     * Number of panels currently collapsed in this group. Updated whenever a
     * panel is expanded or collapsed.
     * Initially same as total panel count (all panels collapsed).
     */
    this.panelsCollapsed = this.panelsCount;

    /**
     * Current status of the panels group: collapsed, expanded, or mixed.
     * Updated whenever a panel is expanded or collapsed.
     * Initially collapsed.
     */
    this.panelsStatus = Strings.COLLAPSED;

    /**
     * Use EventTarget module to delegate event handling between various
     * subcomponents.
     */
    this.eventTarget = new EventTarget();
  }

  /**
   * Default model options.
   */
  static get defaults(): ExpansionPanelOptions {
    return {
      isAnimated: true,
      panelsCount: 1,
    };
  }

  /**
   * Updates the panel group's status based on collapsed/expanded panel count.
   */
  updatePanelsStatus() {
    if (this.panelsCount === 0) {
      this.panelsStatus = '';
    } else if (this.panelsCount === this.panelsCollapsed) {
      this.panelsStatus = Strings.COLLAPSED;
    } else if (this.panelsCollapsed === 0) {
      this.panelsStatus = Strings.EXPANDED;
    } else {
      this.panelsStatus = Strings.MIXED;
    }

    // Fire event so panel group knows to update its CSS class tracking status
    this.dispatchEvent(EventNames.PANELGROUP_STATUS_CHANGED);
  }

  /**
   * Sets up a listener on the model's eventTarget
   */
  listen(eventName: string, handler: EventTargetHandler) {
    this.eventTarget.listen(eventName, handler);
  }

  /**
   * Removes a listener from the model's eventTarget
   */
  unlisten(eventName: string, handler: EventTargetHandler) {
    this.eventTarget.unlisten(eventName, handler);
  }

  /**
   * Fires an event on the model's eventTarget. Can include additional data so
   * only specific components will respond to the event.
   * @param eventData Optional additional event data.
   */
  dispatchEvent(eventName: string, eventData?: string) {
    this.eventTarget.dispatchEvent(eventName, eventData);
  }
}

export {ExpansionPanelsModel, type ExpansionPanelOptions};
