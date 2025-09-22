/**
 * tslint:disable class-as-namespace
 */

import {Strings} from '../constants';

import {ExpansionPanelOptions, ExpansionPanelsModel} from './index';

/**
 * Expansion Panels model factory.
 */
class ModelFactory {
  /**
   * Internal list of all registered expansion panels model instances.
   */
  private static instances: {[key: string]: ExpansionPanelsModel} = {};

  /**
   * Returns a new or existing expansion panels model instance based on an
   * identifier.
   * Falls back on a default instance if no id is provided.
   */
  static get(
    id: string = Strings.DEFAULT_INSTANCE_ID,
    options: Partial<ExpansionPanelOptions> = ExpansionPanelsModel.defaults,
  ): ExpansionPanelsModel {
    let instance = ModelFactory.instances[id];
    if (!instance) {
      instance = new ExpansionPanelsModel(options);
      ModelFactory.instances[id] = instance;
    }
    return instance;
  }

  /**
   * Clears a single expansion panels model instance.
   */
  static clearSingle(id: string) {
    delete ModelFactory.instances[id];
  }

  /**
   * Clears all existing expansion panels model instances.
   */
  static clearAll() {
    ModelFactory.instances = {};
  }
}

export {ModelFactory};
