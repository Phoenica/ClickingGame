import { Component } from '@angular/core';
import { ClickingGameConfiguration } from '@click-engine/clicking-game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameBoardConfiguration: ClickingGameConfiguration = {
    canvasWidth: 500,
    canvasHeight: 500
  };
}
