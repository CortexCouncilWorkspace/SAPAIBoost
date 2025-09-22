/**
 * @fileoverview Constants used in expansion panels components.
 */

enum CssClasses {
  GROUP = 'glue-expansion-panels',
  PANEL = 'glue-expansion-panel',
  CONTENT = 'glue-expansion-panel__content',
  TOGGLE = 'glue-expansion-panel__toggle',
  BUTTON = 'glue-expansion-panel__button',
  HEADER = 'glue-expansion-panels__header',
  HEADER_TEXT = 'glue-expansion-panel__header-text',
  TOGGLE_ALL = 'glue-expansion-panels__toggle-all',
  TOGGLE_ALL_TEXT = 'glue-expansion-panels__toggle-text',
  ARROW = 'glue-expansion-panel__header-arrow',
  IS_EXPANDED = 'glue-is-expanded',
  IS_COLLAPSED = 'glue-is-collapsed',
  IS_MIXED = 'glue-is-mixed',
}

enum DataAttr {
  KEY = 'glueExpansionPanelsKey',
  SMOOTHANIMTIMING = 'glueExpansionPanelsSmoothAnimTiming',
  TOGGLEFOR = 'glueExpansionPanelToggleFor',
  INITIAL = 'glueExpansionPanelInitial',
  EXPAND_TOOLTIP = 'glueExpansionPanelExpandTooltip',
  COLLAPSE_TOOLTIP = 'glueExpansionPanelCollapseTooltip',
}

enum Strings {
  DEFAULT_INSTANCE_ID = 'expansion_panels',
  EXPANDED = 'expanded',
  COLLAPSED = 'collapsed',
  MIXED = 'mixed',
  TOOLTIP_EXPAND = 'Press to expand',
  TOOLTIP_COLLAPSE = 'Press to collapse',
}

enum EventNames {
  // dispatched by model whenever there is a change in the group status
  PANELGROUP_STATUS_CHANGED = 'glueExpansionPanelsStatusChanged',
  // dispatched by toggle to trigger content component to expand or collapse
  TOGGLE_CONTENT = 'glueExpansionPanelsToggleContent',
  // dispatched to trigger all content components to expand
  EXPAND_ALL_CONTENT = 'glueExpansionPanelsExpandAllContent',
  // dispatched to trigger all content components to collapse
  COLLAPSE_ALL_CONTENT = 'glueExpansionPanelsCollapseAllContent',
}

enum ErrorMessages {
  TOGGLE_MISSING_CONTENT_ID = '[Glue Expansion Panels Toggle] - Toggle is not linked to a content element.',
  TOGGLE_MISSING_CONTENT_ELEMENT = '[Glue Expansion Panels Toggle] - Cannot find content element to link toggle to.',
  MISSING_CONTENT_ID = '[Glue Expansion Panels Content] - An ID must be set on the content element.',
}

export {CssClasses, DataAttr, ErrorMessages, EventNames, Strings};
