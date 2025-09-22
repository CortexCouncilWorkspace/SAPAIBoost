import {EventType} from '../events/eventtype';
/**
 * Calls handler functions when the document object matches a media query, or
 * when a CSS-injected named breakpoint is included in a list of strings. Can
 * also call another handler when one of the condition above does not apply
 * anymore.
 *
 * This typically can be used to enable or disable a UI component based on the
 * viewport size.
 *
 * Example:
 *
 * new ResponsiveMonitor({
 *   breakpoint: ['medium', 'large'],
 *   enter: (size) => component.start(),
 *   leave: (size) => component.stop(),
 * });
 *
 * new ResponsiveMonitor({
 *   media: '(min-width: 600px)',
 *   transform: (mql) => component.start(),
 *   revert: (mql) => component.stop(),
 * });
 *
 * new ResponsiveMonitor([{
 *   media: '(max-width: 400px)',
 *   transform: (mql) => component1.start(),
 * }, {
 *   media: '(min-width: 501px) and (max-width: 800px)',
 *   transform: component2.start(),
 * }]);
 *
 * For simpler use cases, it is also possible to have a function called every
 * time the current breakpoint changes.
 *
 * const rm = new ResponsiveMonitor();
 * rm.listen((size) => {
 *   if (size == 'medium') {
 *     component.start();
 *   }
 * });
 */
