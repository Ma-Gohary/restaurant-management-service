const EMPTY_STR_LENGTH = 0;

/**
 * Collection of utility functions for string
 */
class StringUtils {
  /**
   * Check if a given string is empty
   *
   * @param {string} str
   * @return {boolean} Returns true if the given string
   * is empty i.e. length is 0
   */
  static isEmpty(str: string): boolean {
    return !(str?.trim().length > EMPTY_STR_LENGTH);
  }

  /**
   * Check if a given string is blank
   *
   * @param {string} str
   * @return {boolean} Returns true if the given string
   * is empty or contains only white space code points, otherwise false.
   */
  static isBlank(str: string): boolean {
    return !(str?.length > EMPTY_STR_LENGTH);
  }

  /**
   * Format a decimal string to number
   *
   * @param {string} numberStr
   * @return {number}
   */
  static formatDecimal(numberStr: string): number {
    return Number(numberStr);
  }
}

export default StringUtils;
