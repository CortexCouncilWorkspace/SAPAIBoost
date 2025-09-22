/**
 * @fileoverview Constants used when working with key events.
 */

enum Key {
  ENTER = 'Enter',
  SPACE = ' ',
  TAB = 'Tab',
  ESC = 'Escape',
  // These only trigger with `keydown` not `keypress` on Chrome.
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  HOME = 'Home',
  END = 'End',
  PAGEUP = 'PageUp',
  PAGEDOWN = 'PageDown',
}

enum KeyCode {
  ENTER = 13,
  SPACE = 32,
  TAB = 9,
  ESC = 27,
  LEFT = 37, // also NUM_WEST
  UP = 38, // also NUM_NORTH
  RIGHT = 39, // also NUM_EAST
  DOWN = 40, // also NUM_SOUTH
  HOME = 36,
  END = 35,
  PAGEUP = 33,
  PAGEDOWN = 34,
}

export {Key, KeyCode};
