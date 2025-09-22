/**
 * @fileoverview A utility class for representing two-dimensional sizes.
 */

interface Size {
  width: number;
  height: number;
}

/**
 * Returns the sizes consisting of a width and height.
 */
class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * Compares sizes for equality.
   * @return True if the sizes have equal widths and equal
   *     heights, or if both are null.
   */
  equals(a: Size, b: Size): boolean {
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
