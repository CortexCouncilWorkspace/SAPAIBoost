// taze: material_dts from //marketing/glue/cdn:material_dts

import {MdCheckbox} from '@material/web/checkbox/checkbox';
import {MdRadio} from '@material/web/radio/radio';
import {MdFilledSelect} from '@material/web/select/filled-select';
import {MdOutlinedSelect} from '@material/web/select/outlined-select';
import {MdSelectOption} from '@material/web/select/select-option';

import {Component} from '../../base';
import {EventType} from '../../events/eventtype';
import {Observer} from '../../observer';
import {
  CssClasses,
  FilterDataModel,
  MaterialClasses,
  Strings,
} from '../constants';
import {FilterStateManager} from '../state_manager';

/**
 * A filter category class to manage an individual Glue filter.
 */
class FilterCategory extends Component {
  category?: string;
  chips: {[key: string]: string} = {};
  model!: Observer<FilterDataModel>;
  private readonly nativeCategoryItems: HTMLInputElement[];
  private readonly materialCategoryItems: HTMLLIElement[];
  private readonly selectEl: HTMLSelectElement | null;
  private readonly materialSelectEl: HTMLDivElement | null;
  private readonly mwc3SelectEl: MdOutlinedSelect | MdFilledSelect | null;
  private materialSelect?: mdc.MDCSelect;
  private readonly stateManager = new FilterStateManager();
  private readonly handleSelectChangeFunc = (evt: Event) => {
    this.handleSelectChange(evt);
  };
  private readonly handleMaterialSelectChangeFunc = (evt: Event) => {
    this.handleMaterialSelectChange(evt);
  };
  private readonly handleMWC3SelectChangeFunc = (evt: Event) => {
    this.handleMWC3SelectChange(evt);
  };
  private readonly handleInputChangeFunc = (evt: Event) => {
    this.handleInputChange(evt);
  };

  /**
   * Creates an instance of GlueFilterCategory.
   */
  constructor(root: HTMLElement) {
    super(root);
    this.selectEl = this.root.querySelector<HTMLSelectElement>('select');
    this.nativeCategoryItems = [
      ...this.root.querySelectorAll<HTMLInputElement>(
        `input.${CssClasses.CATEGORY_ITEM}`,
      ),
    ];
    this.materialCategoryItems = [
      ...this.root.querySelectorAll<HTMLLIElement>(
        `li.${CssClasses.CATEGORY_ITEM}:not(.${MaterialClasses.LIST_ITEM})`,
      ),
    ];
    this.materialSelectEl = this.root.querySelector<HTMLDivElement>(
      `.${MaterialClasses.SELECT}`,
    );
    this.mwc3SelectEl = this.root.querySelector<
      MdOutlinedSelect | MdFilledSelect
    >(`.${MaterialClasses.MWC3_SELECT} :first-child`);
    this.init();
  }

  private init() {
    // Throws an error if filter category is not set.
    this.category = this.root.dataset[Strings.CATEGORY];
    if (!this.category) {
      throw new Error(Strings.ERROR_MISSING_CATEGORY);
    }

    this.model =
      this.stateManager.getModel(this.category) ??
      new Observer<FilterDataModel>({});

    // Initializes select element.
    if (this.selectEl) {
      this.initSelect(this.selectEl);
    }

    // Initializes native HTML input checkbox or radio elements.
    if (this.nativeCategoryItems.length !== 0) {
      this.initNativeInputs(this.nativeCategoryItems);
    }

    // Initializes Material 2 or 3 input checkbox or radio elements.
    if (this.materialCategoryItems.length !== 0) {
      this.initMaterialInputs(this.materialCategoryItems);
    }

    // Initializes Material 2 select element.
    if (this.materialSelectEl) {
      this.initMaterialSelect(this.materialSelectEl);
    }

    // Initializes Material 3 select element.
    if (this.mwc3SelectEl) {
      this.initMWC3Select(this.mwc3SelectEl);
    }

    // Add the data model to stateManager.
    this.stateManager.setModel(this.category, this.model);
  }

