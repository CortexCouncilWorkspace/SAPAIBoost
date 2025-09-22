/**
 * @fileoverview A list of Glue attributes.
 */
var Attribute;
(function(Attribute) {
Attribute['ARIA_CONTROLS'] = 'aria-controls';
Attribute['ARIA_CURRENT'] = 'aria-current';
Attribute['ARIA_DESCRIBEDBY'] = 'aria-describedby';
Attribute['ARIA_EXPANDED'] = 'aria-expanded';
Attribute['ARIA_HASPOPUP'] = 'aria-haspopup';
Attribute['ARIA_HIDDEN'] = 'aria-hidden';
Attribute['ARIA_LABELLEDBY'] = 'aria-labelledby';
Attribute['ARIA_LABEL'] = 'aria-label';
Attribute['ARIA_LIVE'] = 'aria-live';
Attribute['ARIA_MODAL'] = 'aria-modal';
Attribute['ARIA_SELECTED'] = 'aria-selected';
Attribute['INERT'] = 'inert';
Attribute['ROLE'] = 'role';
Attribute['TAB_INDEX'] = 'tabindex';
Attribute['TYPE'] = 'type';
})(Attribute || (Attribute = {}));
var Direction;
(function(Direction) {
Direction['LTR'] = 'ltr';
Direction['RTL'] = 'rtl';
})(Direction || (Direction = {}));
var Role;
(function(Role) {
Role['BUTTON'] = 'button';
Role['DIALOG'] = 'dialog';
Role['REGION'] = 'region';
Role['TABPANEL'] = 'tabpanel';
Role['TABLIST'] = 'tablist';
Role['NAVIGATION'] = 'navigation';
Role['TAB'] = 'tab';
Role['MENU'] = 'menu';
Role['MENUITEM'] = 'menuitem';
Role['MENUBAR'] = 'menubar';
Role['TOOLTIP'] = 'tooltip';
Role['GRIDCELL'] = 'gridcell';
Role['ROW'] = 'row';
Role['PRESENTATION'] = 'presentation';
Role['NONE'] = 'none';
})(Role || (Role = {}));
var TabIndex;
(function(TabIndex) {
TabIndex[TabIndex['TABBABLE'] = 0] = 'TABBABLE';
TabIndex[TabIndex['NOT_TABBABLE'] = -1] = 'NOT_TABBABLE';
})(TabIndex || (TabIndex = {}));
export {Attribute, Direction, Role, TabIndex};
