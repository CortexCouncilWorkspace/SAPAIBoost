/**
 * @fileoverview Config typedef and event enum for SmoothScroll.
 */

import {
  easeInOutQuart,
  EasingFunctionName,
  SimpleEasingFunction,
} from '../easing/';

interface SmoothScrollPosition {
  x: number;
  y: number;
}

interface SmoothScrollOptions {
  duration: number;
  offset: SmoothScrollPosition;
  easing: EasingFunctionName | SimpleEasingFunction;
  hash: boolean;
  direction: string;
  id?: string;
}

enum ScrollEventType {
  STARTSCROLL = 'glue.smoothScroll.start',
  ENDSCROLL = 'glue.smoothScroll.end',
}

enum Strings {
  MISSING_PAGE_ELEMENT = 'Smooth Scrolling requires a valid page element.',
  DIRECTION_MALFORMED = 'Scroll direction value only accepts "x", "y" or "both"',
}

const defaultOptions: SmoothScrollOptions = {
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
  type SmoothScrollOptions,
  type SmoothScrollPosition,
};
