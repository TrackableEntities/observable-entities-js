import { Subject } from 'rxjs';

import { INotifyInfo } from './notify-info';
import { IObservableCollection } from './observable-collection';

/**
 * Extends Set<TEntity> to notify observers when entities are added or removed.
 *
 * @export
 * @class ObservableSet
 * @extends {Set<TEntity>}
 * @implements {IObservableCollection<TEntity>}
 * @template TEntity
 */
export class ObservableSet<TEntity> extends Set<TEntity> implements IObservableCollection<TEntity> {

  private _addListeners: Subject<INotifyInfo>[] = [];
  private _removeListeners: Subject<INotifyInfo>[] = [];

  /**
   * Creates an instance of ObservableSet.
   * @param {...TEntity[]} items One or more entities.
   * @memberof ObservableSet
   */
  constructor(...items: TEntity[]) {
    super(items);
  }

  /**
   * Array of listeners to observe when entities are added to the collection.
   *
   * @readonly
   * @type {Subject<INotifyInfo>[]}
   * @memberof ObservableSet
   */
  get addListeners(): Subject<INotifyInfo>[] {
    return this._addListeners;
  }

  /**
   * Array of listeners to observe when entities are removed from the collection.
   *
   * @readonly
   * @type {Subject<INotifyInfo>[]}
   * @memberof ObservableSet
   */
  get removeListeners(): Subject<INotifyInfo>[] {
    return this._removeListeners;
  }

  /**
   * Add one or more entities to the collection.
   *
   * @param {...TEntity[]} values
   * @returns {this}
   * @memberof ObservableSet
   */
  addRange(...values: TEntity[]): this {
    values.forEach(value => this.add(value));
    return this;
  }

  /**
   * Add an entity to the collection.
   *
   * @param {TEntity} value
   * @returns {this}
   * @memberof ObservableSet
   */
  add(value: TEntity): this {
    super.add(value);
    if (this._addListeners) {
      const notifyInfo: INotifyInfo = { currentValue: value };
      this._addListeners.forEach(listener => listener.next(notifyInfo));
    }
    return this;
  }

  /**
   * Remove an entity from the collection.
   *
   * @param {TEntity} value
   * @returns {boolean}
   * @memberof ObservableSet
   */
  delete(value: TEntity): boolean {
    if (this._removeListeners) {
      const notifyInfo: INotifyInfo = { currentValue: value };
      this._removeListeners.forEach(listener => listener.next(notifyInfo));
    }
    return super.delete(value);
  }

  /**
   * Remove one or more entities from the collection.
   *
   * @param {...TEntity[]} values
   * @returns {boolean}
   * @memberof ObservableSet
   */
  deleteRange(...values: TEntity[]): boolean {
    values.forEach(value => this.delete(value));
    return true;
  }
}
