/**
 * @fileoverview A series of utility functions for use in implementing easing in
 * javascript animations.
 *
 * Closure provides three easing functions (goog.fx.easing.easeIn,
 * goog.fx.easing.easeOut, goog.fx.easing.inAndOut), but as that is a woefully
 * inadequate library for broad animation use, this series of functions adds
 * many more options to be used in a similar way. Easing functions are useful
 * for adding a natural feel to what would otherwise be unrealistic, linear
 * animations.
 *
 * Example usage: Say you have a DOM element that you want to animate by moving
 * it between two arbitrary locations in a page, over 2 seconds. Normally you'd
 * determine its starting position, its ending position, set up an interval,
 * then with each iteration, determine the position you should move it to based
 * on its initial and ending position values and a percentage that represents
 * its progress from start to finish, based on the 2 second duration. Call that
 * percentage T. In order to implement an easing method using glue.fx.easing,
 * simply pass T through your desired easing method, and the returned value is
 * an "eased" value of T. Using that new T, you set the element's position,
 * and the resulting animation will have a smooth ease to it, instead of its
 * original, jarring linear movement. It's hard to understand this without
 * seeing it in action, so visit the example link below for some live animation
 * utilizing all of the easing functions provided in this library.
 *
 * If you are more familiar with jQuery's style of easing methods which expect
 * four arguments (t, b, c, d), you can use glue.fx.easing.ease(), passing in
 * those four arguments and a reference to the easing method you'd like to use.
 * Whether you should use this, or directly call one of the single-argument
 * methods, is up to the developer, and largely depends on circumstance.
 *
 * Note: Frequently, you will have the easing method by name in string form (as
 * when contained in some JSON configuration data), so you can also call it
 * like: glue.fx.easing[methodName](percentage);
 *
 * For examples, see:
 * https://glue-docs.appspot.com/docs/components/raw/fx-easing
 *
 * A namespace for the easing functions. This is being created and exported
 * because we will often have the name of our desired easing method by string
 * only, so we'll need to test to see if glue.fx.easing contains a property
 * (function) with that name, and then call it like so:
 * glue.fx.easing[methodName](percentage);
 */

/**
 * An easing function with one arguments.
 */
export type SimpleEasingFunction = (t: number) => number;

/**
 * An easing function with many arguments.
 */
export type ComplexEasingFunction = (
  t: number,
  b: number,
  c: number,
  d: number,
  func: (p1: number) => number,
) => number;

/**
 * A union type of all easing function names.
 */
export type EasingFunctionName =
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'
  | 'linear';

/**
 * Eases values based on the typical four-argument easing method structure used
 * by popular libraries like jQuery. This is an adapter to interface with the
 * single-argument easing methods in this class.
 * @param t Current time of the animation.
 * @param b Beginning value of the property to be eased.
 * @param c Total change in the property value across this animation.
 * @param d Total duration of the animation.
 * @param func The easing method to call.
 * @return The final eased value.
 */
export function ease(
  t: number,
  b: number,
  c: number,
  d: number,
  func: (p1: number) => number,
): number {
  return b + c * func(t / d);
}

