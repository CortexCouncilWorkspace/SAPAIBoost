import {Component} from '../../base';
import {Attribute} from '../../constants/attribute';
import {CssClasses, Strings} from '../constants';
import {FilterStateManager} from '../state_manager';
import {FilterData, filterlist} from '../util';

interface Tag {
  [key: string]: string[];
}

/**
 * A class to manage filter result component.
 */
class FilterResult extends Component {
  resultItems: HTMLElement[] = [];
  filteredItems: HTMLElement[] = [];
  private readonly resultTags: Tag[] = [];
  private filterCategories: string[] = [];
  private filterData: FilterData = {};

  /**
   * Creates an instance of GlueFilterResult.
   */
  constructor(root: HTMLElement) {
    super(root);
    this.init();
  }

  /** Initializes filter result component. */
  private init() {
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
      const data = model?.data ?? {};
      for (const key of Object.keys(data)) {
        model?.listen(key, () => {
          this.render();
        });
      }
    }

    // Collects tags from each result item.
    this.resultItems = [
      ...this.root.querySelectorAll<HTMLElement>(`.${CssClasses.RESULT}`),
    ];
    this.resultItems.forEach((el) => {
      const tags: Tag = {};
      this.filterCategories.forEach((filterCategory) => {
        const filterTag = el.getAttribute(Strings.PREFIX + filterCategory);
        tags[filterCategory] = filterTag ? filterTag.split(' ') : [];
      });
      this.resultTags.push(tags);
    });
    this.render();
  }

  /** Returns true if all filter categories are valid. */
  private checkfilterCategories(filterCategories: string[]): boolean {
    for (const category of filterCategories) {
      if (!new FilterStateManager().getModel(category)) {
        return false;
      }
    }
    return true;
  }

  /** Returns filter results. */
  private getFilterResults(): boolean[] {
    const data: FilterData = {};
    for (const category of this.filterCategories) {
      data[category] = new FilterStateManager().getModel(category)?.data;
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
      results[index]
        ? el.removeAttribute(Attribute.ARIA_HIDDEN)
        : el.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    }
    this.filteredItems = [
      ...this.root.querySelectorAll<HTMLElement>(
        `.${CssClasses.RESULT_IS_MATCHING}`,
      ),
    ];
    this.renderCounter();
  }

  /**
   * Renders the count of filtered results.
   */
  private renderCounter() {
    const counter = this.filteredItems.length;
    const filterRootEl = this.root.closest(`.${CssClasses.ROOT}`)
      ? this.root.closest(`.${CssClasses.ROOT}`)!
      : this.root;
    const resultsCount = filterRootEl.querySelectorAll(
      `.${CssClasses.RESULTS_COUNT}`,
    );
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
