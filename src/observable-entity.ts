import { Subject } from 'rxjs';

import { INotifyInfo } from './notify-info';

/**
 * Base class for observable entitites.
 *
 * @export
 * @class ObservableEntity
 */
export class ObservableEntity {

  private _excludedProperties = new Set<string>();

  private _modifyListeners: Subject<INotifyInfo>[] = [];

  protected constructor() {
  }

  /**
   * Factory method for creating an observable entity.
   * Returns proxy of entity with listeners that can observe property changes.
   *
   * @static
   * @template TEntity
   * @param {{ new(): TEntity }} ctor Class name
   * @returns {TEntity} Entity proxy that is observable
   * @memberof ObservableEntity
   */
  public static proxify<TEntity extends object>(ctor: { new(): TEntity }): TEntity {
    const item = new ctor();
    const obs = new ObservableEntity();
    return obs.proxify(item);
  }

  /**
   * Array of listeners to observe property changes.
   *
   * @readonly
   * @type {Subject<INotifyInfo>[]}
   * @memberof ObservableEntity
   */
  get modifyListeners(): Subject<INotifyInfo>[] {
    return this._modifyListeners;
  }

  /**
   * Provide names of properties that will not be observed.
   *
   * @param {...string[]} properties Properties that will not be observed.
   * @memberof ObservableEntity
   */
  addExcludedProperties(...properties: string[]) {
    properties.forEach(p => this._excludedProperties.add(p));
  }

  /**
   * Returns proxy of entity with listeners that can observe property changes.
   * Call from ctor to return observable proxy.
   * @example
   * constructor() {
   *   super();
   *   return super.proxify(this);
   * }
   *
   * @protected
   * @template TEntity
   * @param {TEntity} item Entity to be proxified.
   * @returns {TEntity} Proxified entity.
   * @memberof ObservableEntity
   */
  protected proxify<TEntity extends object>(item: TEntity): TEntity {
    if (!item) {
      return item;
    }
    const modifyListeners = this._modifyListeners;
    const excludedProps = this._excludedProperties;
    const setHandler: ProxyHandler<TEntity> = {
      set: (target, property, value) => {
        const key = property.toString();
        if (!excludedProps.has(key)) {
          const notifyInfo: INotifyInfo = { key: key, origValue: (target as any)[property], currentValue: value };
          modifyListeners.forEach(listener => listener.next(notifyInfo));
        }
        (target as any)[property] = value;
        return true;
      }
    };
    return new Proxy<TEntity>(item, setHandler);
  }
}
