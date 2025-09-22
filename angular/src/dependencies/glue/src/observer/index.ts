/**
 * @fileoverview An Observer class to create observables.
 */

interface ObserverDataObj {
  [propName: string]: unknown;
}

type WatcherFunction = () => unknown;

declare interface ObserverDef {
  data: ObserverDataObj;
  listen: (key: string | ObserverDataObj, callback: WatcherFunction) => void;
  unlisten: (key: string | ObserverDataObj, callback: () => unknown) => void;
  defineReactive: (obj: ObserverDataObj, key: string, val?: unknown) => void;
}

/**
 * Observer generates observables for data tracking.
 */
class Observer<T extends ObserverDataObj> implements ObserverDef {
  watchers: Map<string, WatcherFunction[]>;

  constructor(public data: T) {
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
  private walk(obj: ObserverDataObj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i]);
    }
  }

  /**
   * Define a reactive property on an object.
   */
  defineReactive(obj: ObserverDataObj, key: string, val?: unknown) {
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
  listen(key: string | ObserverDataObj, callback: WatcherFunction) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((prop) => {
        if (!this.watchers.has(prop)) {
          this.watchers.set(prop, []);
        }
        const callbacks: WatcherFunction[] | undefined =
          this.watchers.get(prop);
        if (callbacks) callbacks.push(callback);
      });
    } else {
      if (!this.watchers.has(key)) {
        this.watchers.set(key, []);
      }
      const callbacks: WatcherFunction[] | undefined = this.watchers.get(key);
      if (callbacks) callbacks.push(callback);
    }
  }

  /**
   * Remove callback from the watchers list.
   * @param key The key or object that the model listens to
   *     changes on.
   */
  unlisten(key: string | ObserverDataObj, callback: () => unknown) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((prop) => {
        if (this.watchers.has(prop)) {
          this.watchers.set(
            prop,
            (this.watchers.get(prop) as WatcherFunction[]).filter(
              (val) => val !== callback,
            ),
          );
        }
      });
    } else if (this.watchers.get(key)) {
      this.watchers.set(
        key,
        (this.watchers.get(key) as WatcherFunction[]).filter(
          (val) => val !== callback,
        ),
      );
    }
  }

  /**
   * Notify subscribers.
   */
  private notify(key: string) {
    if (this.watchers.get(key)) {
      (this.watchers.get(key) as WatcherFunction[]).forEach((subscriber) => {
        subscriber.call(null);
      });
    }
  }
}

export {Observer, type ObserverDataObj, type WatcherFunction};
