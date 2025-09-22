/**
 * @fileoverview Parent class for Vanilla components
 */

// Add class methods here to prevent deletion in the CDN.
declare interface ComponentDef {
  destroy: () => void;
}

abstract class Component implements ComponentDef {
  constructor(readonly root: HTMLElement) {}

  /**
   * Subclasses may implement this method to release any resources / deregister
   * any listeners they have attached. An example of this might be
   * deregistering a resize event from the window object.
   */
  destroy() {}

  /**
   * Fires a cross-browser-compatible custom event from the component root of
   * the given type, with the given data.
   */
  emit(evtType: string, evtData: unknown, shouldBubble = false) {
    const evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble,
    });

    this.root.dispatchEvent(evt);
  }
}

export {Component, type ComponentDef};
