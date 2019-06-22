import { Subject } from 'rxjs';

import { INotifyInfo } from './notify-info';

/**
 * Represents a collection that is observable.
 *
 * @export
 * @interface IObservableCollection
 * @template TEntity
 */
export interface IObservableCollection<TEntity> {
  /**
   * Observers of added entities.
   *
   * @type {Subject<INotifyInfo>[]}
   * @memberof IObservableCollection
   */
  addListeners: Subject<INotifyInfo>[];
  /**
   * Observers of removed entities.
   *
   * @type {Subject<INotifyInfo>[]}
   * @memberof IObservableCollection
   */
  removeListeners: Subject<INotifyInfo>[];
  /**
   * Iterator for the observable collection.
   *
   * @returns {(IterableIterator<TEntity> | IterableIterator<[any, TEntity]>)}
   * @memberof IObservableCollection
   */
  [Symbol.iterator](): IterableIterator<TEntity> | IterableIterator<[any, TEntity]>;
}
