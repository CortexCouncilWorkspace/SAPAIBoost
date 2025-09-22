var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-tooltip';
CssClasses['ANIMATION'] = 'glue-tooltip__content--animation';
CssClasses['BODY'] = 'glue-tooltip__body';
CssClasses['CONTENT'] = 'glue-tooltip__content';
CssClasses['HEADER'] = 'glue-tooltip__header';
CssClasses['LINK'] = 'glue-tooltip__link';
CssClasses['RICH'] = 'glue-tooltip--rich';
CssClasses['SHOW_TOOLTIP'] = 'glue-tooltip__content--shown';
CssClasses['TRIGGER'] = 'glue-tooltip__trigger';
CssClasses['TRIGGER_LINK'] = 'glue-tooltip__trigger--link';
CssClasses['TRIGGER_ICON'] = 'glue-tooltip__trigger--icon';
CssClasses['TRIGGER_ICONAFTER'] = 'glue-tooltip__trigger--icon-after';
CssClasses['TONAL_LINK'] = 'glue-inline-tonal-link';
})(CssClasses || (CssClasses = {}));
/**
 * Custom tooltip events
 */
var CustomEvent;
(function(CustomEvent) {
CustomEvent['CLOSE_EVENT'] = 'gluetooltipclose';
CustomEvent['SHOW_EVENT'] = 'gluetooltipshow';
})(CustomEvent || (CustomEvent = {}));
var ErrorMessage;
(function(ErrorMessage) {
ErrorMessage['MISSING_CONTENT'] = 'The tooltip content element is missing';
ErrorMessage['MISSING_TRIGGER'] = 'The tooltip trigger element is missing';
ErrorMessage['INCORRECT_POSITION'] =
    'data-glue-tooltip-auto-position attribute only accepts true or false value.';
})(ErrorMessage || (ErrorMessage = {}));
var DataAttrs;
(function(DataAttrs) {
DataAttrs['AUTO_POSITION'] = 'glueTooltipAutoPosition';
})(DataAttrs || (DataAttrs = {}));
export {CssClasses, CustomEvent, DataAttrs, ErrorMessage};
