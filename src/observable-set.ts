import { Subject } from 'rxjs/Subject';

import { INotifyInfo } from './notify-info';
import { IObservableCollection } from './observable-collection';

export class ObservableSet<TEntity> extends Set<TEntity> implements IObservableCollection<TEntity> {

  private _addListeners: Subject<INotifyInfo>[] = [];
  private _removeListeners: Subject<INotifyInfo>[] = [];

  constructor(...items: TEntity[]) {
    super(items);
  }

  get addListeners(): Subject<INotifyInfo>[] {
    return this._addListeners;
  }

  get removeListeners(): Subject<INotifyInfo>[] {
    return this._removeListeners;
  }

  addRange(...values: TEntity[]): this {
    values.forEach(value => this.add(value));
    return this;
  }

  add(value: TEntity): this {
    super.add(value);
    if (this._addListeners) {
      const notifyInfo: INotifyInfo = { currentValue: value };
      this._addListeners.forEach(listener => listener.next(notifyInfo));
    }
    return this;
  }

  delete(value: TEntity): boolean {
    if (this._removeListeners) {
      const notifyInfo: INotifyInfo = { currentValue: value };
      this._removeListeners.forEach(listener => listener.next(notifyInfo));
    }
    return super.delete(value);
  }

  deleteRange(...values: TEntity[]): boolean {
    values.forEach(value => this.delete(value));
    return true;
  }
}