class ResponsiveMonitor {
  /**
   * Returns unique monitor instance.
   */
  static getInstance() {
    if (!ResponsiveMonitor.instance) {
      ResponsiveMonitor.instance = new ResponsiveMonitor();
    }
    return ResponsiveMonitor.instance;
  }
  /**
   * @param configRules One or several media queries associated with callbacks
   *     to trigger when their result changes.
   */
  constructor(configRules = []) {
    this.vpUpdateHandler = () => {
      this.handleViewportUpdate();
    };
    /**
     * Registered media query rules;
     */
    this.mqRuleHandlerMaps = [];
    /**
     * Callback functions used to listen to breakpoint changes.
     */
    this.bpChangeHandlers = [];
    /**
     * Registered breakpoint rules.
     */
    this.bpRuleHandlerMaps = [];
    /**
     * The current named breakpoint.
     */
    this.currentBreakpoint = this.readBreakpoint();
    /**
     * The previous named breakpoint.
     */
    this.previousBreakpoint = '';
    // Setup media query rules
    if (!Array.isArray(configRules)) {
      configRules = [configRules];
    }
    configRules.forEach(this.addRule.bind(this));
    // Setup named breakpoints listening
    window.addEventListener(EventType.DOM_CONTENT_READY, this.vpUpdateHandler);
    window.addEventListener(EventType.RESIZE, this.vpUpdateHandler);
    window.addEventListener(EventType.ORIENTATION_CHANGE, this.vpUpdateHandler);
  }
  /**
   * Listens to media query or breakpoint changes.
   */
  listen(handler) {
    if (typeof handler === 'function') {
      this.bpChangeHandlers.push(handler);
    } else {
      this.addRule(handler);
    }
  }
  /**
   * Stops listening to media query or breakpoint changes.
   */
  unlisten(handler) {
    if (typeof handler === 'function') {
      let handler;
      for (let i = 0; (handler = this.bpChangeHandlers[i]); i++) {
        if (handler === handler) {
          this.bpChangeHandlers.splice(i, 1);
          return;
        }
      }
    } else {
      this.removeRule(handler);
    }
  }
  /**
   * Stops listening to all media query and breakpoint rules.
   */
  destroy() {
    this.currentBreakpoint = '';
    for (const mq of this.mqRuleHandlerMaps) {
      // tslint:disable-next-line:deprecation
      mq.mql.removeEventListener(EventType.CHANGE, mq.handler);
    }
    this.mqRuleHandlerMaps = [];
    this.bpRuleHandlerMaps = [];
    this.bpChangeHandlers = [];
    window.removeEventListener(
        EventType.DOM_CONTENT_READY, this.vpUpdateHandler);
    window.removeEventListener(EventType.RESIZE, this.vpUpdateHandler);
    window.removeEventListener(
        EventType.ORIENTATION_CHANGE, this.vpUpdateHandler);
  }
  /**
   * Returns the last known named breakpoint.
   */
  getCurrentBreakpoint() {
    return this.currentBreakpoint;
  }
  isBreakpointRule(rule) {
    return rule.breakpoint !== undefined;
  }
  isMediaQueryRuleRule(rule) {
    return rule.media !== undefined;
  }
  /**
   * Setup callback functions on a media query or a set of named breakpoints.
   * @param rule Configuration properties.
   */
  addRule(rule) {
    if (this.isBreakpointRule(rule)) {
      this.addBreakpointRule(rule);
      return;
    } else if (this.isMediaQueryRuleRule(rule)) {
      this.addMediaQueryRule(rule);
      return;
    }
  }
  /**
   * Disable callback functions on a media query or a set of named breakpoints.
   * @param rule Configuration properties.
   */
  removeRule(rule) {
    if (this.isBreakpointRule(rule)) {
      this.removeBreakpointRule(rule);
      return;
    } else if (this.isMediaQueryRuleRule(rule)) {
      this.removeMediaQueryRule(rule);
      return;
    }
  }
  /**
   * Setup callback functions on a set of named breakpoints.
   */
  addBreakpointRule(rule) {
    const checkBreakpoint = (size) => {
      const bps = rule.breakpoint;
      if (bps.indexOf(this.previousBreakpoint) === -1 &&
          bps.indexOf(this.currentBreakpoint) !== -1) {
        rule.enter(size);
        return;
      }
      if (rule.leave && bps.indexOf(this.previousBreakpoint) !== -1 &&
          bps.indexOf(this.currentBreakpoint) === -1) {
        rule.leave(size);
      }
    };
    // Keeps references for later unregistration purposes
    this.bpRuleHandlerMaps.push({
      rule,
      handler: checkBreakpoint,
    });
    checkBreakpoint(this.getCurrentBreakpoint());
    this.listen(checkBreakpoint);
  }
  /**
   * Disable callback functions on a set of named breakpoints.
   */
  removeBreakpointRule(rule) {
    let bpMap;
    for (let i = 0; (bpMap = this.bpRuleHandlerMaps[i]); i++) {
      if (bpMap.rule === rule) {
        this.unlisten(bpMap.handler);
      }
    }
  }
  /**
   * Setup callback functions on a media query.
   */
  addMediaQueryRule(rule) {
    const callback = this.handleMediaQueryChange(rule.transform, rule.revert);
    const mql = window.matchMedia(rule.media);
    // tslint:disable-next-line:no-any.
    const handler = () => {
      callback(mql);
    };
    // tslint:disable-next-line:deprecation
    mql.addEventListener(EventType.CHANGE, handler);
    // Keeps references for later unregistration purposes
    this.mqRuleHandlerMaps.push({
      rule,
      mql,
      handler,
    });
    // Triggers callback at once if the media query result is true.
    if (mql.matches) {
      callback(mql);
    }
  }
  /**
   * Disable callback functions on a media query.
   */
  removeMediaQueryRule(rule) {
    for (const mqMap of this.mqRuleHandlerMaps) {
      if (mqMap.rule === rule) {
        // tslint:disable-next-line:deprecation
        mqMap.mql.removeEventListener(EventType.CHANGE, mqMap.handler);
      }
    }
  }
  /**
   * Creates a function that will trigger callbacks based on the media
   * query's result.
   * @param transformFunc Function to call if the media query result is true.
   * @param revertFunc Function to call if the media query result reverts to
   *     false.
   * @return A function used as handler of a media query list.
   */
  handleMediaQueryChange(transformFunc, revertFunc) {
    return (mql) => {
      if (mql.matches) {
        transformFunc(mql);
      } else if (revertFunc) {
        revertFunc(mql);
      }
    };
  }
  /**
   * Fires breakpoint callbacks if the current named breakpoint parsed from the
   * DOM has changed since the previous call.
   */
  handleViewportUpdate() {
    const breakpoint = this.readBreakpoint();
    if (this.currentBreakpoint === breakpoint) {
      return;
    }
    this.previousBreakpoint = this.currentBreakpoint;
    this.currentBreakpoint = breakpoint;
    for (const handler of this.bpChangeHandlers) {
      handler(this.currentBreakpoint);
    }
  }
  /**
   * Retrieves the named breakpoint currently injected in DOM.
   */
  readBreakpoint() {
    const styles = window.getComputedStyle(document.body, ':after');
    const content = styles.getPropertyValue('content');
    const breakpoint = content.replace(/["']/g, '');
    return breakpoint;
  }
}
export {
  ResponsiveMonitor,
};
