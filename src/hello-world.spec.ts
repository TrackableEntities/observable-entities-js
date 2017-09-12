import { HelloWorld } from './hello-world';

/**
 * HelloWorld test
 */
describe('HellWorld', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('HellWorld is instantiable', () => {
    expect(new HelloWorld()).toBeInstanceOf(HelloWorld);
  });

  describe('greet', () => {
    it('should return greeting with name', () => {
      const greeter = new HelloWorld();
      const greeting = greeter.greet('John');
      expect(greeting).toEqual('Hello John');
    });
  });
});
