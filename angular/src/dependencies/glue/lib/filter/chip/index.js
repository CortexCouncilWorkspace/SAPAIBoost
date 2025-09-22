import {Component} from '../../base';
import {Attribute, Role, TabIndex} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {CssClasses, Strings} from '../constants';
import {FilterStateManager} from '../state_manager';
/**
 * A class to manage Filter Chips subcomponent.
 */
class FilterChips extends Component {
  constructor(root, data) {
    super(root);
    this.data = data;
    this.chipArr = [];
    this.stateManager = new FilterStateManager();
    this.isRtl = document.documentElement.dir === Strings.RTL;
    /**
     * Handles key press events on the root container to navigate between chips
     */
    this.handleRootKeydown = (evt) => {
      if (evt.code === Key.LEFT || evt.code === Key.RIGHT ||
          evt.code === Key.HOME || evt.code === Key.END) {
        const isLeft = evt.code === Key.LEFT;
        const isRight = evt.code === Key.RIGHT;
        if (isLeft || isRight) {
          // Move to previous or next chip based on language direction
          const isNext = this.isRtl ? isLeft : isRight;
          if (isNext) {
            this.focusedChip++;
          } else {
            this.focusedChip--;
          }
        } else if (evt.code === Key.HOME) {
          // Move to first chip
          this.focusedChip = 0;
        } else if (evt.code === Key.END) {
          // Move to last chip
          this.focusedChip = this.chipArr.length - 1;
        }
        // Keep chip position within bounds of chipArr
        if (this.focusedChip < 0) {
          this.focusedChip = 0;
        } else if (this.focusedChip >= this.chipArr.length) {
          this.focusedChip = this.chipArr.length - 1;
        }
        this.chipArr[this.focusedChip].focus();
        evt.stopPropagation();
        evt.preventDefault();
      }
    };
    /**
     * Handles clicks on filter chips.
     */
    this.handleChipClick = (evt) => {
      let chipEl;
      const element = evt.target;
      if (element instanceof HTMLElement) {
        // Find the chip element.
        element.classList.contains(CssClasses.CHIP) ?
            (chipEl = element) :
            (chipEl = element.closest(`.${CssClasses.CHIP}`));
        if (chipEl) {
          this.updateChip(chipEl);
        }
      }
    };
    /**
     * Handles keyboard events on filter chips.
     */
    this.handleChipKeydown = (evt) => {
      let chipEl;
      const element = evt.target;
      if (element instanceof HTMLElement &&
          (evt.code === Key.ENTER || evt.code === Key.SPACE)) {
        // Find the chip element.
        element.classList.contains(CssClasses.CHIP) ?
            (chipEl = element) :
            (chipEl = element.closest(`.${CssClasses.CHIP}`));
        if (chipEl) {
          this.updateChip(chipEl);
        }
        evt.stopPropagation();
        evt.preventDefault();
      }
    };
    this.isPrimary = root.classList.contains(CssClasses.CHIPS_PRIMARY);
    this.addFilterLabel = root.dataset[Strings.CHIPS_LABEL_ADD] ?
        root.dataset[Strings.CHIPS_LABEL_ADD] :
        Strings.ADD_FILTER;
    this.removeFilterLabel = root.dataset[Strings.CHIPS_LABEL_REMOVE] ?
        root.dataset[Strings.CHIPS_LABEL_REMOVE] :
        Strings.REMOVE_FILTER;
    // Set initial focused chip as out of bounds, so when you hit left or right
    // the first time you tab into the element, you focus on the first chip
    this.focusedChip = -1;
    this.init();
  }
  /**
   * Initializes the chips component.
   */
  init() {
    this.root.tabIndex =
        this.isPrimary ? TabIndex.TABBABLE : TabIndex.NOT_TABBABLE;
    const rowEl = document.createElement('div');
    rowEl.setAttribute(Attribute.ROLE, Role.ROW);
    for (const filterCategory of Object.keys(this.data)) {
      const model = this.stateManager.getModel(filterCategory);
      for (const filterCategoryItem of Object.keys(this.data[filterCategory])) {
        if (this.isPrimary) {
          // Primary chips container should render and display all chips
          const chipEl = this.createChip(filterCategory, filterCategoryItem);
          rowEl.appendChild(chipEl);
          const chipButton = chipEl.firstElementChild;
          chipButton.addEventListener(EventType.CLICK, this.handleChipClick);
          chipButton.addEventListener(
              EventType.KEYDOWN, this.handleChipKeydown);
          this.chipArr.push(chipButton);
        }
        // Subscribes to the filter changes.
        model === null || model === void 0 ?
            void 0 :
            model.listen(filterCategoryItem, () => {
              this.render(
                  filterCategory, filterCategoryItem,
                  model.data[filterCategoryItem]);
            });
      }
    }
    if (this.isPrimary) {
      // Append the chips bar
      this.root.appendChild(rowEl);
    }
    this.root.addEventListener(EventType.KEYDOWN, this.handleRootKeydown);
  }
  /**
   * Creates a chip element and returns it.
   */
  createChip(filterCategory, filterCategoryItem) {
    const chipContainerEl = document.createElement('span');
    chipContainerEl.setAttribute(Attribute.ROLE, Role.GRIDCELL);
    const chipEl = document.createElement('button');
    chipEl.classList.add(CssClasses.CHIP);
    chipEl.tabIndex = TabIndex.NOT_TABBABLE;
    chipEl.setAttribute(Attribute.TYPE, Role.BUTTON);
    chipEl.dataset[Strings.CATEGORY] = filterCategory;
    chipEl.dataset[Strings.CATEGORY_ITEM] = filterCategoryItem;
    const chipTextNode =
        document.createTextNode(this.data[filterCategory][filterCategoryItem]);
    chipEl.setAttribute(
        Attribute.ARIA_LABEL,
        `${this.addFilterLabel} ${chipTextNode.textContent}`);
    chipEl.append(chipTextNode);
    if (this.isPrimary) {
      // Primary chips have a checkmark icon before the text content
      const checkmarkIcon = this.createCheckmarkIcon();
      chipEl.prepend(checkmarkIcon);
    } else {
      // Secondary chips have a close icon after the text content
      const closeButton = this.createCloseIconDiv();
      chipEl.append(closeButton);
    }
    chipContainerEl.appendChild(chipEl);
    return chipContainerEl;
  }
  /**
   * Changes the rendering of a specific chip and the container based on filter
   * status
   */
  render(category, categoryItem, isActive) {
    // Find the chip related to this filter, if it exists
    const chipEl = this.root.querySelector(`[data-glue-filter-category='${
        category}'][data-glue-filter-category-item='${categoryItem}']`);
    if (this.isPrimary) {
      // Primary chips are always visible; adjust their classes and labels
      if (chipEl) {
        chipEl.classList.toggle(CssClasses.CHIP_ISACTIVE, isActive);
        const ariaLabel =
            isActive ? `${this.removeFilterLabel}` : `${this.addFilterLabel}`;
        chipEl.setAttribute(
            Attribute.ARIA_LABEL, `${ariaLabel} ${chipEl.textContent}`);
      }
    } else {
      // If not primary chips, chip needs to be either added or removed to DOM
      // First find the row parent for chips bar, or create one if it doesn't
      // exists
      let rowEl = this.root.querySelector(`[role='${Role.ROW}']`);
      if (!rowEl) {
        rowEl = document.createElement('div');
        rowEl.setAttribute(Attribute.ROLE, Role.ROW);
        this.root.appendChild(rowEl);
      }
      if (chipEl && !isActive) {
        // If chip is already in the DOM, and filter is inactive, remove it.
        // unassign handlers
        chipEl.removeEventListener(EventType.CLICK, this.handleChipClick);
        chipEl.removeEventListener(EventType.KEYDOWN, this.handleChipKeydown);
        const cellEl = chipEl.parentElement;
        // remove element from the row
        rowEl.removeChild(cellEl);
        // remove it from chipArr
        const chipIndex = this.chipArr.indexOf(chipEl);
        this.chipArr.splice(chipIndex, 1);
        if (this.chipArr.length === 0) {
          // if row is now empty, remove it
          this.root.removeChild(rowEl);
        }
      } else if (isActive) {
        // If chip is not already in the DOM, and filter is active, add it.
        // Add DOM to the row parent
        const newChipEl = this.createChip(category, categoryItem);
        rowEl.appendChild(newChipEl);
        const chipButton = newChipEl.firstElementChild;
        if (chipButton instanceof HTMLElement) {
          // Add event handlers
          chipButton.addEventListener(EventType.CLICK, this.handleChipClick);
          chipButton.addEventListener(
              EventType.KEYDOWN, this.handleChipKeydown);
          // Set classes and labels
          chipButton.classList.add(CssClasses.CHIP_ISACTIVE);
          chipButton.setAttribute(
              Attribute.ARIA_LABEL,
              `${this.removeFilterLabel} ${chipButton.textContent}`);
          // Updates chips array.
          this.chipArr.push(chipButton);
        }
      }
      // If there is at least 1 chip (row exists), make the container tabbable.
      rowEl = this.root.querySelector(`[role='${Role.ROW}']`);
      this.root.tabIndex = rowEl ? TabIndex.TABBABLE : TabIndex.NOT_TABBABLE;
      if (!rowEl) {
        // Reset focused chip if no chips are visible.
        this.focusedChip = -1;
      }
    }
  }
  /**
   * Creates and returns an SVG checkmark icon
   */
  createCheckmarkIcon() {
    const checkmarkIcon =
        document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkmarkIcon.setAttribute('viewBox', '-2 -3 30 30');
    checkmarkIcon.setAttribute(Attribute.ROLE, Role.PRESENTATION);
    checkmarkIcon.setAttribute(Attribute.ARIA_HIDDEN, 'true');
    checkmarkIcon.classList.add(CssClasses.CHIP_CHECKMARK, 'glue-icon');
    const checkmarkPath =
        document.createElementNS('http://www.w3.org/2000/svg', 'path');
    checkmarkPath.setAttribute('d', 'M1.73,12.91 8.1,19.28 22.79,4.59');
    checkmarkIcon.appendChild(checkmarkPath);
    return checkmarkIcon;
  }
  /**
   * Creates and returns a div with the close icon styles applied
   */
  createCloseIconDiv() {
    const closeButton = document.createElement('div');
    closeButton.classList.add(CssClasses.CHIP_CLOSEBTN);
    return closeButton;
  }
  /**
   * Updates the status of the current chip
   */
  updateChip(chipEl) {
    var _a;
    const filterCategory = chipEl.dataset[Strings.CATEGORY];
    const filterCategoryItem = chipEl.dataset[Strings.CATEGORY_ITEM];
    const isActive = chipEl.classList.contains(CssClasses.CHIP_ISACTIVE);
    // Store chip's position in chipArr
    this.focusedChip = this.chipArr.indexOf(chipEl);
    if (filterCategory && filterCategoryItem) {
      const model = this.stateManager.getModel(filterCategory);
      if (model) {
        model.data[filterCategoryItem] = !isActive;
        this.emit(Strings.UPDATE_STATUS, {}, true);
        // Adjusts focused (secondary) chip by finding nearest chip
        if (!this.isPrimary && !model.data[filterCategoryItem]) {
          if (this.chipArr.length === 0) {
            // if array is completely empty, no chip is focusable.
            this.focusedChip = -1;
          } else {
            // move index back 1 position since chip was removed from array
            this.focusedChip--;
            if (this.focusedChip < 0) {
              // If we moved before start of array, return there
              this.focusedChip = 0;
            } else if (this.focusedChip >= this.chipArr.length) {
              // If we are beyond the end of the array, return there
              this.focusedChip = this.chipArr.length - 1;
            }
          }
        }
        (_a = this.chipArr[this.focusedChip]) === null || _a === void 0 ?
            void 0 :
            _a.focus();
      }
    }
  }
  /**
   * Destroys the chips component: removes event handlers and resets container.
   */
  destroy() {
    this.root.tabIndex = TabIndex.NOT_TABBABLE;
    this.root.removeEventListener(EventType.KEYDOWN, this.handleRootKeydown);
    this.chipArr.forEach((el) => {
      el.removeEventListener(EventType.CLICK, this.handleChipClick);
      el.removeEventListener(EventType.KEYDOWN, this.handleChipKeydown);
    });
    const chipsRowEl = this.root.querySelector('div[role=row]');
    if (chipsRowEl) {
      this.root.removeChild(chipsRowEl);
    }
  }
}
export {FilterChips};
