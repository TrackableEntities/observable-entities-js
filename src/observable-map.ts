import { Subject } from 'rxjs/Subject';

import { INotifyInfo } from './notify-info';
import { IObservableCollection } from './observable-collection';

/**
 * Extends May<TKey, TEntity> to notify observers when entries are added or removed.
 *
 * @export
 * @class ObservableMap
 * @extends {Map<TKey, TEntity>}
 * @implements {IObservableCollection<[TKey, TEntity]>}
 * @template TKey
 * @template TEntity
 */
export class ObservableMap<TKey, TEntity> extends Map<TKey, TEntity> implements IObservableCollection<[TKey, TEntity]> {

  private _addListeners: Subject<INotifyInfo>[] = [];
  private _removeListeners: Subject<INotifyInfo>[] = [];

  /**
   * Creates an instance of ObservableMap.
   * @param {...[TKey, TEntity][]} entries One or more entries.
   * @memberof ObservableMap
   */
  constructor(...entries: [TKey, TEntity][]) {
    super(entries);
  }

  /**
   * Array of listeners to observe when entries are added to the collection.
   *
   * @readonly
   * @type {Subject<INotifyInfo>[]}
   * @memberof ObservableMap
   */
  get addListeners(): Subject<INotifyInfo>[] {
    return this._addListeners;
  }

  /**
   * Array of listeners to observe when entries are removed from the collection.
   *
   * @readonly
   * @type {Subject<INotifyInfo>[]}
   * @memberof ObservableMap
   */
  get removeListeners(): Subject<INotifyInfo>[] {
    return this._removeListeners;
  }

  /**
   * Add one or more entries to the collection.
   *
   * @param {...[TKey, TEntity][]} entries
   * @returns {this}
   * @memberof ObservableMap
   */
  addRange(...entries: [TKey, TEntity][]): this {
    entries.forEach((entry) => this.add(entry[0], entry[1]));
    return this;
  }

  /**
   * Add an entry to the collection.
   *
   * @param {TKey} key
   * @param {TEntity} value
   * @returns {this}
   * @memberof ObservableMap
   */
  add(key: TKey, value: TEntity): this {
    super.set(key, value);
    if (this._addListeners) {
      const notifyInfo: INotifyInfo = { key: key, currentValue: value };
      this._addListeners.forEach(listener => listener.next(notifyInfo));
    }
    return this;
  }

  /**
   * Remove an entry from the collection.
   *
   * @param {TKey} key
   * @returns {boolean}
   * @memberof ObservableMap
   */
  delete(key: TKey): boolean {
    const value = super.get(key);
    if (this._removeListeners) {
      const notifyInfo: INotifyInfo = { key: key, currentValue: value };
      this._removeListeners.forEach(listener => listener.next(notifyInfo));
    }
    return super.delete(key);
  }

  /**
   * Remove one or more entries from the collection.
   *
   * @param {...TKey[]} keys
   * @returns {boolean}
   * @memberof ObservableMap
   */
  deleteRange(...keys: TKey[]): boolean {
    keys.forEach(key => this.delete(key));
    return true;
  }
}
