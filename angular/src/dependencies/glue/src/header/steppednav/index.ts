import {Component} from '../../base/';
import {
  Attribute,
  Attribute as GlueAttribute,
  Role,
  TabIndex,
} from '../../constants/attribute';
import {EventType} from '../../events/eventtype';
import {Key} from '../../events/key';
import {Observer} from '../../observer';
import {CssClasses as HeaderCssClasses} from '../constants';

import {Attributes, CssClasses, DataModel, Strings} from './constants';
import {Pages} from './pages';

type MouseEventHandler = (evt: MouseEvent) => void;
type KeyEventHandler = (evt: KeyboardEvent) => void;
type EventHandler = () => void;

class SteppedNav extends Component {
  private menuPages!: Pages;
  private controlsPages!: Pages;
  private steppedControlsTitle!: HTMLElement;
  private steppedControls!: HTMLElement;
  private steppedControlsContainer!: HTMLElement;
  private pagesContainer!: HTMLElement;
  private subnavIcon!: HTMLElement;
  private activeInitPageIndex = 1;
  private readonly model!: DataModel;
  private readonly observer!: Observer<DataModel>;
  private readonly modelDefaults: DataModel = {
    currentPage: 1,
    totalPages: 0,
  };

  private readonly handleKeyPress: KeyEventHandler = (evt: KeyboardEvent) => {
    this.keyPress(evt);
  };

  private readonly handleClick: MouseEventHandler = (evt: MouseEvent) => {
    if (evt.target instanceof Element) this.selectPage(evt.target);
    if (
      evt.target instanceof HTMLAnchorElement &&
      evt.target.getAttribute('href') === '#'
    ) {
      evt.preventDefault();
    }
  };

  private readonly updateHandler: EventHandler = () => {
    // Set the active element to the container so event listeners will pick
    // up events.
    this.root.focus();
  };

  /**
   * Get the element for the Stepped Nav. Useful in detemining if the
   * element is present.
   * @param root The element in which to look.
   * @return A stepped nav root element if present.
   */
  static getSteppedNavElement(root: HTMLElement): HTMLElement {
    return root.querySelector<HTMLElement>(`.${CssClasses.ROOT}`)!;
  }

  constructor(root: HTMLElement) {
    super(root);

    // Set up the data model.
    this.observer = new Observer(Object.assign({}, this.modelDefaults));
    this.model = this.observer.data;

    // Sets up the oage containers that will be used for the Menus.
    this.initMenuPages();

    // Sets up the controls containers.
    this.initControls();

    // Build a menu list out of the existing menu structure. Must be called
    // after the controls and menu pages are initialized.
    this.buildPagesFromNav();

    // Init the active page if it's not the default first page.
    // This must happen after the Pages is created because
    // the page model needs to know how many pages there are.
    this.model.currentPage = this.activeInitPageIndex;

    // Designate this as a navigation element.
    this.root.setAttribute(GlueAttribute.ROLE, Role.NAVIGATION);
    this.root.tabIndex = Number(TabIndex.TABBABLE);
    this.root.addEventListener(EventType.CLICK, this.handleClick);
    this.root.addEventListener(EventType.KEYDOWN, this.handleKeyPress);

    this.observer.listen(Strings.CURRENT_PAGE, this.updateHandler);
  }

  /**
   * Initialize the menu Page containers.
   */
  private initMenuPages() {
    // Set the page attributes of the stepped menu container.
    this.pagesContainer = this.root.querySelector<HTMLElement>(
      `.${CssClasses.MENU_CONTAINER}`,
    )!;
    if (!this.pagesContainer) throw new Error(Strings.MISSING_PAGES_CONT);
    this.pagesContainer.classList.add(CssClasses.PAGES);
  }

  /**
   * Initialize the controls over the Pages.
   */
  private initControls() {
    this.steppedControlsContainer = this.root.querySelector<HTMLElement>(
      `.${CssClasses.CONTROLS_CONTAINER}`,
    )!;
    this.steppedControls = this.root.querySelector<HTMLElement>(
      `.${CssClasses.CONTROLS}`,
    )!;
    this.steppedControlsTitle = this.root.querySelector<HTMLElement>(
      `.${CssClasses.CONTROLS_TITLE}`,
    )!;
    if (
      !this.steppedControlsContainer ||
      !this.steppedControls ||
      !this.steppedControlsTitle
    ) {
      throw new Error(Strings.MISSING_CONTROLS);
    }
    this.steppedControls.remove();

    // Grab the subnav icon from the controls for later use - and remove it.
    this.subnavIcon = this.steppedControls.querySelector<HTMLElement>(
      `.${CssClasses.SUBNAV_ICON}`,
    )!;
    if (this.subnavIcon) this.subnavIcon.remove();

    this.steppedControls.classList.add(CssClasses.PAGE);
  }

