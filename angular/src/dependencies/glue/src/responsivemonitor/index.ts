import {EventType} from '../events/eventtype';

/*
 * Local typedefs for convenience or local use.
 */
type ResponsiveChangeHandler = (size: string) => void;

type MediaQueryListListener = (
  this: MediaQueryList,
  ev: MediaQueryListEvent,
) => unknown;

type MediaQueryCallback = (mql: MediaQueryList) => void;

interface MediaQueryRuleHandlerMap {
  rule: MediaQueryRule;
  mql: MediaQueryList;
  handler: MediaQueryListListener;
}

interface BreakpointRuleHandlerMap {
  rule: BreakpointRule;
  handler(size: string): void;
}

/*
 * Export typedefs for client components.
 */
type Rule = MediaQueryRule | BreakpointRule;

type RuleSet = Rule | Rule[];

interface MediaQueryRule {
  media: string;
  transform: MediaQueryCallback;
  revert?: MediaQueryCallback;
}

interface BreakpointRule {
  breakpoint: string | string[];
  enter(size: string): void;
  leave?(size: string): void;
}

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
  private mqRuleHandlerMaps: MediaQueryRuleHandlerMap[];
  private bpChangeHandlers: ResponsiveChangeHandler[];
  private bpRuleHandlerMaps: BreakpointRuleHandlerMap[];
  private currentBreakpoint: string;
  private previousBreakpoint: string;
  private readonly vpUpdateHandler: EventListener = () => {
    this.handleViewportUpdate();
  };
  private static instance: ResponsiveMonitor;

  /**
   * Returns unique monitor instance.
   */
  static getInstance(): ResponsiveMonitor {
    if (!ResponsiveMonitor.instance) {
      ResponsiveMonitor.instance = new ResponsiveMonitor();
    }
    return ResponsiveMonitor.instance;
  }

  /**
   * @param configRules One or several media queries associated with callbacks
   *     to trigger when their result changes.
   */
  constructor(configRules: RuleSet = []) {
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
  listen(handler: ResponsiveChangeHandler | Rule) {
    if (typeof handler === 'function') {
      this.bpChangeHandlers.push(handler);
    } else {
      this.addRule(handler);
    }
  }

  /**
   * Stops listening to media query or breakpoint changes.
   */
  unlisten(handler: ResponsiveChangeHandler | Rule) {
    if (typeof handler === 'function') {
      let handler: ResponsiveChangeHandler;
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
      EventType.DOM_CONTENT_READY,
      this.vpUpdateHandler,
    );
    window.removeEventListener(EventType.RESIZE, this.vpUpdateHandler);
    window.removeEventListener(
      EventType.ORIENTATION_CHANGE,
      this.vpUpdateHandler,
    );
  }

  /**
   * Returns the last known named breakpoint.
   */
  getCurrentBreakpoint(): string {
    return this.currentBreakpoint;
  }

  private isBreakpointRule(rule: Rule): rule is BreakpointRule {
    return (rule as BreakpointRule).breakpoint !== undefined;
  }

  private isMediaQueryRuleRule(rule: Rule): rule is MediaQueryRule {
    return (rule as MediaQueryRule).media !== undefined;
  }

  /**
   * Setup callback functions on a media query or a set of named breakpoints.
   * @param rule Configuration properties.
   */
  private addRule(rule: Rule) {
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
  private removeRule(rule: Rule) {
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
  private addBreakpointRule(rule: BreakpointRule) {
    const checkBreakpoint = (size: string) => {
      const bps = rule.breakpoint;
      if (
        bps.indexOf(this.previousBreakpoint) === -1 &&
        bps.indexOf(this.currentBreakpoint) !== -1
      ) {
        rule.enter(size);
        return;
      }
      if (
        rule.leave &&
        bps.indexOf(this.previousBreakpoint) !== -1 &&
        bps.indexOf(this.currentBreakpoint) === -1
      ) {
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
  private removeBreakpointRule(rule: BreakpointRule) {
    let bpMap: BreakpointRuleHandlerMap;
    for (let i = 0; (bpMap = this.bpRuleHandlerMaps[i]); i++) {
      if (bpMap.rule === rule) {
        this.unlisten(bpMap.handler);
      }
    }
  }

  /**
   * Setup callback functions on a media query.
   */
  addMediaQueryRule(rule: MediaQueryRule) {
    const callback = this.handleMediaQueryChange(rule.transform, rule.revert);
    const mql: MediaQueryList = window.matchMedia(rule.media);

    // tslint:disable-next-line:no-any.
    const handler: MediaQueryListListener = () => {
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
  private removeMediaQueryRule(rule: MediaQueryRule) {
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
  private handleMediaQueryChange(
    transformFunc: MediaQueryCallback,
    revertFunc?: MediaQueryCallback,
  ): MediaQueryCallback {
    return (mql: MediaQueryList): void => {
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
  private handleViewportUpdate() {
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
  private readBreakpoint(): string {
    const styles = window.getComputedStyle(document.body, ':after');
    const content = styles.getPropertyValue('content');
    const breakpoint = content.replace(/["']/g, '');
    return breakpoint;
  }
}

export {
  ResponsiveMonitor,
  type BreakpointRule,
  type MediaQueryRule,
  type Rule,
  type RuleSet,
};
