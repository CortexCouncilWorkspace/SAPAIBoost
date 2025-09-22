import {Observer} from '../../observer/index';
import {FilterDataModel} from '../constants';

type FilterStateManagerModels = Record<string, Observer<FilterDataModel>>;

declare interface FilterStateManagerDef {
  getModel: (key: string) => Observer<FilterDataModel> | undefined;
  getModels: () => Record<string, Observer<FilterDataModel>>;
  setModel: (key: string, model: Observer<FilterDataModel>) => void;
}

/**
 * A class to manage state of list filter component.
 * It manages a collection of models.
 */
class FilterStateManager implements FilterStateManagerDef {
  private static instance?: FilterStateManager;
  private readonly models: FilterStateManagerModels = {};

  constructor() {
    if (!FilterStateManager.instance) {
      FilterStateManager.instance = this;
    } else {
      this.models = FilterStateManager.instance.getModels();
    }
    return FilterStateManager.instance;
  }

  /**
   * Returns the data object based on the key.
   * @param key The key of the data.
   */
  getModel(key: string): Observer<FilterDataModel> | undefined {
    return this.models[key];
  }

  /**
   * Returns all data objects.
   */
  getModels(): FilterStateManagerModels {
    return this.models;
  }

  /**
   * Sets data model.
   * @param key The key of the data.
   * @param model The data to be set.
   */
  setModel(key: string, model: Observer<FilterDataModel>) {
    this.models[key] = model;
  }

  // Resets the StateManager instance.
  static reset() {
    FilterStateManager.instance = undefined;
  }
}

export {FilterStateManager, type FilterStateManagerModels};