  /**
   * Initialize all the menu pages. This adds them to the menu container and
   * sets up page and controls for UI actions.
   * @return activePageIndex {number}
   */
  private buildPagesFromNav() {
    // Clone the existing menu structure.
    const linkBar = this.root.parentElement?.querySelector(
      `.${HeaderCssClasses.LINK_BAR}`,
    );
    if (!linkBar) throw new Error(Strings.MISSING_LINK_BAR);
    const rootMenu = linkBar.firstElementChild?.cloneNode(true);

    // Start the recursive search with the root menu.
    if (rootMenu instanceof HTMLElement) this.harvestMenu(rootMenu);

    // Create Pages from the pages and controls containers. This
    // must be done after the pages are built.
    this.menuPages = new Pages(this.pagesContainer, this.observer);
    this.controlsPages = new Pages(
      this.steppedControlsContainer,
      this.observer,
    );

    this.model.totalPages = this.pagesContainer.children.length;
  }

  /**
   * Harvest a menu element. Creates a new page in the stepped nav.
   * @param menuElement The menu Element to look in.
   * @param menuParentTitle  The title of the menu parent.
   * @return The index of this menu page.
   */
  private harvestMenu(
    menuElement: HTMLElement,
    parentIndex?: number,
    menuParentTitle: string = '',
  ): number {
    // Set Page properties of the new menu clone, make it a page
    // and add it to the menu container as a new page.
    menuElement.classList.add(CssClasses.PAGE);
    this.pagesContainer.appendChild(menuElement);

    // Build and add the controls for this menu.
    this.steppedControlsTitle.textContent = menuParentTitle;
    const controlsElem = this.steppedControls.cloneNode(true) as HTMLElement;
    controlsElem.classList.add(HeaderCssClasses.LINK_ITEM);
    if (menuElement.classList.contains(CssClasses.PARENT_POSITION)) {
      controlsElem.classList.add(CssClasses.PARENT_POSITION);
    }

    if (parentIndex) {
      // Set the controls page to the index of the parent menu.
      controlsElem.dataset[Attributes.PARENT_INDEX_CAMEL] = String(parentIndex);
      // Set the parent index of the stepped page for positioning.
      menuElement.dataset[Attributes.PARENT_INDEX_CAMEL] = String(parentIndex);
    }

    // Set the tab index so this element is focusable.
    controlsElem.tabIndex = Number(TabIndex.NOT_TABBABLE);

    this.steppedControlsContainer.appendChild(controlsElem);

    // Harvest the menu children to look for more menus.
    const thisMenuPageIndex = this.pagesContainer.children.length;
    for (const menuItem of Array.from(menuElement.children)) {
      if (menuItem instanceof HTMLElement) {
        this.harvestListItem(thisMenuPageIndex, menuItem);
      }

      // Put this menu in the right position if the list item is active.
      if (menuItem.classList.contains(HeaderCssClasses.ACTIVE_MENU)) {
        menuElement.classList.add(CssClasses.PARENT_POSITION);
        controlsElem.classList.add(CssClasses.PARENT_POSITION);
      }
    }

    // Set role and aria-label for accessibility purposes.
    if (menuParentTitle) {
      const labelTemplate =
        controlsElem.dataset[Attributes.STEPPEDNAV_LABEL] ||
        Strings.STEPPEDNAV_LABEL;
      const navLabel = labelTemplate.replaceAll(
        Strings.STEPPED_NAV_LABEL_VAR_NAME,
        menuParentTitle,
      );
      controlsElem.setAttribute(Attribute.ARIA_LABEL, navLabel);
      controlsElem.setAttribute(Attribute.ROLE, Role.BUTTON);
    }

    // Return the index of this menu.
    return thisMenuPageIndex;
  }

  /**
   * Harvest a menu list item element. If it finds a menu, it is harvested
   * via harvestMenu();
   * @param parentMenuPageIndex The index of the parent menu.
   * @param listItemElement The menu list item element.
   */
  private harvestListItem(
    parentMenuPageIndex: number,
    listItemElement: HTMLElement,
  ) {
    const subMenuElement = this.getChildOfNodeType<HTMLUListElement>(
      listItemElement,
      'UL',
    );
    const linkElement = this.getChildOfNodeType<HTMLAnchorElement>(
      listItemElement,
      'A',
    );

    // See if this is a leaf node (i.e. if it doesn't have a submenu.)
    // If it's active, we've found the currently active page.
    if (
      !subMenuElement &&
      listItemElement.classList.contains(HeaderCssClasses.ACTIVE_LINK)
    ) {
      this.activeInitPageIndex = parentMenuPageIndex;
    }

    // Make the link not tabbable.
    if (linkElement) {
      linkElement.tabIndex = Number(TabIndex.NOT_TABBABLE);
    }

    if (!subMenuElement || !linkElement) return;

    // Take this submenu out of the li so it doesn't appear in the UI.
    subMenuElement.remove();

    // Since this is a submenu node, get the anchor element and submenu
    // and make a new page out of it.
    const menuElementPageIndex = this.harvestMenu(
      subMenuElement,
      parentMenuPageIndex,
      linkElement.textContent?.trim(),
    );

    // Set the pointer to the page this link points to.
    listItemElement.dataset[Attributes.STEPPED_PAGE_CAMEL] =
      String(menuElementPageIndex);

    // Remove any svg that was there from the deep nav. Add the correct svg.
    const existingArrow = this.getChildOfNodeType<SVGElement>(
      linkElement,
      'svg',
    );
    existingArrow?.remove();
    if (this.subnavIcon) {
      linkElement.appendChild(this.subnavIcon.cloneNode(true));
    }
  }

