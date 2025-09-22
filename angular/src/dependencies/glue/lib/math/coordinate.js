/**
 * @fileoverview A utility class for representing two-dimensional positions.
 */
/**
 * Class for representing coordinates and positions.
 */
class Coordinate {
  constructor(leftCoordinate = 0, topCoordinate = 0) {
    this.x = leftCoordinate;
    this.y = topCoordinate;
  }
  /**
   * Returns the difference between two coordinates as a new
   * Coordinate.
   */
  static difference(dimOne, dimTwo) {
    return new Coordinate(dimOne.x - dimTwo.x, dimOne.y - dimTwo.y);
  }
}
export {Coordinate};
