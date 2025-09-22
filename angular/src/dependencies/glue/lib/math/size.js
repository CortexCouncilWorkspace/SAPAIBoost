/**
 * @fileoverview A utility class for representing two-dimensional sizes.
 */
/**
 * Returns the sizes consisting of a width and height.
 */
class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  /**
   * Compares sizes for equality.
   * @return True if the sizes have equal widths and equal
   *     heights, or if both are null.
   */
  equals(a, b) {
    if (a === b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    return a.width === b.width && a.height === b.height;
  }
}
export {Size};
