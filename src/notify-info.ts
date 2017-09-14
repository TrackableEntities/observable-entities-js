/**
 * Represents information related to updated entities.
 *
 * @export
 * @interface INotifyInfo
 */
export interface INotifyInfo {
  /**
   * Property name or entity key.
   *
   * @type {*}
   * @memberof INotifyInfo
   */
  key?: any;
  /**
   * Original value of property or entity.
   *
   * @type {*}
   * @memberof INotifyInfo
   */
  origValue?: any;
  /**
   * Current value of property or entity.
   *
   * @type {*}
   * @memberof INotifyInfo
   */
  currentValue?: any;
}
