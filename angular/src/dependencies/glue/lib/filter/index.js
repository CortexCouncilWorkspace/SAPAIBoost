import {Component} from '../base';
import {EventType} from '../events/eventtype';
import {ExpansionPanels} from '../expansionpanels';
import {Modal} from '../modal';
import {ResponsiveMonitor} from '../responsivemonitor';

import {FilterCategory} from './category';
import {FilterChips} from './chip';
import {CssClasses, Strings} from './constants';
import {FilterResult} from './result';
import {FilterStateManager} from './state_manager';

/** A class to filter a list of content. */
class Filter extends Component {
  /** Creates an instance of GlueFilter. */
  constructor(root) {
    super(root);
    /** A collection of filter categories. */
    this.categories = [];
    this.handleReset = () => {
      this.reset();
    };
    this.handleUpdateResetButton = () => {
      this.updateResetButton();
    };
    this.handleOpenModal = () => {
      var _a;
      (_a = this.modal) === null || _a === void 0 ? void 0 : _a.open();
    };
    this.handleCloseModal = () => {
      var _a;
      (_a = this.modal) === null || _a === void 0 ? void 0 : _a.close();
    };
    this.resetAllEls = [
      ...this.root.querySelectorAll(`.${CssClasses.RESET_ALL}`),
    ];
    // Grab subcomponent elements
    this.modalEl = this.root.querySelector(`.${CssClasses.MODAL}`);
    this.modalToggleEl = this.root.querySelector(`.${CssClasses.MODAL_TOGGLE}`);
    this.modalCloseEl = this.root.querySelector(`.${CssClasses.SHOW_RESULTS}`);
    this.expansionPanelsEl =
        this.root.querySelector(`.${CssClasses.EXPANSIONPANELS}`);
    this.init();
  }
  /** Initializes subfeatures of the filter component. */
  init() {
    this.initCategories();
    this.initResults();
    this.initChips();
    this.initPanels();
    this.initResponsiveModal();
    this.initResetAll();
  }
  /** Initializes filter category elements. */
  initCategories() {
    const filters = [
      ...this.root.querySelectorAll(`.${CssClasses.CATEGORY}`),
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
  initResults() {
    const resultsEl = this.root.querySelector(`.${CssClasses.RESULTS}`);
    if (!resultsEl) {
      throw new Error('There is no filter results container found.');
    }
    this.results = new FilterResult(resultsEl);
  }
  /** Initializes chips if the container element exists. */
  initChips() {
    var _a;
    const chipsEl = this.root.querySelector(`.${CssClasses.CHIPS}`);
    if (chipsEl) {
      const chipsCollection = {};
      for (const [index, filterCategory] of Object.entries(this.categories)) {
        const category =
            (_a = filterCategory.category) !== null && _a !== void 0 ?
            _a :
            `glue-filter-category-${index}`;
        chipsCollection[category] = filterCategory.chips;
      }
      this.chips = new FilterChips(chipsEl, chipsCollection);
    }
  }
  /** Initializes reset all buttons if they exist. */
  initResetAll() {
    this.resetAllEls = [
      ...this.root.querySelectorAll(`.${CssClasses.RESET_ALL}`),
    ];
    if (this.resetAllEls.length) {
      for (const el of this.resetAllEls) {
        el.addEventListener(EventType.CLICK, this.handleReset);
      }
      this.root.addEventListener(
          Strings.UPDATE_STATUS, this.handleUpdateResetButton);
    }
  }
  /** Initializes expansion panels if they exist */
  initPanels() {
    if (this.expansionPanelsEl) {
      this.expansionPanels = new ExpansionPanels(this.expansionPanelsEl);
    }
  }
  /** Initializes responsive monitor to create/destroy modal if modal exists */
  initResponsiveModal() {
    if (this.modalEl) {
      if (!this.modalToggleEl) {
        throw new Error('Filter modal exists but its toggle is missing.');
      }
      this.responsiveModal = new ResponsiveMonitor({
        breakpoint: ['sm', 'md'],
        enter: () => {
          var _a, _b;
          // Initializes modal and toggle handlers on small/medium viewports
          this.modal = new Modal(this.modalEl, this.modalToggleEl);
          (_a = this.modalToggleEl) === null || _a === void 0 ?
              void 0 :
              _a.addEventListener(EventType.CLICK, this.handleOpenModal);
          (_b = this.modalCloseEl) === null || _b === void 0 ?
              void 0 :
              _b.addEventListener(EventType.CLICK, this.handleCloseModal);
        },
        leave: () => {
          var _a, _b, _c, _d;
          // Closes/destroys modal and remove handlers on large/xl viewports
          (_a = this.modal) === null || _a === void 0 ? void 0 : _a.close();
          (_b = this.modal) === null || _b === void 0 ? void 0 : _b.destroy();
          (_c = this.modalToggleEl) === null || _c === void 0 ?
              void 0 :
              _c.removeEventListener(EventType.CLICK, this.handleOpenModal);
          (_d = this.modalCloseEl) === null || _d === void 0 ?
              void 0 :
              _d.removeEventListener(EventType.CLICK, this.handleCloseModal);
        },
      });
    }
  }
  /**
   * Removes event listeners and destroys subcomponents.
   */
  destroy() {
    var _a, _b, _c, _d, _e, _f, _g;
    // Destroys/resets filter categories and chips
    this.categories.forEach((filterCategory) => {
      filterCategory.destroy();
    });
    (_a = this.chips) === null || _a === void 0 ? void 0 : _a.destroy();
    FilterStateManager.reset();
    // Cleans up resetall buttons
    if (this.resetAllEls.length) {
      for (const el of this.resetAllEls) {
        el.removeEventListener(EventType.CLICK, this.handleReset);
      }
      this.root.removeEventListener(
          Strings.UPDATE_STATUS, this.handleUpdateResetButton);
    }
    // Destroys panels
    (_b = this.expansionPanels) === null || _b === void 0 ? void 0 :
                                                            _b.destroy();
    // Destroys/cleans up modal
    (_c = this.responsiveModal) === null || _c === void 0 ? void 0 :
                                                            _c.destroy();
    (_d = this.modal) === null || _d === void 0 ? void 0 : _d.close();
    (_e = this.modal) === null || _e === void 0 ? void 0 : _e.destroy();
    (_f = this.modalToggleEl) === null || _f === void 0 ?
        void 0 :
        _f.removeEventListener(EventType.CLICK, this.handleOpenModal);
    (_g = this.modalCloseEl) === null || _g === void 0 ?
        void 0 :
        _g.removeEventListener(EventType.CLICK, this.handleCloseModal);
  }
  /**
   * Resets all filters, or a single filter if the filter category is specified.
   * @param category The filter category to reset.
   */
  reset(category) {
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
  getFilteredItems() {
    return this.results.filteredItems;
  }
  /**
   * Returns the StateManager.
   */
  getStateManager() {
    return new FilterStateManager();
  }
  /**
   * Updates class on the Reset All buttons when filters are toggled.
   * Class should only be added when at least one filter is active.
   */
  updateResetButton() {
    let areFiltersActive = false;
    const isActive = (filterValue) => filterValue === true;
    for (const filterCategory of this.categories) {
      if (!areFiltersActive) {
        areFiltersActive =
            Object.values(filterCategory.model.data).some(isActive);
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
