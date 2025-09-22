import {Component} from '../../base/';
import {Attribute as AttributeConst} from '../../constants/attribute';
import {CssClasses as GlueCssClasses} from '../../constants/classes';
import {Observer} from '../../observer';
import {CssClasses as HeaderCssClasses} from '../constants';

import {Attributes, CssClasses, DataModel, Strings} from './constants';

type EventHandler = () => void;

/**
 * Glue Page component
 */
class Pages extends Component {
  private readonly pageEls: HTMLElement[] = Array.from(
    this.root.children,
  ) as HTMLElement[];
  private model!: DataModel;
  private readonly elementIds: string[] = [];

  selectableElements: Element[] = [];
  private readonly handleUpdate: EventHandler = () => {
    this.update();
  };

  /**
   * @param root Root element that contains options object
   * @param model A shared model for paginating.
   */
  constructor(
    root: HTMLElement,
    private readonly observer: Observer<DataModel>,
  ) {
    super(root);

    this.initialize();
  }

  /**
   * Initialize the component.
   */
  initialize() {
    this.observer.listen(Strings.CURRENT_PAGE, this.handleUpdate);
    this.model = this.observer.data;

    this.initPageElementIDs();
    this.update();
  }

  /**
   * Set IDs for all elements.
   */
  private initPageElementIDs() {
    let pageElementId: string;
    for (const [index, pageEl] of this.pageEls.entries()) {
      pageElementId = `${Strings.STEPPED_PAGE}-${Math.round(
        Math.random() * 99999999,
      )}`;
      pageEl.id = pageElementId;
      pageEl.classList.add(`${Strings.STEPPED_PAGE}-${index + 1}`);

      if (!this.elementIds[index + 1]) {
        this.elementIds[index + 1] = pageElementId;
      }
    }
  }

  /**
   * Updates CSS classes, ARIA properties and event handlers on page elements.
   */
  private update() {
    // Recursively positions page elements based on parent page indexes.
    const positionPage = (elem: HTMLElement) => {
      // A page will either have a parent index or page index attr that points
      // to the page that ought to be in the parent position in the UI.
      const parentPageIndex = elem.hasAttribute(Attributes.STEPPED_PAGE)
        ? Number(elem.dataset[Attributes.STEPPED_PAGE_CAMEL])
        : Number(elem.dataset[Attributes.PARENT_INDEX_CAMEL]);

      if (isNaN(parentPageIndex)) return;
      const parentElem = this.pageEls[parentPageIndex - 1];
      parentElem?.classList.add(CssClasses.PARENT_POSITION);
      positionPage(parentElem);
    };

    const currentElem = this.pageEls[this.model.currentPage - 1];
    for (const pageElem of this.pageEls) {
      const selected = pageElem === currentElem;
      if (selected) {
        pageElem.classList.add(GlueCssClasses.SHOW);
        pageElem.removeAttribute(AttributeConst.ARIA_HIDDEN);
      } else {
        pageElem.classList.remove(
          GlueCssClasses.SHOW,
          CssClasses.PARENT_POSITION,
        );
        pageElem.setAttribute(AttributeConst.ARIA_HIDDEN, 'true');
      }

      this.updatePageElements(pageElem);
    }

    // Get all the page elements that might be selectable for key-based nav.
    if (currentElem.classList.contains(CssClasses.CONTROLS)) {
      this.selectableElements = currentElem.hasAttribute(
        Attributes.PARENT_INDEX,
      )
        ? [currentElem]
        : [];
    } else {
      this.selectableElements = Array.from(
        currentElem.querySelectorAll(`.${HeaderCssClasses.LINK_ITEM}`),
      );
    }

    // Set the positions of the pages that are parents of the current page.
    positionPage(currentElem);
  }

  /**
   * Updates the DOM attributes.
   */
  private updatePageElements(pageElem: Element) {
    const children = Array.from(pageElem.children);

    // Set attributes of the links or submenu elements in the page.
    for (const elem of children) {
      if (!elem.hasAttribute(Attributes.STEPPED_PAGE)) continue;

      // The 'haspopup' aria attribute marks an item that has a sub-menu to
      // to differentiate it from the simple link elements.
      elem.setAttribute(AttributeConst.ARIA_HASPOPUP, 'true');

      // The 'selected' aria attribute indicates it's the active page.
      elem.setAttribute(
        AttributeConst.ARIA_SELECTED,
        String(elem.classList.contains(HeaderCssClasses.ACTIVE_MENU)),
      );

      // Connect the aria controls attr with the controls index.
      if (elem instanceof HTMLElement) {
        const pageId = Number(elem.dataset[Attributes.STEPPED_PAGE_CAMEL]);
        elem.setAttribute(
          AttributeConst.ARIA_CONTROLS,
          this.elementIds[pageId],
        );
      }
    }
  }

  /**
   * Gets current page parent page index.
   */
  getCurrentPageParentIndex(): number {
    const pageElem = this.pageEls[this.model.currentPage - 1];
    const index = Number(pageElem.dataset[Attributes.PARENT_INDEX_CAMEL]);
    return isNaN(index) ? 1 : index;
  }

  override destroy() {
    for (const pageElem of this.pageEls) {
      pageElem.classList.remove(
        GlueCssClasses.SHOW,
        CssClasses.PARENT_POSITION,
      );
      pageElem.id = '';
    }
    this.observer.unlisten(Strings.CURRENT_PAGE, this.handleUpdate);
  }
}

export {Pages};
