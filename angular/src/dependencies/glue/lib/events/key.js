/**
 * @fileoverview Constants used when working with key events.
 */
var Key;
(function(Key) {
Key['ENTER'] = 'Enter';
Key['SPACE'] = ' ';
Key['TAB'] = 'Tab';
Key['ESC'] = 'Escape';
// These only trigger with `keydown` not `keypress` on Chrome.
Key['LEFT'] = 'ArrowLeft';
Key['UP'] = 'ArrowUp';
Key['RIGHT'] = 'ArrowRight';
Key['DOWN'] = 'ArrowDown';
Key['HOME'] = 'Home';
Key['END'] = 'End';
Key['PAGEUP'] = 'PageUp';
Key['PAGEDOWN'] = 'PageDown';
})(Key || (Key = {}));
var KeyCode;
(function(KeyCode) {
KeyCode[KeyCode['ENTER'] = 13] = 'ENTER';
KeyCode[KeyCode['SPACE'] = 32] = 'SPACE';
KeyCode[KeyCode['TAB'] = 9] = 'TAB';
KeyCode[KeyCode['ESC'] = 27] = 'ESC';
KeyCode[KeyCode['LEFT'] = 37] = 'LEFT';
KeyCode[KeyCode['UP'] = 38] = 'UP';
KeyCode[KeyCode['RIGHT'] = 39] = 'RIGHT';
KeyCode[KeyCode['DOWN'] = 40] = 'DOWN';
KeyCode[KeyCode['HOME'] = 36] = 'HOME';
KeyCode[KeyCode['END'] = 35] = 'END';
KeyCode[KeyCode['PAGEUP'] = 33] = 'PAGEUP';
KeyCode[KeyCode['PAGEDOWN'] = 34] = 'PAGEDOWN';
})(KeyCode || (KeyCode = {}));
export {Key, KeyCode};
