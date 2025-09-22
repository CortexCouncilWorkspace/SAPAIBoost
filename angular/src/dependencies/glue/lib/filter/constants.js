var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-filter';
CssClasses['APPLY_FILTERS'] = 'glue-filter__apply-filters';
CssClasses['CATEGORIES'] = 'glue-filter__categories';
CssClasses['CATEGORY'] = 'glue-filter__category';
CssClasses['CATEGORY_ITEM'] = 'glue-filter__category-item';
CssClasses['CHIP'] = 'glue-filter__chip';
CssClasses['CHIP_ISACTIVE'] = 'glue-filter__chip--is-active';
CssClasses['CHIP_CHECKMARK'] = 'glue-filter__chip-checkmark';
CssClasses['CHIP_CLOSEBTN'] = 'glue-filter__chip-close-btn';
CssClasses['CHIPS'] = 'glue-filter__chips';
CssClasses['CHIPS_PRIMARY'] = 'glue-filter__chips--primary';
CssClasses['EXPANSIONPANELS'] = 'glue-filter__panels';
CssClasses['MODAL'] = 'glue-filter__modal';
CssClasses['MODAL_TOGGLE'] = 'glue-filter__modal-toggle';
CssClasses['MODAL_VIEWRESULTS'] = 'glue-filter__view-results';
CssClasses['RESET_ALL'] = 'glue-filter__reset-all';
CssClasses['RESET_ALL_FILTERED'] = 'glue-filter__reset-all--filtered';
CssClasses['RESULT'] = 'glue-filter__result';
CssClasses['RESULT_IS_MATCHING'] = 'glue-filter__result--is-matching';
CssClasses['RESULTS'] = 'glue-filter__results';
CssClasses['RESULTS_COUNT'] = 'glue-filter__results-count';
CssClasses['RESULTS_STATUS'] = 'glue-filter__results-status';
CssClasses['SHOW_RESULTS'] = 'glue-filter__show-results';
})(CssClasses || (CssClasses = {}));
var MaterialClasses;
(function(MaterialClasses) {
MaterialClasses['CHECKBOX'] = 'mdc-checkbox__native-control';
MaterialClasses['RADIO'] = 'mdc-radio__native-control';
MaterialClasses['LIST_ITEM'] = 'mdc-list-item';
MaterialClasses['FORM_FIELD'] = 'mdc-form-field';
MaterialClasses['LABEL'] = 'mdc-floating-label';
MaterialClasses['SELECT'] = 'mdc-select';
MaterialClasses['SELECT_LABEL'] = 'mdc-list-item__text';
MaterialClasses['MWC3_CHECKBOX'] = 'glue-mwc3-checkbox';
MaterialClasses['MWC3_RADIO'] = 'glue-mwc3-radio';
MaterialClasses['MWC3_SELECT'] = 'glue-mwc3-select';
})(MaterialClasses || (MaterialClasses = {}));
var Strings;
(function(Strings) {
// data parameters
Strings['CATEGORIES'] = 'glueFilterCategories';
Strings['CATEGORY'] = 'glueFilterCategory';
Strings['CATEGORY_ITEM'] = 'glueFilterCategoryItem';
Strings['CHIPS_LABEL_ADD'] = 'glueFilterChipsLabelAdd';
Strings['CHIPS_LABEL_REMOVE'] = 'glueFilterChipsLabelRemove';
Strings['CHIPS_LABEL_RESET'] = 'glueFilterChipsLabelReset';
Strings['DATA_VALUE'] = 'value';
Strings['STRATEGY'] = 'glueFilterStrategy';
Strings['PREFIX'] = 'data-glue-filter-';
// Layout
Strings['RTL'] = 'rtl';
// Events
Strings['UPDATE_STATUS'] = 'gluefilterupdatestatus';
Strings['MATERIALSELECT_CHANGE'] = 'MDCSelect:change';
// Defaults
Strings['CLEAR_FILTERS'] = 'Clear filters';
Strings['ADD_FILTER'] = 'Add filter';
Strings['REMOVE_FILTER'] = 'Remove filter';
// Error messages
Strings['ERROR_MISSING_CATEGORY'] =
    'Filter category is not set on the element.';
Strings['ERROR_MISSING_MATERIAL'] =
    'Material input was not found on this element';
Strings['ERROR_MISSING_VALUE'] = 'Attribute "value" is not set on the element.';
})(Strings || (Strings = {}));
export {CssClasses, MaterialClasses, Strings};
