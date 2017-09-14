# observable-entities-js

Base classes that notify observers when properties are updated and objects are added or removed objects from collections.

[![Build Status](https://travis-ci.org/TrackableEntities/observable-entities-js.svg?branch=master)](https://travis-ci.org/TrackableEntities/observable-entities)
[![npm version](https://badge.fury.io/js/observable-entities.svg)](https://badge.fury.io/js/observable-entities)

Docs: <https://trackableentities.github.io/observable-entities-js>

Sample application: <https://github.com/TrackableEntities/observable-entities-js-sample>

## Setup

Install **observable-entities** as a runtime dependency from npm.

```
npm i --save observable-entities
```

## Usage

To observe property changes on an object, create a class that extends `ObservableEntity`. Then add a `constructor` that returns `super.proxify(this)`.  For example:

```js
export class Product extends ObservableEntity {
  productId: number;
  productName: string;
  unitPrice: number;

  constructor() {
    super();
    return super.proxify(this);
  }
}
```

`ObservableEntity` as a `modifyListeners` property of type `Subject<INotifyInfo>[]`.  To listen for property changes, add a listener can call `subscribe` on it.  For example, an Angular component can perform observable-based data binding with an `OnPush` strategy.

```js
// Trigger binding when item is updated
this.modifyListener = new Subject<INotifyInfo>();
this.modifyListener.subscribe(info => {
  this.cd.markForCheck();
});

// Add listener to each product
this.products.forEach(product => {
  product.modifyListeners.push(this.modifyListener);
});
```

Similarly, `ObservableSet` and `ObservableMap` have `addListeners` and `removeListeners` properties, and you can add listeners to trigger data binding when items are added or removed.

```js
// Trigger data binding when item is added
this.addListener = new Subject<INotifyInfo>();
this.addListener.subscribe(info => {
  this.cd.markForCheck();
});

// Add listenter to products
this.products.addListeners.push(this.addListener);
```
