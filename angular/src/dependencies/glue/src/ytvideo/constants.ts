/**
 * Component element data attribute names used as player options.
 */
enum DataAttrs {
  VIDEO_ID = 'glueYtVideoVid',
  PLAYER_ID = 'glueYtPlayerId',
  HEIGHT = 'glueYtVideoHeight',
  WIDTH = 'glueYtVideoWidth',
  PLAYER_VARS = 'glueYtVideoPlayerVars',
}

enum CssClasses {
  BASE = 'glue-video',
  PREVIEW_CONTAINER = 'glue-video__preview-container',
  DURATION = 'glue-video__timestamp-duration',
  HIDE_ELEMENT = 'glue-video--hidden',
  IMAGE_CONTAINER = 'glue-video__preview-image',
  TIMESTAMP = 'glue-video__timestamp',
  TIMESTAMP_SHOW = 'glue-video__timestamp--visible',
  VIDEO_CONTAINER = 'glue-video__container',
  INLINE_VIDEO = 'glue-video__preview-container--inline',
  LABEL = 'glue-video__label',
}

enum ErrorMessages {
  MISSING_VIDEO = 'The video element is missing',
}

export {CssClasses, DataAttrs, ErrorMessages};
