import {Component} from '../../base';
import {Attribute} from '../../constants/attribute';
import {CssClasses, Strings} from '../constants';
import {FilterStateManager} from '../state_manager';
import {filterlist} from '../util';
/**
 * A class to manage filter result component.
 */
class FilterResult extends Component {
  /**
   * Creates an instance of GlueFilterResult.
   */
  constructor(root) {
    super(root);
    this.resultItems = [];
    this.filteredItems = [];
    this.resultTags = [];
    this.filterCategories = [];
    this.filterData = {};
    this.init();
  }
  /** Initializes filter result component. */
  init() {
    var _a;
    // Updates strategy value of the filter.
    this.filterData.strategy = this.root.dataset[Strings.STRATEGY];
    // Validates filter categories.
    const filterCategories = this.root.dataset[Strings.CATEGORIES];
    if (!filterCategories) {
      throw new Error('Filter categories are not set on the result element.');
    }
    this.filterCategories = filterCategories.split(' ');
    if (!this.checkfilterCategories(this.filterCategories)) {
      throw new Error('These filter categories are not valid.');
    }
    // Subscribes to filter data changes.
    for (const filterCategory of this.filterCategories) {
      const model = new FilterStateManager().getModel(filterCategory);
      const data =
          (_a = model === null || model === void 0 ? void 0 : model.data) !==
                  null &&
              _a !== void 0 ?
          _a :
          {};
      for (const key of Object.keys(data)) {
        model === null || model === void 0 ? void 0 : model.listen(key, () => {
          this.render();
        });
      }
    }
    // Collects tags from each result item.
    this.resultItems = [
      ...this.root.querySelectorAll(`.${CssClasses.RESULT}`),
    ];
    this.resultItems.forEach((el) => {
      const tags = {};
      this.filterCategories.forEach((filterCategory) => {
        const filterTag = el.getAttribute(Strings.PREFIX + filterCategory);
        tags[filterCategory] = filterTag ? filterTag.split(' ') : [];
      });
      this.resultTags.push(tags);
    });
    this.render();
  }
  /** Returns true if all filter categories are valid. */
  checkfilterCategories(filterCategories) {
    for (const category of filterCategories) {
      if (!new FilterStateManager().getModel(category)) {
        return false;
      }
    }
    return true;
  }
  /** Returns filter results. */
  getFilterResults() {
    var _a;
    const data = {};
    for (const category of this.filterCategories) {
      data[category] =
          (_a = new FilterStateManager().getModel(category)) === null ||
              _a === void 0 ?
          void 0 :
          _a.data;
    }
    this.filterData = Object.assign({}, this.filterData, data);
    return filterlist(this.resultTags, this.filterData);
  }
  /**
   * Renders filter results elements.
   */
  render() {
    const results = this.getFilterResults();
    for (const [index, el] of this.resultItems.entries()) {
      el.classList.toggle(CssClasses.RESULT_IS_MATCHING, results[index]);
      results[index] ? el.removeAttribute(Attribute.ARIA_HIDDEN) :
                       el.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    }
    this.filteredItems = [
      ...this.root.querySelectorAll(`.${CssClasses.RESULT_IS_MATCHING}`),
    ];
    this.renderCounter();
  }
  /**
   * Renders the count of filtered results.
   */
  renderCounter() {
    const counter = this.filteredItems.length;
    const filterRootEl = this.root.closest(`.${CssClasses.ROOT}`) ?
        this.root.closest(`.${CssClasses.ROOT}`) :
        this.root;
    const resultsCount =
        filterRootEl.querySelectorAll(`.${CssClasses.RESULTS_COUNT}`);
    if (resultsCount.length) {
      for (const el of resultsCount) {
        // Removes all child nodes
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
        const numEl = document.createTextNode(counter.toString());
        el.appendChild(numEl);
      }
    }
  }
}
export {FilterResult};