  /**
   * Moves the page model to the next or previous page when the user uses
   * the enter, space or directional keys.
   */
  private keyPress(evt: KeyboardEvent) {
    const target = evt.target as Element;
    const isRtl = !!this.root.closest('[dir=rtl]');
    // Selectable Elements are whichever elements are selectable via arrow
    // navigation in each of the groups of pages.
    const selectableElements = this.controlsPages.selectableElements.concat(
      this.menuPages.selectableElements,
    ) as HTMLElement[];
    const selectedIndex = selectableElements.indexOf(
      document.activeElement as HTMLElement,
    );

    switch (evt.key) {
      case Key.ENTER:
      case Key.SPACE:
        this.selectPage(target);
        break;
      case Key.LEFT:
        isRtl ? this.selectSubPage(target) : this.selectParentPage();
        break;
      case Key.RIGHT:
        isRtl ? this.selectParentPage() : this.selectSubPage(target);
        break;
      case Key.UP:
        selectedIndex > 0
          ? selectableElements[selectedIndex - 1].focus()
          : selectableElements[selectableElements.length - 1].focus();
        break;
      case Key.DOWN:
        selectedIndex >= selectableElements.length - 1
          ? selectableElements[0].focus()
          : selectableElements[selectedIndex + 1].focus();
        break;
      case Key.HOME:
        selectableElements[0].focus();
        break;
      case Key.END:
        selectableElements[selectableElements.length - 1].focus();
        break;
      default:
    }
  }

  /**
   * Handle a select action without a forward/back direction.
   */
  private selectPage(elem: Element) {
    // If it's in the controls container, then it's a parent page select action.
    if (this.steppedControlsContainer.contains(elem)) {
      this.selectParentPage();
    } else {
      this.selectSubPage(elem);
    }
  }

  /**
   * Handle when a new page has been selected from a submenu element action.
   */
  private selectSubPage(elem: Element) {
    // Find parent elem that is either a controls element or a subnav element.
    const dataElem = elem.closest<HTMLElement>(`[${Attributes.STEPPED_PAGE}]`);
    if (dataElem) {
      const pageIndex = Number(
        dataElem?.dataset[Attributes.STEPPED_PAGE_CAMEL],
      );
      this.model.currentPage = pageIndex;
    }
  }

  /**
   * Handle when we should go to the parent page of an elem.
   */
  private selectParentPage() {
    // Find parent element where the attribute is either parent or a stepped
    // page.
    const parentPageIndex = this.controlsPages.getCurrentPageParentIndex();
    this.model.currentPage = parentPageIndex;
  }

  /**
   * Get a child element from a parent of a specified type.
   * @param parent The element to look in.
   * @param type The type of node to get e.g. 'UL'
   * @return The first child of that type or undefined if not found.
   */
  private getChildOfNodeType<T>(parent: Element, type: string) {
    return Array.from(parent.children).find((el) => el.nodeName === type) as
      | T
      | undefined;
  }

  override destroy() {
    if (this.menuPages) this.menuPages.destroy();
    if (this.controlsPages) this.controlsPages.destroy();
    this.observer.unlisten(Strings.CURRENT_PAGE, this.updateHandler);

    this.root.removeEventListener(EventType.CLICK, this.handleClick);
    this.root.removeEventListener(EventType.KEYDOWN, this.handleKeyPress);

    for (const node of this.pagesContainer.childNodes) {
      this.pagesContainer.removeChild(node);
    }

    for (const node of this.steppedControlsContainer.childNodes) {
      this.steppedControlsContainer.removeChild(node);
    }

    this.steppedControls.removeEventListener(EventType.CLICK, this.handleClick);
    this.steppedControls.removeEventListener(
      EventType.KEYDOWN,
      this.handleKeyPress,
    );
  }
}

export {SteppedNav};
