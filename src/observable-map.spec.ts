import { Subject } from 'rxjs';

import { Product } from './models/product.spec';
import { INotifyInfo } from './notify-info';
import { ObservableMap } from './observable-map';

describe('ObservableMap', () => {

  let foodMap: ObservableMap<string, Product>;

  beforeEach(() => {
    foodMap = new ObservableMap<string, Product>();
    const entries: [string, Product][] = [
      ['Bacon', new Product(1, 'Bacon', 1)],
      ['Lettuce', new Product(2, 'Lettuce', 2)],
      ['Tomatoes', new Product(3, 'Tomatoes', 3)],
    ];
    foodMap.addRange(...entries);
  });

  it('should contain items', () => {
    expect(foodMap.size).toBe(3);
  });

  it('should notify added', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food = new Product(4, 'Carrots', 4);
    const added: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => added.push(notifyInfo));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.add(food.productName, food);

    // Assert
    expect(added.length).toEqual(1);
    expect(added[0].key).toBe('Carrots');
    expect(added[0].currentValue).toBe(food);
    done();
  });

  it('should notify multiple added', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food1 = new Product(4, 'Carrots', 4);
    const food2 = new Product(5, 'Peas', 5);
    const added: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => added.push(notifyInfo));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.addRange([food1.productName, food1], [food2.productName, food2]);

    // Assert
    expect(added.length).toEqual(2);
    expect(added[0].key).toBe('Carrots');
    expect(added[0].currentValue).toBe(food1);
    expect(added[1].key).toBe('Peas');
    expect(added[1].currentValue).toBe(food2);
    done();
  });

  it('should notify removed', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food = foodMap.get('Bacon');
    const removed: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => removed.push(notifyInfo));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.delete(food.productName);

    // Assert
    expect(removed.length).toEqual(1);
    expect(removed[0].key).toBe(food.productName);
    expect(removed[0].currentValue).toBe(food);
    done();
  });

  it('should notify multiple removed', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food1 = foodMap.get('Bacon');
    const food2 = foodMap.get('Lettuce');
    const removed: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => removed.push(notifyInfo));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.deleteRange(food1.productName, food2.productName);

    // Assert
    expect(removed.length).toEqual(2);
    expect(removed[0].key).toBe(food1.productName);
    expect(removed[0].currentValue).toBe(food1);
    expect(removed[1].key).toBe(food2.productName);
    expect(removed[1].currentValue).toBe(food2);
    done();
  });
});
