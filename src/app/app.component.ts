import { Component } from '@angular/core';
import { ClickingGameConfiguration } from '@click-engine/clicking-game';
import { defaultGameBoardConfiguration } from '../../projects/clicking-game/src/project-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gameBoardConfiguration: ClickingGameConfiguration;

  constructor() {
    this.resetSettings();
  }

  onFrictionChange($event: Event) {
    this.gameBoardConfiguration = {
      ...this.gameBoardConfiguration,
      groundFriction: $event.target['value'] / 1000
    }
  }

  onGravityChange($event: Event) {
    this.gameBoardConfiguration = {
      ...this.gameBoardConfiguration,
      gravityStrength: $event.target['value'] / 100
    }
  }

  onBouncinessChange($event: Event) {
    this.gameBoardConfiguration = {
      ...this.gameBoardConfiguration,
      bounciness: $event.target['value'] / 100
    }
  }

  resetSettings() {
    this.gameBoardConfiguration = {
      ...defaultGameBoardConfiguration,
      canvasWidth: 500,
      canvasHeight: 500,
    };
  }
}
