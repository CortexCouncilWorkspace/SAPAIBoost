/**
 * Custom popover placements
 */
var PlacementOptions;
(function(PlacementOptions) {
PlacementOptions['LEFT'] = 'left';
PlacementOptions['RIGHT'] = 'right';
PlacementOptions['TOP'] = 'top';
PlacementOptions['BOTTOM'] = 'bottom';
})(PlacementOptions || (PlacementOptions = {}));
var CssClasses;
(function(CssClasses) {
CssClasses['PREFIX'] = 'data-glue-popover';
CssClasses['ROOT'] = 'glue-popover';
CssClasses['TRIGGER'] = 'glue-popover__trigger';
CssClasses['DIALOG'] = 'glue-popover__dialog';
CssClasses['CLOSE_BTN'] = 'glue-popover__close-btn';
CssClasses['IS_SHOWN'] = 'glue-is-shown';
CssClasses['COPY'] = 'glue-copy';
})(CssClasses || (CssClasses = {}));
var Strings;
(function(Strings) {
Strings['TRIGGER'] = 'trigger';
Strings['PLACEMENT'] = 'placement';
Strings['FOCUS'] = 'takeFocus';
Strings['ROOT'] = 'root';
Strings['MISSING_ID'] = 'Missing or invalid ID. Popover requires a unique ID';
Strings['MISSING_TRIGGER'] = 'Popover trigger element is missing';
Strings['MISSING_DIALOG'] = 'Popover dialog element is missing';
Strings['INCORRECT_PLACEMENT'] =
    'Placement value needs to be one of these: left, right, top, bottom.';
})(Strings || (Strings = {}));
var DataAttr;
(function(DataAttr) {
DataAttr['TRIGGER'] = 'gluePopoverTrigger';
})(DataAttr || (DataAttr = {}));
/**
 * Custom popover events
 */
var CustomEvent;
(function(CustomEvent) {
CustomEvent['OPEN_EVENT'] = 'gluepopovershow';
CustomEvent['CLOSE_EVENT'] = 'gluepopoverclose';
})(CustomEvent || (CustomEvent = {}));
/** Debounce timing for resize events */
const RESIZE_DEBOUNCE_TIMING = 250;
export {
  CssClasses,
  CustomEvent,
  DataAttr,
  PlacementOptions,
  RESIZE_DEBOUNCE_TIMING,
  Strings,
};