  /**
   * Removes event listeners on filter elementss.
   */
  override destroy() {
    this.selectEl &&
      this.root.removeEventListener(
        EventType.CHANGE,
        this.handleSelectChangeFunc,
      );

    this.materialSelectEl &&
      this.root.removeEventListener(
        Strings.MATERIALSELECT_CHANGE,
        this.handleMaterialSelectChangeFunc,
      );

    this.mwc3SelectEl &&
      this.root.removeEventListener(
        EventType.CHANGE,
        this.handleMWC3SelectChangeFunc,
      );

    this.nativeCategoryItems &&
      this.root.removeEventListener(
        EventType.CHANGE,
        this.handleInputChangeFunc,
      );

    this.materialCategoryItems &&
      this.root.removeEventListener(
        EventType.CHANGE,
        this.handleInputChangeFunc,
      );
  }

  /**
   * Resets the data model.
   */
  reset() {
    for (const key of Object.keys(this.model.data)) {
      this.model.data[key] = false;
    }

    // Updates Material 2 Select rendering manually
    if (this.materialSelect) {
      this.materialSelect.selectedIndex = 0;
    }

    // Reset Material 3 Select rendering manually
    if (this.mwc3SelectEl) {
      this.mwc3SelectEl.value = '';
    }
  }

  /** Initializes the select element. */
  private initSelect(selectEl: HTMLSelectElement) {
    // Iterates all select options except the first default option.
    const filterItems = [
      ...selectEl.querySelectorAll<HTMLOptionElement>(
        `option.${CssClasses.CATEGORY_ITEM}`,
      ),
    ];
    const filterElements = filterItems.slice(1);
    for (const el of filterElements) {
      if (el.value) {
        const filterOption = el.value;
        const isSelected = selectEl.value === filterOption;
        // Updates data model and subscribes to the data change.
        this.setModelProperty(filterOption, isSelected);
        this.model.listen(filterOption, () => {
          el.selected = this.model.data[filterOption];
        });
        // Updates chip data.
        this.chips[filterOption] = el.innerText;
      } else {
        throw new Error(Strings.ERROR_MISSING_VALUE);
      }
    }
    this.root.addEventListener(EventType.CHANGE, this.handleSelectChangeFunc);
  }

  /**
   * Initializes the Material Select element.
   */
  private initMaterialSelect(materialSelectEl: HTMLDivElement) {
    this.materialSelect = new mdc.select.MDCSelect(materialSelectEl);
    const initialValue = this.materialSelect?.value || '';

    // Iterates all select options except the first default option.
    const filterItems = [
      ...materialSelectEl.querySelectorAll<HTMLLIElement>(
        `li.${MaterialClasses.LIST_ITEM}`,
      ),
    ];
    const filterElements = filterItems.slice(1);
    for (const el of filterElements) {
      const filterOption = el.dataset[Strings.DATA_VALUE];
      const filterLabelEl = el.querySelector<HTMLElement>(
        `.${MaterialClasses.SELECT_LABEL}`,
      );
      if (filterOption && filterLabelEl) {
        const isSelected = initialValue === filterOption;
        // Updates data model.
        this.setModelProperty(filterOption, isSelected);
        // Updates chips data.
        this.chips[filterOption] = filterLabelEl.innerText;
      }
    }

    this.root.addEventListener(
      Strings.MATERIALSELECT_CHANGE,
      this.handleMaterialSelectChangeFunc,
    );
  }

