import {Component} from '../base/index';
import {Attribute} from '../constants/attribute';
import {ExpansionPanels} from '../expansionpanels';
import {CssClasses as ExpansionPanelsClasses} from '../expansionpanels/constants';
import {ExpansionPanelOptions} from '../expansionpanels/model';
import {ResponsiveMonitor} from '../responsivemonitor/';
import {Tabs} from '../tabs';

import {CssClasses, DataAttr, Strings} from './constants';

declare interface TabPanelsOptions {
  panelsBreakpoints: string[];
  isPanelsAnimated: boolean;
  isResponsive: boolean;
  panelsCount: number;
}

declare interface TabPanelsDef {
  tabsComponent?: Tabs;
}

class TabPanels extends Component implements TabPanelsDef {
  private readonly options: TabPanelsOptions;
  private panelsComponent?: ExpansionPanels;
  tabsComponent?: Tabs;
  private readonly panelsoptions?: ExpansionPanelOptions;
  private readonly tablistEl: HTMLElement;
  private readonly panelsEl: HTMLElement;
  private currentTab!: number;
  private responsiveTabsMonitor!: ResponsiveMonitor;

  constructor(root: HTMLElement, options?: Partial<TabPanelsOptions>) {
    super(root);
    this.options = Object.assign({}, TabPanels.defaults, options);

    // Set up expansion panel options
    this.panelsoptions = {
      isAnimated: this.options.isPanelsAnimated,
      panelsCount: this.options.panelsCount,
    };
    this.tablistEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.TABPANEL_PAGE_LIST}`,
    )!;
    this.panelsEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.TABPANEL_PANEL_LIST}`,
    )!;
    this.initialize();
  }

  /** Init the component. */
  private initialize() {
    // Bail out if there are no elements for the panel and tabs.
    if (!this.tablistEl) {
      throw new Error(Strings.MISSING_PAGE_LIST);
    }
    if (!this.panelsEl) {
      throw new Error(Strings.MISSING_PANEL_LIST);
    }

    // Initially set up as tabs
    this.configureTabs(true);
    this.tabsComponent = new Tabs(this.root);
    this.currentTab = this.tabsComponent.observer.data['currentTab'];

    if (this.options.isResponsive) {
      // Set up rules for Responsive Monitor
      this.responsiveTabsMonitor = new ResponsiveMonitor({
        breakpoint: this.options.panelsBreakpoints,
        enter: () => {
          // Entering x-small/mobile breakpoint. Use expansion panels
          if (this.tabsComponent) {
            this.currentTab = this.tabsComponent.observer.data['currentTab'];
            this.tabsComponent.destroy();
            this.tabsComponent = undefined;
          }

          this.configureTabs(false);
          this.configureExpansionPanels(true, this.currentTab);
          this.panelsComponent = new ExpansionPanels(
            this.panelsEl,
            this.panelsoptions,
          );
        },
        leave: () => {
          // Leaving x-small/mobile breakpoint. Use tabs
          if (this.panelsComponent) {
            this.panelsComponent.destroy();
            this.panelsComponent = undefined;
          }

          this.configureExpansionPanels(false, 0);
          this.configureTabs(true);
          this.tabsComponent = new Tabs(this.root);
          this.tabsComponent.observer.data['currentTab'] = this.currentTab;
        },
      });
    }
  }

  /**
   * Default responsive tabs options.
   */
  static get defaults(): TabPanelsOptions {
    return {
      panelsBreakpoints: ['sm'],
      isPanelsAnimated: true,
      isResponsive: true,
      panelsCount: 2,
    };
  }

  /**
   * Set up the Tabs Component.
   */
  private configureTabs(isTabs: boolean) {
    // Group settings
    this.root.classList.toggle(CssClasses.TABSET_ROOT, isTabs);

    // Tab list
    this.tablistEl.classList.toggle(CssClasses.TABSET_TABLIST, isTabs);

    // Temporarily set scope class for query selector scoping
    // This approximates :scope in the query selector
    this.tablistEl.classList.add(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);

    const tabsEls: HTMLElement[] = Array.from(
      this.tablistEl.querySelectorAll(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > div`,
      ),
    );
    for (const el of tabsEls) {
      el.classList.toggle(CssClasses.TABSET_TAB, isTabs);
    }

    // Remove scope class
    this.tablistEl.classList.remove(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);

    // Tabs (shared with Panels group element)
    this.panelsEl.classList.toggle(CssClasses.TABSET_PANELCONTAINER, isTabs);

    // Temporarily set scope class for query selector scoping
    this.panelsEl.classList.add(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);

    const panelsEls: HTMLElement[] = Array.from(
      this.panelsEl.querySelectorAll(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > div`,
      ),
    );
    for (const panelEl of panelsEls) {
      panelEl.classList.toggle(CssClasses.TABSET_PAGE, isTabs);
    }

    // Remove scope class
    this.panelsEl.classList.remove(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);
  }

  /**
   * Set up the Expansion Panels Component.
   */
  private configureExpansionPanels(isPanels: boolean, currentTab: number) {
    // Group settings
    this.panelsEl.classList.toggle(ExpansionPanelsClasses.GROUP, isPanels);

    // Individual panel settings
    let panelCount = 1;

    // Temporarily set scope class for query selector scoping
    // This approximates :scope in the query selector
    this.panelsEl.classList.add(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);

    const panelsEls: HTMLElement[] = Array.from(
      this.panelsEl.querySelectorAll(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > div`,
      ),
    );

    for (const panelEl of panelsEls) {
      // Temporarily set scope class for query selector scoping
      panelEl.classList.add(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);
      panelEl.classList.toggle(ExpansionPanelsClasses.PANEL, isPanels);
      panelEl.removeAttribute(Attribute.ARIA_HIDDEN);

      const panelToggleEl = panelEl.querySelector<HTMLElement>(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > .${CssClasses.TABPANEL_PANEL_TOGGLE}`,
      )!;
      panelToggleEl.classList.toggle(ExpansionPanelsClasses.TOGGLE, isPanels);

      const panelButtonEl = panelToggleEl.querySelector<HTMLElement>(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > .${CssClasses.TABPANEL_PANEL_TOGGLE} > :first-child`,
      )!;
      panelButtonEl.classList.toggle(ExpansionPanelsClasses.BUTTON, isPanels);

      const panelTitleEl = panelToggleEl.querySelector<HTMLElement>(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} .${CssClasses.TABPANEL_PANEL_TITLE}`,
      )!;
      panelTitleEl.classList.toggle(
        ExpansionPanelsClasses.HEADER_TEXT,
        isPanels,
      );

      const panelContentEl = panelEl.querySelector<HTMLElement>(
        `.${CssClasses.TABPANEL_ELEMENT_SCOPE} > .${CssClasses.TABPANEL_PANEL_CONTENT}`,
      )!;
      panelContentEl.classList.toggle(ExpansionPanelsClasses.CONTENT, isPanels);

      if (isPanels) {
        panelButtonEl.dataset[DataAttr.TOGGLEFOR] = panelContentEl.id;
        if (panelCount === currentTab) {
          // Set current tab to render as expanded
          panelContentEl.dataset[DataAttr.INITIAL] = 'expanded';
        }
        panelCount++;
      } else {
        delete panelButtonEl.dataset[DataAttr.TOGGLEFOR];
        delete panelContentEl.dataset[DataAttr.INITIAL];
      }

      // Remove scope class
      panelEl.classList.remove(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);
    }

    // Remove scope class
    this.panelsEl.classList.remove(`${CssClasses.TABPANEL_ELEMENT_SCOPE}`);
  }

  /**
   * @see {Component.destroy}
   */
  override destroy() {
    // Destroy subcomponents if set
    if (this.panelsComponent) {
      this.panelsComponent.destroy();
      this.panelsComponent = undefined;
      this.configureExpansionPanels(false, 0);
    }
    if (this.tabsComponent) {
      this.tabsComponent.destroy();
      this.tabsComponent = undefined;
      this.configureTabs(false);
    }

    // Destroy responsive monitor instance if set
    if (this.responsiveTabsMonitor) {
      this.responsiveTabsMonitor.destroy();
    }
  }
}

export {TabPanels, type TabPanelsOptions};
