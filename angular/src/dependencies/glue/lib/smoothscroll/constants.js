/**
 * @fileoverview Config typedef and event enum for SmoothScroll.
 */
import {easeInOutQuart,} from '../easing/';
var ScrollEventType;
(function(ScrollEventType) {
ScrollEventType['STARTSCROLL'] = 'glue.smoothScroll.start';
ScrollEventType['ENDSCROLL'] = 'glue.smoothScroll.end';
})(ScrollEventType || (ScrollEventType = {}));
var Strings;
(function(Strings) {
Strings['MISSING_PAGE_ELEMENT'] =
    'Smooth Scrolling requires a valid page element.';
Strings['DIRECTION_MALFORMED'] =
    'Scroll direction value only accepts "x", "y" or "both"';
})(Strings || (Strings = {}));
const defaultOptions = {
  'duration': 600,
  'offset': {
    'x': 0,
    'y': 0,
  },
  'easing': easeInOutQuart,
  'hash': true,
  'direction': 'both',
};
export {
  defaultOptions,
  ScrollEventType,
  Strings,
};
