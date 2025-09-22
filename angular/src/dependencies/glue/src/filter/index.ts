import {Component} from '../base';
import {EventType} from '../events/eventtype';
import {ExpansionPanels} from '../expansionpanels';
import {Modal} from '../modal';
import {ResponsiveMonitor} from '../responsivemonitor';

import {FilterCategory} from './category';
import {ChipData, FilterChips} from './chip';
import {CssClasses, Strings} from './constants';
import {FilterResult} from './result';
import {FilterStateManager} from './state_manager';

// Add class methods here to prevent deletion in the CDN.
declare interface FilterDef {
  reset: () => void;
  getFilteredItems: () => HTMLElement[] | undefined;
  getStateManager: () => FilterStateManager;
}

/** A class to filter a list of content. */
class Filter extends Component implements FilterDef {
  /** Instance of FilterChips. */
  private chips!: FilterChips;

  /** A collection of filter categories. */
  private readonly categories: FilterCategory[] = [];

  /** Instance of FilterResult. */
  private results!: FilterResult;

  /** Reset all buttons */
  private resetAllEls: HTMLButtonElement[];
  private readonly handleReset = () => {
    this.reset();
  };
  private readonly handleUpdateResetButton = () => {
    this.updateResetButton();
  };

  /** Modal subcomponent and its triggers */
  private modal?: Modal;
  private responsiveModal?: ResponsiveMonitor;
  private readonly modalEl: HTMLElement | null;
  private readonly modalToggleEl: HTMLElement | null;
  private readonly modalCloseEl: HTMLElement | null;
  private readonly handleOpenModal = () => {
    this.modal?.open();
  };
  private readonly handleCloseModal = () => {
    this.modal?.close();
  };

  /** Expansion panels subcomponent */
  private expansionPanels?: ExpansionPanels;
  private readonly expansionPanelsEl: HTMLElement | null;

