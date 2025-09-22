/**
 * Data attribute used for query selecting a specific tab.
 */
var TabsAttrs;
(function(TabsAttrs) {
TabsAttrs['CURRENT'] = 'glueTabsCurrent';
})(TabsAttrs || (TabsAttrs = {}));
var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-tabs';
CssClasses['TABLIST'] = 'glue-tabs__tablist';
CssClasses['TAB'] = 'glue-tab';
CssClasses['PANEL'] = 'glue-tabs__panel';
CssClasses['PANELGROUP'] = 'glue-tabs__panelgroup';
CssClasses['IS_SHOWN'] = 'glue-is-shown';
})(CssClasses || (CssClasses = {}));
var Strings;
(function(Strings) {
Strings['TRIGGER'] = 'trigger';
Strings['PLACEMENT'] = 'placement';
Strings['FOCUS'] = 'takeFocus';
Strings['ROOT'] = 'root';
Strings['MISSING_TABLIST'] = 'Tablist element is missing.';
Strings['MISSING_TABS'] = 'Tabs element is missing.';
Strings['MISSING_TABPANELS'] = 'Tab panels element is missing.';
Strings['DATA_CURRENT'] = 'currentTab';
})(Strings || (Strings = {}));
export {CssClasses, Strings, TabsAttrs};
