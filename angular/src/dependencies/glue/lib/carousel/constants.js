/**
 * @fileoverview Constants used by the Carousel component.
 */
var CssClasses;
(function(CssClasses) {
CssClasses['LIST'] = 'glue-carousel__list';
CssClasses['VIEWPORT'] = 'glue-carousel__viewport';
CssClasses['BUTTON'] = 'glue-carousel__button';
CssClasses['BUTTON_PREV'] = 'glue-carousel__button--prev';
CssClasses['BUTTON_NEXT'] = 'glue-carousel__button--next';
CssClasses['ITEM'] = 'glue-carousel__item';
CssClasses['NAVIGATION'] = 'glue-carousel__navigation';
CssClasses['NAVIGATION_DOT'] = 'glue-carousel__dot';
CssClasses['ACTIVE'] = 'glue-is-active';
CssClasses['INACTIVE'] = 'glue-is-inactive';
CssClasses['PEEK_OUT'] = 'glue-carousel--peek-out';
CssClasses['HAS_NAVIGATION'] = 'glue-carousel--has-navigation';
CssClasses['CARDS'] = 'glue-carousel--cards';
CssClasses['DISABLE_GRAB'] = 'glue-carousel__list--disable-grab';
})(CssClasses || (CssClasses = {}));
var Numbers;
(function(Numbers) {
/**
 * A threshold value that corresponds to the Carousel viewport width.
 * It is factor, a value between 0 to 1.
 * E.g. drag threshold is 0.2 * containerWidth.
 */
Numbers[Numbers['DRAG_THRESHOLD'] = 0.2] = 'DRAG_THRESHOLD';
/**
 * The minimum distance that the user needs to move before the carousel
 * recognizes the gesture as a drag (rather than a click, etc).
 */
Numbers[Numbers['DRAGSTART_THRESHOLD_PX'] = 10] = 'DRAGSTART_THRESHOLD_PX';
/**
 * When determining the number of slides per page, if the resulting value is
 * within this range from an integer, round up, otherwise round down.
 * E.g. 1.9999962591720426 => 2
 */
Numbers[Numbers['ROUNDING_THRESHOLD'] = 0.05] = 'ROUNDING_THRESHOLD';
/**
 * Distance in pixels for the card carousel to peek out on small viewport
 */
Numbers[Numbers['PEEK_DISTANCE'] = 24] = 'PEEK_DISTANCE';
})(Numbers || (Numbers = {}));
var Strings;
(function(Strings) {
Strings['DATA_DOT'] = 'dot';
Strings['DATA_NAVIGATION_LABEL'] = 'glueCarouselNavigationLabel';
Strings['NAVIGATION_LABEL_DEFAULT'] =
    'Selected tab $glue_carousel_page_number$ of $glue_carousel_page_total$';
Strings['NAVIGATION_LABEL_NUMBER_VAR_NAME'] = '$glue_carousel_page_number$';
Strings['NAVIGATION_LABEL_TOTAL_VAR_NAME'] = '$glue_carousel_page_total$';
Strings['RTL'] = 'rtl';
Strings['SLIDE_CHANGE'] = 'gluecarouselslidechange';
Strings['TRANSITION_NONE'] = 'none';
})(Strings || (Strings = {}));
export {CssClasses, Numbers, Strings};
