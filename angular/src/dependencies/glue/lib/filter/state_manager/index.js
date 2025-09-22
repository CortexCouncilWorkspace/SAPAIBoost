/**
 * A class to manage state of list filter component.
 * It manages a collection of models.
 */
class FilterStateManager {
  constructor() {
    this.models = {};
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
  getModel(key) {
    return this.models[key];
  }
  /**
   * Returns all data objects.
   */
  getModels() {
    return this.models;
  }
  /**
   * Sets data model.
   * @param key The key of the data.
   * @param model The data to be set.
   */
  setModel(key, model) {
    this.models[key] = model;
  }
  // Resets the StateManager instance.
  static reset() {
    FilterStateManager.instance = undefined;
  }
}
export {FilterStateManager};