  /**
   * Initializes the MWC3 Select element.
   */
  private initMWC3Select(mwc3SelectEl: MdOutlinedSelect | MdFilledSelect) {
    // Iterates all select options
    const filterElements = [
      ...mwc3SelectEl.querySelectorAll<MdSelectOption>(`md-select-option`),
    ];

    for (const el of filterElements) {
      if (el.value) {
        // Updates data model.
        this.setModelProperty(el.value, el.selected);
        // Updates chips data. Use display text if provided or text content
        this.chips[el.value] = el.displayText
          ? el.displayText
          : el.innerText.trim();
      }
    }

    this.root.addEventListener(
      EventType.CHANGE,
      this.handleMWC3SelectChangeFunc,
    );
  }

  /**
   * Initializes native HTML input checkbox or radio elements.
   */
  private initNativeInputs(nativeCategoryItems: HTMLInputElement[]) {
    // Iterates all checkbox or radio elements to update data object, and
    // throws an error if attribute 'value' is not set on the element.
    for (const el of nativeCategoryItems) {
      const filterOption = el.value;
      if (filterOption) {
        const isSelected = el.checked;
        // Updates data model and subscribes to the data change.
        this.setModelProperty(filterOption, isSelected);
        this.model.listen(filterOption, () => {
          el.checked = this.model.data[filterOption];
        });
        // Updates chip data.
        this.chips[filterOption] =
          el.parentNode?.querySelector('label')?.innerText || '';
      } else {
        throw new Error(Strings.ERROR_MISSING_VALUE);
      }
    }
    this.root.addEventListener(EventType.CHANGE, this.handleInputChangeFunc);
  }

  /**
   * Initializes Material input checkbox or radio elements.
   */
  private initMaterialInputs(materialCategoryItems: HTMLLIElement[]) {
    // Iterates all checkbox or radio elements to update data object, and
    // throws an error if attribute 'value' is not set on the element.
    for (const el of materialCategoryItems) {
      // Initialize Material elements
      const materialFormFieldEl = el.querySelector<HTMLDivElement>(
        `.${MaterialClasses.FORM_FIELD}`,
      );
      if (materialFormFieldEl) {
        // Initialize Material 2 components
        // TODO: b/323929145 - Remove this as part of Material 2 removal.
        const materialFormField = new mdc.formField.MDCFormField(
          materialFormFieldEl,
        );
        const materialInput = materialFormFieldEl.children[0];
        if (materialInput.classList.contains('mdc-checkbox')) {
          const materialCheckbox = new mdc.checkbox.MDCCheckbox(materialInput);
          materialFormField.input = materialCheckbox;
        } else if (materialInput.classList.contains('mdc-radio')) {
          const materialRadio = new mdc.radio.MDCRadio(materialInput);
          materialFormField.input = materialRadio;
        } else {
          throw new Error(Strings.ERROR_MISSING_MATERIAL);
        }

        // Set up filter
        const inputEl = el.querySelector<HTMLInputElement>('input');
        const labelEl = el.querySelector<HTMLLabelElement>('label');
        if (inputEl) {
          const filterOption = inputEl.value;
          const isSelected = inputEl.checked;
          if (filterOption) {
            // Updates data model and subscribes to the data change.
            this.setModelProperty(filterOption, isSelected);
            this.model.listen(filterOption, () => {
              inputEl.checked = this.model.data[filterOption];
            });
            // Updates chip data.
            this.chips[filterOption] = labelEl?.innerText || '';
          } else {
            throw new Error(Strings.ERROR_MISSING_VALUE);
          }
        }
      } else {
        // Set up Material 3 inputs
        const labelEl = el.querySelector<HTMLLabelElement>('label');
        const checkboxEl = el.querySelector<MdCheckbox>('md-checkbox');
        const radioEl = el.querySelector<MdRadio>('md-radio');
        if (checkboxEl) {
          const filterOption = checkboxEl.value;
          const isSelected = checkboxEl.checked;
          if (filterOption) {
            // Updates data model and subscribes to the data change.
            this.setModelProperty(filterOption, isSelected);
            this.model.listen(filterOption, () => {
              checkboxEl.checked = this.model.data[filterOption];
            });
            // Updates chip data.
            this.chips[filterOption] = labelEl?.innerText || '';
          } else {
            throw new Error(Strings.ERROR_MISSING_VALUE);
          }
        } else if (radioEl) {
          const filterOption = radioEl.value;
          const isSelected = radioEl.checked;
          if (filterOption) {
            // Updates data model and subscribes to the data change.
            this.setModelProperty(filterOption, isSelected);
            this.model.listen(filterOption, () => {
              radioEl.checked = this.model.data[filterOption];
            });
            // Updates chip data.
            this.chips[filterOption] = labelEl?.innerText || '';
          } else {
            throw new Error(Strings.ERROR_MISSING_VALUE);
          }
        } else {
          throw new Error(Strings.ERROR_MISSING_MATERIAL);
        }
      }
    }

    this.root.addEventListener(EventType.CHANGE, this.handleInputChangeFunc);
  }

