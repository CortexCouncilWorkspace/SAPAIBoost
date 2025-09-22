var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-header__stepped-nav';
CssClasses['CONTROLS_CONTAINER'] =
    'glue-header__stepped-nav-controls-container';
CssClasses['CONTROLS'] = 'glue-header__stepped-nav-controls';
CssClasses['CONTROLS_TITLE'] = 'glue-header__stepped-nav-controls-title';
CssClasses['MENU_CONTAINER'] = 'glue-header__stepped-nav-menus';
CssClasses['SUBNAV_ICON'] = 'glue-header__stepped-nav-subnav-icon';
CssClasses['PARENT_POSITION'] = 'glue-header__stepped-nav-parent-position';
CssClasses['PAGE'] = 'glue-stepped-page';
CssClasses['PAGES'] = 'glue-stepped-pages';
})(CssClasses || (CssClasses = {}));
var Attributes;
(function(Attributes) {
Attributes['PARENT_INDEX'] = 'data-glue-stepped-nav-parent-index';
Attributes['PARENT_INDEX_CAMEL'] = 'glueSteppedNavParentIndex';
Attributes['STEPPED_PAGE'] = 'data-glue-stepped-page';
Attributes['STEPPED_PAGE_CAMEL'] = 'glueSteppedPage';
Attributes['STEPPEDNAV_LABEL'] = 'glueSteppednavLabel';
})(Attributes || (Attributes = {}));
var Strings;
(function(Strings) {
Strings['CURRENT_PAGE'] = 'currentPage';
Strings['TOTAL_PAGES'] = 'totalPages';
Strings['NEXT_EVENT'] = 'nextPage';
Strings['CONTROLS_MODEL_ID'] = 'stepped-nav-controls';
Strings['MISSING_CONTROLS'] =
    'Some of the Stepped Nav controls elements are missing.';
Strings['MISSING_PAGES_CONT'] =
    'The container element for Stepped Nav Pages is missing.';
Strings['MISSING_LINK_BAR'] =
    'Stepped Nav can\'t find the Link Bar Header element.';
Strings['STEPPED_PAGE'] = 'glue-stepped-page';
Strings['STEPPEDNAV_LABEL'] =
    '$glue_steppednav_label$, Navigate back to parent menu, $glue_steppednav_label$ opened';
Strings['STEPPED_NAV_LABEL_VAR_NAME'] = '$glue_steppednav_label$';
})(Strings || (Strings = {}));
export {Attributes, CssClasses, Strings};
