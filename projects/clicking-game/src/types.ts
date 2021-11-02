/**
 * Configuration for clicking game.
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
   *  How much resistance object will face, while sliding on ground. 0 - no resistance, 1 - object will be instantly stopped.
   */
  groundFriction?: number;
  /**
   *  How much speed ball is losing bouncing against the wall. 0 - no speed lost, 1 - 100% energy lost.
   */
  bounciness?: number;
}

