/**
 * @fileoverview Constants used by the Copy component.
 */
/**
 * Classes that identify sub elements or adjust display of sub elements.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-copy';
CssClasses['VALUE'] = 'glue-copy-value';
CssClasses['BUTTON'] = 'glue-copy-button';
CssClasses['IS_COPIED'] = 'glue-is-copied';
CssClasses['POPOVER_ROOT'] = 'glue-popover';
CssClasses['SOCIAL_POPOVER_ROOT'] = 'glue-social__popover';
})(CssClasses || (CssClasses = {}));
/**
 * List of demos used by demo server.
 */
var Demos;
(function(Demos) {
Demos['BASE'] = 'base';
Demos['SOCIAL'] = 'social';
})(Demos || (Demos = {}));
/**
 * Data properties that identify user-provided messages.
 */
var Message;
(function(Message) {
Message['SUCCESS'] = 'glue-copy-success';
Message['FAIL'] = 'glue-copy-fail';
})(Message || (Message = {}));
/**
 * Various strings used throughout the copy component.
 */
var Strings;
(function(Strings) {
/**
 * Error message provided if input element is not found.
 */
Strings['MISSING_INPUT'] = 'Input element is missing';
/**
 * Error message provided if copy button element is not found.
 */
Strings['MISSING_COPY_BUTTON'] = 'Copy button is missing';
/**
 * Default message shown to users after successful copy operation.
 */
Strings['SUCCESS_MESSAGE'] = 'Copied to clipboard';
/**
 * Default message shown to users after failed copy operation.
 */
Strings['FAIL_MESSAGE'] = 'Press Ctrl+C or \u2318+C to copy';
})(Strings || (Strings = {}));
export {CssClasses, Demos, Message, Strings};
