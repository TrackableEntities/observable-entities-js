import { ItalianHelloWorld } from './italian-hello-world';

/**
 * ItalianHelloWorld test
 */
describe('HellWorld', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('HellWorld is instantiable', () => {
    expect(new ItalianHelloWorld()).toBeInstanceOf(ItalianHelloWorld);
  });

  describe('greet', () => {
    it('should return greeting with name', () => {
      const greeter = new ItalianHelloWorld();
      const greeting = greeter.greet('John');
      expect(greeting).toEqual('Ciao John');
    });
  });
});
