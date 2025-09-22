/**
 * @fileoverview Constants used in Tab panels component.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['TABPANEL_CONTAINER'] = 'glue-tabpanels';
CssClasses['TABPANEL_CENTERED'] = 'glue-tabpanels--centeredtabs';
CssClasses['TABPANEL_ICON'] = 'glue-tabpanels__heading-icon';
CssClasses['TABPANEL_PAGE_LIST'] = 'glue-tabpanels__page-list';
CssClasses['TABPANEL_PANEL_LIST'] = 'glue-tabpanels__panel-list';
CssClasses['TABPANEL_PANEL_TOGGLE'] = 'glue-tabpanels__panel-toggle';
CssClasses['TABPANEL_PANEL_BUTTON'] = 'glue-tabpanels__panel-button';
CssClasses['TABPANEL_PANEL_TITLE'] = 'glue-tabpanels__panel-title';
CssClasses['TABPANEL_PANEL_CONTENT'] = 'glue-tabpanels__panel-content';
CssClasses['TABPANEL_ELEMENT_SCOPE'] = 'glue-tabpanels__scope';
CssClasses['PANELS_TOGGLE_HEADER'] = 'glue-expansion-panel__button-header';
CssClasses['TABSET_ROOT'] = 'glue-tabs';
CssClasses['TABSET_TABLIST'] = 'glue-tabs__tablist';
CssClasses['TABSET_TAB'] = 'glue-tab';
CssClasses['TABSET_BUTTON'] = 'glue-tabs__button';
CssClasses['TABSET_PANELCONTAINER'] = 'glue-tabs__panelgroup';
CssClasses['TABSET_PAGE'] = 'glue-tabs__panel';
})(CssClasses || (CssClasses = {}));
var DataAttr;
(function(DataAttr) {
DataAttr['PANELS_KEY'] = 'glueExpansionPanelsKey';
DataAttr['TOGGLEFOR'] = 'glueExpansionPanelToggleFor';
DataAttr['INITIAL'] = 'glueExpansionPanelInitial';
})(DataAttr || (DataAttr = {}));
var Strings;
(function(Strings) {
Strings['MISSING_PAGE_LIST'] =
    'No element with glue-tabpanels__page-list class was found. TabPanels requires a Panels Page List';
Strings['MISSING_PANEL_LIST'] =
    'No element with glue-tabpanels__panel-list class was found. TabPanels requires a Panel List';
})(Strings || (Strings = {}));
export {CssClasses, DataAttr, Strings};
