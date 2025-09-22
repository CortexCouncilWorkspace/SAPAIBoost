/**
 * Data attribute used for query selecting a specific tab.
 */
enum TabsAttrs {
  CURRENT = 'glueTabsCurrent',
}

enum CssClasses {
  ROOT = 'glue-tabs',
  TABLIST = 'glue-tabs__tablist',
  TAB = 'glue-tab',
  PANEL = 'glue-tabs__panel',
  PANELGROUP = 'glue-tabs__panelgroup',
  IS_SHOWN = 'glue-is-shown',
}

enum Strings {
  TRIGGER = 'trigger',
  PLACEMENT = 'placement',
  FOCUS = 'takeFocus',
  ROOT = 'root',
  MISSING_TABLIST = 'Tablist element is missing.',
  MISSING_TABS = 'Tabs element is missing.',
  MISSING_TABPANELS = 'Tab panels element is missing.',
  DATA_CURRENT = 'currentTab',
}

export {CssClasses, Strings, TabsAttrs};
