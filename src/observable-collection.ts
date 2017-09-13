import { Subject } from 'rxjs/Subject';

import { INotifyInfo } from './notify-info';

export interface IObservableCollection<TEntity> {
  addListeners: Subject<INotifyInfo>[];
  removeListeners: Subject<INotifyInfo>[];
  [Symbol.iterator](): IterableIterator<TEntity> | IterableIterator<[any, TEntity]>;
}
