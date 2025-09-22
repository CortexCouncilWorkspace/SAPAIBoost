/**
 * @fileoverview A utility class for representing a numeric box.
 * This is lifted from closure goog.math.box function. This has been
 * moved to Glue to remove closure dependency.
 * https://github.com/google/closure-library/blob/master/closure/goog/math/box.js
 */
import {Coordinate} from './coordinate';
/**
 * Class for representing a box.
 */
class Box {
  constructor(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
  /**
   * Returns whether the box contains a coordinate or another box.
   */
  contains(other) {
    return Box.contains(this, other);
  }
  /**
   * Returns whether a box contains a coordinate or another box.
   */
  static contains(box, other) {
    if (!box || !other) {
      return false;
    }
    if (other instanceof Box) {
      return (
          other.left >= box.left && other.right <= box.right &&
          other.top >= box.top && other.bottom <= box.bottom);
    }
    // other is a Coordinate.
    return (
        other.x >= box.left && other.x <= box.right && other.y >= box.top &&
        other.y <= box.bottom);
  }
  /**
   * Returns whether two boxes intersect.
   */
  static intersects(a, b) {
    return (
        a.left <= b.right && b.left <= a.right && a.top <= b.bottom &&
        b.top <= a.bottom);
  }
  /**
   * Returns the distance between a coordinate and the nearest corner/side of a
   * box. Returns zero if the coordinate is inside the box.
   */
  static distance(box, coord) {
    const x = Box.relativePositionX(box, coord);
    const y = Box.relativePositionY(box, coord);
    return Math.sqrt(x * x + y * y);
  }
  /**
   * Returns the distance between a coordinate and the nearest corner/side of a
   * box. Returns zero if the coordinate is inside the box.
   */
  distance(coord) {
    return Box.distance(this, coord);
  }
  /**
   * Returns the relative x position of a coordinate compared to a box.  Returns
   * zero if the coordinate is inside the box.
   */
  static relativePositionX(box, coord) {
    if (coord.x < box.left) {
      return coord.x - box.left;
    } else if (coord.x > box.right) {
      return coord.x - box.right;
    }
    return 0;
  }
  /**
   * Returns the relative x position of a coordinate compared to a box.  Returns
   * zero if the coordinate is inside the box.
   */
  relativePositionX(coord) {
    return Box.relativePositionX(this, coord);
  }
  /**
   * Returns the relative y position of a coordinate compared to a box.  Returns
   * zero if the coordinate is inside the box.
   */
  static relativePositionY(box, coord) {
    if (coord.y < box.top) {
      return coord.y - box.top;
    } else if (coord.y > box.bottom) {
      return coord.y - box.bottom;
    }
    return 0;
  }
  /**
   * Returns the relative y position of a coordinate compared to a box.  Returns
   * zero if the coordinate is inside the box.
   */
  relativePositionY(coord) {
    return Box.relativePositionY(this, coord);
  }
  /**
   * Translates this box by the given offsets. If a `Coordinate`
   * is given, then the left and right values are translated by the coordinate's
   * x value and the top and bottom values are translated by the coordinate's y
   * value.  Otherwise, `tx` and `ty` are used to translate the x
   * and y dimension values.
   * @param tx The value to translate the x
   *     dimension values by or the coordinate to translate this box by.
   * @param ty The value to translate y dimension values by.
   * @return This box after translating.
   */
  translate(tx, ty) {
    if (tx instanceof Coordinate) {
      this.left += tx.x;
      this.right += tx.x;
      this.top += tx.y;
      this.bottom += tx.y;
    } else {
      if (isNaN(tx)) {
        throw new Error(`Expected number but got ${typeof tx}`);
      }
      this.left += tx;
      this.right += tx;
      if (ty !== undefined) {
        this.top += ty;
        this.bottom += ty;
      }
    }
    return this;
  }
  /**
   * Scales this coordinate by the given scale factors.
   * @param sx The scale factor to use for the x dimension - or both dimensions
   *           if sy is omitted.
   * @param sy The scale factor to use for the y dimension.
   * @return This box after scaling.
   */
  scale(sx, sy) {
    const sxy = sy === undefined ? sx : sy;
    this.left *= sx;
    this.right *= sx;
    this.top *= sxy;
    this.bottom *= sxy;
    return this;
  }
  /**
   * Expand this box to include another box.
   * @param box The box to include in this one.
   */
  expandToInclude(box) {
    this.left = Math.min(this.left, box.left);
    this.top = Math.min(this.top, box.top);
    this.right = Math.max(this.right, box.right);
    this.bottom = Math.max(this.bottom, box.bottom);
  }
  /**
   * Expands box with the given margins.
   * @param top Top margin or box with all margins.
   * @param right Right margin.
   * @param bottom Bottom margin.
   * @param left Left margin.
   * @return A reference to this Box.
   */
  expand(top, right, bottom, left) {
    if (typeof top !== 'number') {
      this.top -= top.top;
      this.right += top.right;
      this.bottom += top.bottom;
      this.left -= top.left;
    } else {
      this.top -= top;
      this.right += Number(right);
      this.bottom += Number(bottom);
      this.left -= Number(left);
    }
    return this;
  }
}
export {Box};
