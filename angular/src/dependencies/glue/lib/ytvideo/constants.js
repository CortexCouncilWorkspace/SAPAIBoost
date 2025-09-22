/**
 * Component element data attribute names used as player options.
 */
var DataAttrs;
(function(DataAttrs) {
DataAttrs['VIDEO_ID'] = 'glueYtVideoVid';
DataAttrs['PLAYER_ID'] = 'glueYtPlayerId';
DataAttrs['HEIGHT'] = 'glueYtVideoHeight';
DataAttrs['WIDTH'] = 'glueYtVideoWidth';
DataAttrs['PLAYER_VARS'] = 'glueYtVideoPlayerVars';
})(DataAttrs || (DataAttrs = {}));
var CssClasses;
(function(CssClasses) {
CssClasses['BASE'] = 'glue-video';
CssClasses['PREVIEW_CONTAINER'] = 'glue-video__preview-container';
CssClasses['DURATION'] = 'glue-video__timestamp-duration';
CssClasses['HIDE_ELEMENT'] = 'glue-video--hidden';
CssClasses['IMAGE_CONTAINER'] = 'glue-video__preview-image';
CssClasses['TIMESTAMP'] = 'glue-video__timestamp';
CssClasses['TIMESTAMP_SHOW'] = 'glue-video__timestamp--visible';
CssClasses['VIDEO_CONTAINER'] = 'glue-video__container';
CssClasses['INLINE_VIDEO'] = 'glue-video__preview-container--inline';
CssClasses['LABEL'] = 'glue-video__label';
})(CssClasses || (CssClasses = {}));
var ErrorMessages;
(function(ErrorMessages) {
ErrorMessages['MISSING_VIDEO'] = 'The video element is missing';
})(ErrorMessages || (ErrorMessages = {}));
export {CssClasses, DataAttrs, ErrorMessages};