  /** Creates an instance of GlueFilter. */
  constructor(root: HTMLElement) {
    super(root);
    this.resetAllEls = [
      ...this.root.querySelectorAll<HTMLButtonElement>(
        `.${CssClasses.RESET_ALL}`,
      ),
    ];

    // Grab subcomponent elements
    this.modalEl = this.root.querySelector<HTMLElement>(`.${CssClasses.MODAL}`);
    this.modalToggleEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.MODAL_TOGGLE}`,
    );
    this.modalCloseEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.SHOW_RESULTS}`,
    );
    this.expansionPanelsEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.EXPANSIONPANELS}`,
    );

    this.init();
  }

  /** Initializes subfeatures of the filter component. */
  private init() {
    this.initCategories();
    this.initResults();
    this.initChips();
    this.initPanels();
    this.initResponsiveModal();
    this.initResetAll();
  }

  /** Initializes filter category elements. */
  private initCategories() {
    const filters = [
      ...this.root.querySelectorAll<HTMLElement>(`.${CssClasses.CATEGORY}`),
    ];
    if (!filters.length) {
      throw new Error('There are no filter category elements found.');
    }
    for (const el of filters) {
      const filterCategory = new FilterCategory(el);
      this.categories.push(filterCategory);
    }
  }

  /** Initializes results container element. */
  private initResults() {
    const resultsEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.RESULTS}`,
    )!;
    if (!resultsEl) {
      throw new Error('There is no filter results container found.');
    }
    this.results = new FilterResult(resultsEl);
  }

  /** Initializes chips if the container element exists. */
  private initChips() {
    const chipsEl = this.root.querySelector<HTMLElement>(
      `.${CssClasses.CHIPS}`,
    );
    if (chipsEl) {
      const chipsCollection: ChipData = {};

      for (const [index, filterCategory] of Object.entries(this.categories)) {
        const category =
          filterCategory.category ?? `glue-filter-category-${index}`;
        chipsCollection[category] = filterCategory.chips;
      }

      this.chips = new FilterChips(chipsEl, chipsCollection);
    }
  }

  /** Initializes reset all buttons if they exist. */
  private initResetAll() {
    this.resetAllEls = [
      ...this.root.querySelectorAll<HTMLButtonElement>(
        `.${CssClasses.RESET_ALL}`,
      ),
    ];
    if (this.resetAllEls.length) {
      for (const el of this.resetAllEls) {
        el.addEventListener(EventType.CLICK, this.handleReset);
      }
      this.root.addEventListener(
        Strings.UPDATE_STATUS,
        this.handleUpdateResetButton,
      );
    }
  }

  /** Initializes expansion panels if they exist */
  private initPanels() {
    if (this.expansionPanelsEl) {
      this.expansionPanels = new ExpansionPanels(this.expansionPanelsEl);
    }
  }

  /** Initializes responsive monitor to create/destroy modal if modal exists */
  private initResponsiveModal() {
    if (this.modalEl) {
      if (!this.modalToggleEl) {
        throw new Error('Filter modal exists but its toggle is missing.');
      }

      this.responsiveModal = new ResponsiveMonitor({
        breakpoint: ['sm', 'md'],
        enter: () => {
          // Initializes modal and toggle handlers on small/medium viewports
          this.modal = new Modal(this.modalEl!, this.modalToggleEl!);
          this.modalToggleEl?.addEventListener(
            EventType.CLICK,
            this.handleOpenModal,
          );
          this.modalCloseEl?.addEventListener(
            EventType.CLICK,
            this.handleCloseModal,
          );
        },
        leave: () => {
          // Closes/destroys modal and remove handlers on large/xl viewports
          this.modal?.close();
          this.modal?.destroy();

          this.modalToggleEl?.removeEventListener(
            EventType.CLICK,
            this.handleOpenModal,
          );
          this.modalCloseEl?.removeEventListener(
            EventType.CLICK,
            this.handleCloseModal,
          );
        },
      });
    }
  }

  /**
   * Removes event listeners and destroys subcomponents.
   */
  override destroy() {
    // Destroys/resets filter categories and chips
    this.categories.forEach((filterCategory) => {
      filterCategory.destroy();
    });
    this.chips?.destroy();
    FilterStateManager.reset();

    // Cleans up resetall buttons
    if (this.resetAllEls.length) {
      for (const el of this.resetAllEls) {
        el.removeEventListener(EventType.CLICK, this.handleReset);
      }
      this.root.removeEventListener(
        Strings.UPDATE_STATUS,
        this.handleUpdateResetButton,
      );
    }

    // Destroys panels
    this.expansionPanels?.destroy();

    // Destroys/cleans up modal
    this.responsiveModal?.destroy();
    this.modal?.close();
    this.modal?.destroy();
    this.modalToggleEl?.removeEventListener(
      EventType.CLICK,
      this.handleOpenModal,
    );
    this.modalCloseEl?.removeEventListener(
      EventType.CLICK,
      this.handleCloseModal,
    );
  }

  /**
   * Resets all filters, or a single filter if the filter category is specified.
   * @param category The filter category to reset.
   */
  reset(category?: string) {
    if (category) {
      this.categories
        .filter((val) => {
          return val.category === category;
        })[0]
        .reset();
    } else {
      this.categories.forEach((filterCategory) => {
        filterCategory.reset();
      });

      // Updates classes
      this.updateResetButton();
    }
  }

  /**
   * Returns a list of matched items.
   */
  getFilteredItems(): HTMLElement[] {
    return this.results.filteredItems;
  }

  /**
   * Returns the StateManager.
   */
  getStateManager(): FilterStateManager {
    return new FilterStateManager();
  }

  /**
   * Updates class on the Reset All buttons when filters are toggled.
   * Class should only be added when at least one filter is active.
   */
  private updateResetButton() {
    let areFiltersActive = false;
    const isActive = (filterValue: boolean) => filterValue === true;

    for (const filterCategory of this.categories) {
      if (!areFiltersActive) {
        areFiltersActive = Object.values(filterCategory.model.data).some(
          isActive,
        );
      }
    }

    for (const el of this.resetAllEls) {
      if (areFiltersActive) {
        el.classList.add(CssClasses.RESET_ALL_FILTERED);
      } else {
        el.classList.remove(CssClasses.RESET_ALL_FILTERED);
      }
    }
  }
}

export {Filter, FilterStateManager};
