/**
 * @fileoverview Constants used in expansion panels components.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['GROUP'] = 'glue-expansion-panels';
CssClasses['PANEL'] = 'glue-expansion-panel';
CssClasses['CONTENT'] = 'glue-expansion-panel__content';
CssClasses['TOGGLE'] = 'glue-expansion-panel__toggle';
CssClasses['BUTTON'] = 'glue-expansion-panel__button';
CssClasses['HEADER'] = 'glue-expansion-panels__header';
CssClasses['HEADER_TEXT'] = 'glue-expansion-panel__header-text';
CssClasses['TOGGLE_ALL'] = 'glue-expansion-panels__toggle-all';
CssClasses['TOGGLE_ALL_TEXT'] = 'glue-expansion-panels__toggle-text';
CssClasses['ARROW'] = 'glue-expansion-panel__header-arrow';
CssClasses['IS_EXPANDED'] = 'glue-is-expanded';
CssClasses['IS_COLLAPSED'] = 'glue-is-collapsed';
CssClasses['IS_MIXED'] = 'glue-is-mixed';
})(CssClasses || (CssClasses = {}));
var DataAttr;
(function(DataAttr) {
DataAttr['KEY'] = 'glueExpansionPanelsKey';
DataAttr['SMOOTHANIMTIMING'] = 'glueExpansionPanelsSmoothAnimTiming';
DataAttr['TOGGLEFOR'] = 'glueExpansionPanelToggleFor';
DataAttr['INITIAL'] = 'glueExpansionPanelInitial';
DataAttr['EXPAND_TOOLTIP'] = 'glueExpansionPanelExpandTooltip';
DataAttr['COLLAPSE_TOOLTIP'] = 'glueExpansionPanelCollapseTooltip';
})(DataAttr || (DataAttr = {}));
var Strings;
(function(Strings) {
Strings['DEFAULT_INSTANCE_ID'] = 'expansion_panels';
Strings['EXPANDED'] = 'expanded';
Strings['COLLAPSED'] = 'collapsed';
Strings['MIXED'] = 'mixed';
Strings['TOOLTIP_EXPAND'] = 'Press to expand';
Strings['TOOLTIP_COLLAPSE'] = 'Press to collapse';
})(Strings || (Strings = {}));
var EventNames;
(function(EventNames) {
// dispatched by model whenever there is a change in the group status
EventNames['PANELGROUP_STATUS_CHANGED'] = 'glueExpansionPanelsStatusChanged';
// dispatched by toggle to trigger content component to expand or collapse
EventNames['TOGGLE_CONTENT'] = 'glueExpansionPanelsToggleContent';
// dispatched to trigger all content components to expand
EventNames['EXPAND_ALL_CONTENT'] = 'glueExpansionPanelsExpandAllContent';
// dispatched to trigger all content components to collapse
EventNames['COLLAPSE_ALL_CONTENT'] = 'glueExpansionPanelsCollapseAllContent';
})(EventNames || (EventNames = {}));
var ErrorMessages;
(function(ErrorMessages) {
ErrorMessages['TOGGLE_MISSING_CONTENT_ID'] =
    '[Glue Expansion Panels Toggle] - Toggle is not linked to a content element.';
ErrorMessages['TOGGLE_MISSING_CONTENT_ELEMENT'] =
    '[Glue Expansion Panels Toggle] - Cannot find content element to link toggle to.';
ErrorMessages['MISSING_CONTENT_ID'] =
    '[Glue Expansion Panels Content] - An ID must be set on the content element.';
})(ErrorMessages || (ErrorMessages = {}));
export {CssClasses, DataAttr, ErrorMessages, EventNames, Strings};
