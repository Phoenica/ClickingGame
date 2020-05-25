/**
 * Configuration for clicking game..
 */
export interface ClickingGameConfiguration {
  /**
   *  Width of canvas game board.
   */
  canvasWidth: number;
  /**
   *  Height of canvas game board.
   */
  canvasHeight: number;
  /**
   *  How hard gravity will pull objects to the ground.
   */
  gravityStrength?: number;
  /**
   *  How much resistance object will face, while sliding on ground. 0 - no resistance, 1 - object will be instantly.
   */
  groundFriction?: number;
}

