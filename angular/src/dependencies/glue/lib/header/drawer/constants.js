/**
 * @fileoverview Constants used by the Header component.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-header__drawer';
CssClasses['DRAWER_IS_OPEN'] = 'glue-header__drawer--is-open';
CssClasses['TOGGLE_BTN'] = 'glue-header__drawer-toggle-btn';
CssClasses['IS_ANIMATING'] = 'glue-is-animating';
CssClasses['GLUE_BUTTON'] = 'glue-button';
CssClasses['NO_SCROLL'] = 'glue-no-scroll';
CssClasses['BACKDROP'] = 'glue-header__drawer-backdrop';
})(CssClasses || (CssClasses = {}));
var Strings;
(function(Strings) {
Strings['MISSING_DRAWER_ELEMENT'] =
    'No element with "glue-header__drawer" class was found. Drawer component needs a root element.';
Strings['MISSING_BACKDROP_ELEMENT'] =
    'No element with "glue-header__drawer-backdrop" class was found.';
Strings['OPEN'] = 'glueHeaderDrawerOpen';
Strings['CLOSE'] = 'glueHeaderDrawerClose';
Strings['TOGGLE_BTN'] = 'toggleBtn';
})(Strings || (Strings = {}));
export {CssClasses, Strings};
