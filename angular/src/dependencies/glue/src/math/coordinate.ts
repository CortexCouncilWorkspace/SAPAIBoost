/**
 * @fileoverview A utility class for representing two-dimensional positions.
 */

/**
 * Class for representing coordinates and positions.
 */
class Coordinate {
  x: number;
  y: number;

  constructor(leftCoordinate = 0, topCoordinate = 0) {
    this.x = leftCoordinate;
    this.y = topCoordinate;
  }

  /**
   * Returns the difference between two coordinates as a new
   * Coordinate.
   */
  static difference(dimOne: Coordinate, dimTwo: Coordinate): Coordinate {
    return new Coordinate(dimOne.x - dimTwo.x, dimOne.y - dimTwo.y);
  }
}

export {Coordinate};
