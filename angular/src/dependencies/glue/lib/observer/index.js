/**
 * @fileoverview An Observer class to create observables.
 */
/**
 * Observer generates observables for data tracking.
 */
class Observer {
  constructor(data) {
    this.data = data;
    // Create a map for keys and callbacks.
    this.watchers = new Map();
    // Generate an observable.
    this.walk(this.data);
  }
  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i]);
    }
  }
  /**
   * Define a reactive property on an object.
   */
  defineReactive(obj, key, val) {
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }
    // Use pre-defined getter/setters if they exist.
    const getter = property && property.get;
    const setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        const value = getter ? getter.call(obj) : val;
        if (!this.watchers.has(key)) {
          this.watchers.set(key, []);
        }
        return value;
      },
      set: (newVal) => {
        const value = getter ? getter.call(obj) : val;
        if (newVal === value) {
          return;
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        this.notify(key);
      },
    });
  }
  /**
   * Add callback to the watchers list.
   * @param key The key or object that the model listens to
   *     changes on.
   */
  listen(key, callback) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((prop) => {
        if (!this.watchers.has(prop)) {
          this.watchers.set(prop, []);
        }
        const callbacks = this.watchers.get(prop);
        if (callbacks) callbacks.push(callback);
      });
    } else {
      if (!this.watchers.has(key)) {
        this.watchers.set(key, []);
      }
      const callbacks = this.watchers.get(key);
      if (callbacks) callbacks.push(callback);
    }
  }
  /**
   * Remove callback from the watchers list.
   * @param key The key or object that the model listens to
   *     changes on.
   */
  unlisten(key, callback) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((prop) => {
        if (this.watchers.has(prop)) {
          this.watchers.set(
              prop, this.watchers.get(prop).filter((val) => val !== callback));
        }
      });
    } else if (this.watchers.get(key)) {
      this.watchers.set(
          key, this.watchers.get(key).filter((val) => val !== callback));
    }
  }
  /**
   * Notify subscribers.
   */
  notify(key) {
    if (this.watchers.get(key)) {
      this.watchers.get(key).forEach((subscriber) => {
        subscriber.call(null);
      });
    }
  }
}
export {Observer};