/**
 * Eases the value in with a Sine curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInSine(t: number): number {
  return t === 0 || t === 1 ? t : 1 - Math.cos(t * (Math.PI / 2));
}

/**
 * Eases the value out with a Sine curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutSine(t: number): number {
  return t === 0 || t === 1 ? t : Math.sin(t * (Math.PI / 2));
}

/**
 * Eases the value in and out with a Sine curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutSine(t: number): number {
  return t === 0 || t === 1 ? t : -0.5 * (Math.cos(Math.PI * t) - 1);
}

/**
 * Eases the value in with a quadratic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInQuad(t: number): number {
  return t === 0 || t === 1 ? t : t * t;
}

/**
 * Eases the value out with a quadratic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutQuad(t: number): number {
  return t === 0 || t === 1 ? t : t * (2 - t);
}

/**
 * Eases the value in and out with a quadratic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutQuad(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return 2 * t * t;
  } else {
    return -1 + (4 - 2 * t) * t;
  }
}

/**
 * Eases the value in with a cubic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInCubic(t: number): number {
  return t === 0 || t === 1 ? t : t * t * t;
}

/**
 * Eases the value out with a cubic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutCubic(t: number): number {
  return t === 0 || t === 1 ? t : --t * t * t + 1;
}

/**
 * Eases the value in and out with a cubic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutCubic(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return 4 * t * t * t;
  } else {
    return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}

/**
 * Eases the value in with a quartic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInQuart(t: number): number {
  return t === 0 || t === 1 ? t : t * t * t * t;
}

/**
 * Eases the value out with a quartic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutQuart(t: number): number {
  return t === 0 || t === 1 ? t : 1 - --t * t * t * t;
}

/**
 * Eases the value in and out with a quartic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutQuart(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return 8 * t * t * t * t;
  } else {
    return 1 - 8 * --t * t * t * t;
  }
}

/**
 * Eases the value in with a quintic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInQuint(t: number): number {
  return t === 0 || t === 1 ? t : t * t * t * t * t;
}

/**
 * Eases the value out with a quintic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutQuint(t: number): number {
  return t === 0 || t === 1 ? t : 1 + --t * t * t * t * t;
}

/**
 * Eases the value in and out with a quintic curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutQuint(t: number): number {
  return t === 0 || t === 1
    ? t
    : t < 0.5
      ? 16 * t * t * t * t * t
      : 1 + 16 * --t * t * t * t * t;
}

/**
 * Eases the value in with an exponential curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInExpo(t: number): number {
  return t === 0 || t === 1 ? t : Math.pow(2, 10 * (t - 1));
}

/**
 * Eases the value out with an exponential curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutExpo(t: number): number {
  return t === 0 || t === 1 ? t : 1 - Math.pow(2, -10 * t);
}

/**
 * Eases the value in and out with an exponential curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutExpo(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return 0.5 * Math.pow(2, 10 * (t * 2 - 1));
  } else {
    return 0.5 * (2 - Math.pow(2, -10 * (t * 2 - 1)));
  }
}

/**
 * Eases the value in with a circular curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInCirc(t: number): number {
  return t === 0 || t === 1 ? t : 1 - Math.sqrt(1 - t * t);
}

/**
 * Eases the value out with a circular curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutCirc(t: number): number {
  return t === 0 || t === 1 ? t : Math.sqrt(1 - (t - 1) * (t - 1));
}

/**
 * Eases the value in and out with a circular curve.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutCirc(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return -0.5 * (Math.sqrt(1 - t * t * 4) - 1);
  } else {
    return 0.5 * (Math.sqrt(1 - 4 * (t - 1) * (t - 1)) + 1);
  }
}

/**
 * Eases the value in after bounding backwards at the beginning.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInBack(t: number): number {
  return t === 0 || t === 1 ? t : t * t * (2.70158 * t - 1.70158);
}

/**
 * Eases the value out after bounding past the end point and back.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutBack(t: number): number {
  return t === 0 || t === 1
    ? t
    : (t - 1) * (t - 1) * (2.70158 * (t - 1) + 1.70158) + 1;
}

/**
 * Eases the value in and out with an initial and ending movement beyond the
 * full range.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutBack(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return 0.5 * (t * 2) * (t * 2) * (3.5949095 * (t * 2) - 2.5949095);
  } else {
    return (
      0.5 *
      ((t * 2 - 2) * (t * 2 - 2) * (3.5949095 * (t * 2 - 2) + 2.5949095) + 2)
    );
  }
}

/**
 * Eases the value in with an elastic springy motion.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInElastic(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else {
    return (
      -1 *
      (Math.pow(2, 10 * (t - 1)) *
        Math.sin(((t - 1.075) * (2 * Math.PI)) / 0.3))
    );
  }
}

/**
 * Eases the value out with an elastic springy motion.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutElastic(t: number): number {
  return t === 0 || t === 1
    ? t
    : Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1;
}

/**
 * Eases the value in and out with an elastic springy motion.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutElastic(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return (
      -0.5 *
      (Math.pow(2, 10 * (t * 2 - 1)) *
        Math.sin(((t * 2 - 1.1125) * 2 * Math.PI) / 0.45))
    );
  } else {
    return (
      0.5 *
        Math.pow(2, -10 * (t * 2 - 1)) *
        Math.sin(((t * 2 - 1.1125) * 2 * Math.PI) / 0.45) +
      1
    );
  }
}

/**
 * Eases the value in with a simple physics bounce.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInBounce(t: number): number {
  return t === 0 || t === 1 ? t : 1 - easeOutBounce(1 - t);
}

/**
 * Eases the value out with a simple physics bounce.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeOutBounce(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + 0.9375;
  } else {
    return 7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + 0.984375;
  }
}

/**
 * Eases the value in and out with starting and ending bounces.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function easeInOutBounce(t: number): number {
  if (t === 0 || t === 1) {
    return t;
  } else if (t < 0.5) {
    return easeInBounce(t * 2) * 0.5;
  } else {
    return easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
  }
}

/**
 * Returns the value without any easing. This is only useful if a script is
 * expecting an easing method, but one isn't needed in that instance.
 * @param t Input between 0 and 1.
 * @return Output between 0 and 1.
 */
export function linear(t: number): number {
  return t;
}

/**
 * A Record/Map for easing functions.
 * This is for looking up an easing function by name.
 */
export const easingFunctions: Record<EasingFunctionName, SimpleEasingFunction> =
  {
    'easeInSine': easeInSine,
    'easeOutSine': easeOutSine,
    'easeInOutSine': easeInOutSine,
    'easeInQuad': easeInQuad,
    'easeOutQuad': easeOutQuad,
    'easeInOutQuad': easeInOutQuad,
    'easeInCubic': easeInCubic,
    'easeOutCubic': easeOutCubic,
    'easeInOutCubic': easeInOutCubic,
    'easeInQuart': easeInQuart,
    'easeOutQuart': easeOutQuart,
    'easeInOutQuart': easeInOutQuart,
    'easeInQuint': easeInQuint,
    'easeOutQuint': easeOutQuint,
    'easeInOutQuint': easeInOutQuint,
    'easeInExpo': easeInExpo,
    'easeOutExpo': easeOutExpo,
    'easeInOutExpo': easeInOutExpo,
    'easeInCirc': easeInCirc,
    'easeOutCirc': easeOutCirc,
    'easeInOutCirc': easeInOutCirc,
    'easeInBack': easeInBack,
    'easeOutBack': easeOutBack,
    'easeInOutBack': easeInOutBack,
    'easeInElastic': easeInElastic,
    'easeOutElastic': easeOutElastic,
    'easeInOutElastic': easeInOutElastic,
    'easeInBounce': easeInBounce,
    'easeOutBounce': easeOutBounce,
    'easeInOutBounce': easeInOutBounce,
    'linear': linear,
  };
