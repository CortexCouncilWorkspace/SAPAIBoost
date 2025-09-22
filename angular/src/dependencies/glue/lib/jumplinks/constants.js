/**
 * @fileoverview Constants used by the Jumplinks component.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['BUTTON'] = 'glue-jumplinks__button';
CssClasses['BUTTON_LEFT'] = 'glue-jumplinks__button--prev';
CssClasses['BUTTON_RIGHT'] = 'glue-jumplinks__button--next';
CssClasses['BUTTON_ACTIVE'] = 'glue-jumplinks__button--active';
CssClasses['LIST'] = 'glue-jumplinks__list';
CssClasses['ITEMS'] = 'glue-jumplinks__list-item';
CssClasses['LINK'] = 'glue-jumplinks__link';
CssClasses['LINK_ACTIVE'] = 'glue-jumplinks__link--active';
CssClasses['VIEWPORT'] = 'glue-jumplinks__viewport';
CssClasses['REWIND'] = 'glue-jumplinks--rewind';
CssClasses['ROOT'] = 'glue-jumplinks';
})(CssClasses || (CssClasses = {}));
var Strings;
(function(Strings) {
Strings['LI_WIDTH'] = 'liWidth';
Strings['VIEWPORT'] = 'viewport';
Strings['PAGE_X'] = 'pageX';
Strings['SLIDES'] = 'slides';
Strings['ACTIVE_LINK'] = 'activeLink';
Strings['RTL'] = 'rtl';
Strings['TRANSFORM'] = 'transform';
Strings['BLOCK'] = 'block';
Strings['FIXED'] = 'fixed';
Strings['JUMPLINK_DEFAULT_LABEL'] = 'Jump to section within page';
Strings['NOT_FIXED'] = 'absolute';
Strings['NO_ANIMATION'] = 'none';
})(Strings || (Strings = {}));
var Numbers;
(function(Numbers) {
Numbers[Numbers['DEFAULT_OFFSET'] = 144] = 'DEFAULT_OFFSET';
Numbers[Numbers['JUMPLINKS_MARGIN'] = 16] = 'JUMPLINKS_MARGIN';
Numbers[Numbers['JUMPLINKS_HEIGHT'] = 48] = 'JUMPLINKS_HEIGHT';
Numbers[Numbers['SCROLL_THRESHOLD'] = 130] = 'SCROLL_THRESHOLD';
})(Numbers || (Numbers = {}));
var DataAttr;
(function(DataAttr) {
DataAttr['JUMPLINK_LABEL'] = 'glueJumplinkLabel';
})(DataAttr || (DataAttr = {}));
export {CssClasses, DataAttr, Numbers, Strings};
