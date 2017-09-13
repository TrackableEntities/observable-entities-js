import { Subject } from 'rxjs/Subject';

import { INotifyInfo } from './notify-info';
import { IObservableCollection } from './observable-collection';

export class ObservableMap<TKey, TEntity> extends Map<TKey, TEntity> implements IObservableCollection<[TKey, TEntity]> {

  private _addListeners: Subject<INotifyInfo>[] = [];
  private _removeListeners: Subject<INotifyInfo>[] = [];

  constructor(...entries: [TKey, TEntity][]) {
    super(entries);
  }

  get addListeners(): Subject<INotifyInfo>[] {
    return this._addListeners;
  }

  get removeListeners(): Subject<INotifyInfo>[] {
    return this._removeListeners;
  }

  addRange(...entries: [TKey, TEntity][]): this {
    entries.forEach((entry) => this.add(entry[0], entry[1]));
    return this;
  }

  add(key: TKey, value: TEntity): this {
    super.set(key, value);
    if (this._addListeners) {
      const notifyInfo: INotifyInfo = { key: key, currentValue: value };
      this._addListeners.forEach(listener => listener.next(notifyInfo));
    }
    return this;
  }

  delete(key: TKey): boolean {
    const value = super.get(key);
    if (this._removeListeners) {
      const notifyInfo: INotifyInfo = { key: key, currentValue: value };
      this._removeListeners.forEach(listener => listener.next(notifyInfo));
    }
    return super.delete(key);
  }

  deleteRange(...keys: TKey[]): boolean {
    keys.forEach(key => this.delete(key));
    return true;
  }
}
