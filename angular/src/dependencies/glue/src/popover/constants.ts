/**
 * Custom popover placements
 */
enum PlacementOptions {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

enum CssClasses {
  PREFIX = 'data-glue-popover',
  ROOT = 'glue-popover',
  TRIGGER = 'glue-popover__trigger',
  DIALOG = 'glue-popover__dialog',
  CLOSE_BTN = 'glue-popover__close-btn',
  IS_SHOWN = 'glue-is-shown',
  COPY = 'glue-copy',
}

enum Strings {
  TRIGGER = 'trigger',
  PLACEMENT = 'placement',
  FOCUS = 'takeFocus',
  ROOT = 'root',
  MISSING_ID = 'Missing or invalid ID. Popover requires a unique ID',
  MISSING_TRIGGER = 'Popover trigger element is missing',
  MISSING_DIALOG = 'Popover dialog element is missing',
  INCORRECT_PLACEMENT = 'Placement value needs to be one of these: left, right, top, bottom.',
}

enum DataAttr {
  TRIGGER = 'gluePopoverTrigger',
}

/**
 * Custom popover events
 */
enum CustomEvent {
  OPEN_EVENT = 'gluepopovershow',
  CLOSE_EVENT = 'gluepopoverclose',
}

/** Debounce timing for resize events */
const RESIZE_DEBOUNCE_TIMING = 250;

export {
  CssClasses,
  CustomEvent,
  DataAttr,
  PlacementOptions,
  RESIZE_DEBOUNCE_TIMING,
  Strings,
};
