/**
 * @fileoverview Constants of event types.
 */
var EventType;
(function(EventType) {
// Mouse
EventType['CLICK'] = 'click';
EventType['FOCUS'] = 'focus';
EventType['MOUSEENTER'] = 'mouseenter';
EventType['MOUSEOVER'] = 'mouseover';
EventType['MOUSELEAVE'] = 'mouseleave';
EventType['MOUSEOUT'] = 'mouseout';
EventType['MOUSEWHEEL'] = 'mousewheel';
EventType['HOVER'] = 'hover';
EventType['NONE'] = 'none';
EventType['MOUSEDOWN'] = 'mousedown';
EventType['MOUSEMOVE'] = 'mousemove';
EventType['MOUSEUP'] = 'mouseup';
// Keyboard
EventType['KEYDOWN'] = 'keydown';
EventType['KEYPRESS'] = 'keypress';
EventType['KEYUP'] = 'keyup';
EventType['BLUR'] = 'blur';
EventType['LOAD'] = 'load';
EventType['PAN'] = 'pan';
EventType['PAN_LEFT'] = 'panleft';
EventType['PAN_RIGHT'] = 'panright';
EventType['PAN_END'] = 'panend';
EventType['PAN_START'] = 'panstart';
EventType['PAN_MOVE'] = 'panmove';
EventType['SCROLL'] = 'scroll';
// Element
EventType['CHANGE'] = 'change';
EventType['FOCUS_IN'] = 'focusin';
EventType['FOCUS_OUT'] = 'focusout';
// CSS Event
EventType['TRANSITIONEND'] = 'transitionend';
EventType['TRANSITIONSTART'] = 'transitionstart';
// Viewport
EventType['RESIZE'] = 'resize';
EventType['ORIENTATION_CHANGE'] = 'orientationchange';
EventType['DOM_CONTENT_READY'] = 'DOMContentReady';
EventType['HASHCHANGE'] = 'hashchange';
// Pointer
EventType['POINTERDOWN'] = 'pointerdown';
EventType['POINTERMOVE'] = 'pointermove';
EventType['POINTERUP'] = 'pointerup';
EventType['POINTERCANCEL'] = 'pointercancel';
// Touch
EventType['TOUCHSTART'] = 'touchstart';
EventType['TOUCHMOVE'] = 'touchmove';
EventType['TOUCHEND'] = 'touchend';
EventType['TOUCHCANCEL'] = 'touchcancel';
})(EventType || (EventType = {}));
export {EventType};
