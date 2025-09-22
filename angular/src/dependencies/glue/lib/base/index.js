/**
 * @fileoverview Parent class for Vanilla components
 */
class Component {
  constructor(root) {
    this.root = root;
  }
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
  emit(evtType, evtData, shouldBubble = false) {
    const evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble,
    });
    this.root.dispatchEvent(evt);
  }
}
export {Component};
