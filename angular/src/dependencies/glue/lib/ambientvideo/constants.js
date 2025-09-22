var CssClasses;
(function(CssClasses) {
CssClasses['ROOT'] = 'glue-ambient-video';
CssClasses['BUTTON'] = 'glue-ambient-video__button';
CssClasses['BUTTON_PAUSE'] = 'glue-ambient-video__button--paused';
CssClasses['BUTTON_ICON'] = 'glue-ambient-video__icon';
CssClasses['BUTTON_ICON_PLAY'] = 'glue-ambient-video__icon-play';
CssClasses['BUTTON_ICON_PAUSE'] = 'glue-ambient-video__icon-pause';
CssClasses['VIDEO_CONTAINER'] = 'glue-ambient-video__container';
CssClasses['LIGHT'] = 'glue-ambient-video--light';
CssClasses['TOOLTIP'] = 'glue-ambient-video__tooltip';
CssClasses['TOOLTIP_PLAY'] = 'glue-ambient-video__tooltip-play';
CssClasses['TOOLTIP_PAUSE'] = 'glue-ambient-video__tooltip-pause';
})(CssClasses || (CssClasses = {}));
var ErrorMessage;
(function(ErrorMessage) {
ErrorMessage['BUTTON_ELEMENT_MISSING'] = 'Ambient Button element is missing.';
ErrorMessage['BUTTON_ICON_ELEMENT_MISSING'] =
    'Ambient Button Icon element is missing';
ErrorMessage['MEDIA_ELEMENT_MISSING'] = 'Ambient Media element is missing.';
ErrorMessage['PLAY_VIDEO_ERROR'] = 'Play video interrupted.';
ErrorMessage['TOOLTIP_PLAY_MISSING'] =
    'Ambient Tooltip play element is missing';
ErrorMessage['TOOLTIP_PAUSE_MISSING'] =
    'Ambient Tooltip pause element is missing';
})(ErrorMessage || (ErrorMessage = {}));
export {CssClasses, ErrorMessage};
