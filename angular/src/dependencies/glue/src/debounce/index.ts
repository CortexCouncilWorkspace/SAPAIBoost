/**
 * @fileoverview A simple function to create a debounced function.
 * A debounced function wraps a function, and delay its execution every time
 * the debounced function is called. This is equivalent to goog.async.Debouncer
 * but lighter and a simpler API.
 *
 * @see https://glue-docs.appspot.com/docs/components/raw/debounce
 *
 * Example:
 *
 * // Call a function 250ms after the last scroll event fires.
 * var handleScroll = function() {};
 * window.addEventListener('scroll', new Debounce(handleScroll, 250).debounce);
 *
 */

// Add class methods here to prevent deletion in the CDN.
declare interface DebounceDef {
  debounce: () => void;
  cancel: () => void;
}

/**
 * Debounces a function after a given delay.
 */
class Debounce implements DebounceDef {
  // ID of the last debounce timeout.
  private timeoutId: number | undefined;

  /**
   * @param fn The function to debounce.
   * @param delay The delay in ms until the function should be executed.
   */
  constructor(
    private readonly fn: (...args: unknown[]) => void,
    private readonly delay: number,
  ) {}

  /**
   * Debounces by reinitializing the timer until the function should execute.
   */
  debounce() {
    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(this.fn, this.delay);
  }

  /**
   * Cancels any ongoing debouncing timer.
   */
  cancel() {
    clearTimeout(this.timeoutId);
  }
}

export {Debounce};
