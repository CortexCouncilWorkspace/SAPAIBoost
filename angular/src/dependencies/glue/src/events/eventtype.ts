/**
 * @fileoverview Constants of event types.
 */

enum EventType {
  // Mouse
  CLICK = 'click',
  FOCUS = 'focus',
  MOUSEENTER = 'mouseenter',
  MOUSEOVER = 'mouseover',
  MOUSELEAVE = 'mouseleave',
  MOUSEOUT = 'mouseout',
  MOUSEWHEEL = 'mousewheel',
  HOVER = 'hover',
  NONE = 'none',
  MOUSEDOWN = 'mousedown',
  MOUSEMOVE = 'mousemove',
  MOUSEUP = 'mouseup',

  // Keyboard
  KEYDOWN = 'keydown',
  KEYPRESS = 'keypress',
  KEYUP = 'keyup',

  BLUR = 'blur',
  LOAD = 'load',
  PAN = 'pan',
  PAN_LEFT = 'panleft',
  PAN_RIGHT = 'panright',
  PAN_END = 'panend',
  PAN_START = 'panstart',
  PAN_MOVE = 'panmove',
  SCROLL = 'scroll',

  // Element
  CHANGE = 'change',
  FOCUS_IN = 'focusin',
  FOCUS_OUT = 'focusout',

  // CSS Event
  TRANSITIONEND = 'transitionend',
  TRANSITIONSTART = 'transitionstart',

  // Viewport
  RESIZE = 'resize',
  ORIENTATION_CHANGE = 'orientationchange',
  DOM_CONTENT_READY = 'DOMContentReady',
  HASHCHANGE = 'hashchange',

  // Pointer
  POINTERDOWN = 'pointerdown',
  POINTERMOVE = 'pointermove',
  POINTERUP = 'pointerup',
  POINTERCANCEL = 'pointercancel',

  // Touch
  TOUCHSTART = 'touchstart',
  TOUCHMOVE = 'touchmove',
  TOUCHEND = 'touchend',
  TOUCHCANCEL = 'touchcancel',
}

export {EventType};