  /**
   * Handles the select element when it changes using single-select parameters.
   * @param evt Change event.
   */
  private handleSelectChange(evt: Event) {
    for (const key of Object.keys(this.model.data)) {
      // reset all select options to false (single select)
      this.setModelProperty(key, false);
    }
    if (evt.target instanceof HTMLSelectElement && evt.target.value) {
      // set only the current option as true in the data model
      this.setModelProperty(evt.target.value, true);
    }
  }

  /**
   * Handles the Material Select element when it changes by updating the data
   * model and the Material Select element.
   * @param evt Change event from MDCSelect.
   */
  private handleMaterialSelectChange(evt: Event) {
    const el = evt.target;
    // As a custom event, includes information on the value being changed to
    const filterOption = (evt as CustomEvent).detail.value;
    if (
      this.materialSelect &&
      el instanceof HTMLDivElement &&
      el.classList.contains(MaterialClasses.SELECT)
    ) {
      // reset all select options to false (single select)
      for (const key of Object.keys(this.model.data)) {
        this.setModelProperty(key, false);
      }
      // set only the current option as true in the data model
      if (filterOption) {
        this.setModelProperty(filterOption, true);
      }
    }
  }

  /**
   * Handles the MWC3 Select element when it changes by updating the data
   * model and the Material Select element.
   * @param evt Change event from md-select.
   */
  private handleMWC3SelectChange(evt: Event) {
    const el = evt.target;
    if (el instanceof MdOutlinedSelect || el instanceof MdFilledSelect) {
      // reset all select options to false (single select)
      for (const key of Object.keys(this.model.data)) {
        this.setModelProperty(key, false);
      }
      // set currently selected value to true
      if (el.value) {
        this.setModelProperty(el.value, true);
      }
    }
  }

  /**
   * Handles native HTML or Material input checkbox or radio elements on change.
   * @param evt Change event.
   */
  private handleInputChange(evt: Event) {
    const el = evt.target;
    if (
      el instanceof HTMLInputElement ||
      el instanceof MdRadio ||
      el instanceof MdCheckbox
    ) {
      if (
        (el instanceof HTMLInputElement && el.type === 'radio') ||
        el instanceof MdRadio
      ) {
        if (el.checked) {
          // Reset all other radio options and then re-check the radio
          for (const key of Object.keys(this.model.data)) {
            this.setModelProperty(key, false);
          }
          el.checked = true;
        }
      }

      // Update the filter item's value in the model
      const filterOption = el.value;
      this.setModelProperty(filterOption, el.checked);
    }
  }

  /**
   * Updates the filter item's value in the data model if it already exists, or
   * adds it to the model.
   * @param key The filter item's name
   * @param value Whether the filter item is active or inactive
   */
  private setModelProperty(key: string, value: boolean) {
    this.model.data[key] !== undefined
      ? (this.model.data[key] = value)
      : this.model.defineReactive(this.model.data, key, value);

    this.emit(Strings.UPDATE_STATUS, {}, true);
  }
}

export {FilterCategory};
