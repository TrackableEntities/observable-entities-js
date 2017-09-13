import { Subject } from 'rxjs/Subject';

import { Product } from './models/product.spec';
import { INotifyInfo } from './notify-info';
import { ObservableEntity } from './observable-entity';

describe('Observable Entity', () => {

  it('ctor should return proxy', () => {
    const food = new Product(1, 'Carrots', 4);
    expect(food.modifyListeners).toBeTruthy();
  });

  it('factory should return proxy', () => {
    const food = ObservableEntity.proxify(Product);
    expect(food.modifyListeners).toBeTruthy();
  });

  it('should notify property changed', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const props: INotifyInfo[] = [];
    const food = new Product(1, 'Carrots', 4);
    listener.subscribe(prop => props.push(prop));
    food.modifyListeners.push(listener);

    // Act
    food.productName = 'Peas';
    food.unitPrice = 5;

    // Assert
    expect(props.length).toEqual(2);
    expect(props[0].key).toEqual('productName');
    expect(props[1].key).toEqual('unitPrice');
    done();
  });
});
