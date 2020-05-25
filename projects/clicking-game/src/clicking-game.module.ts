import { NgModule } from '@angular/core';
import { ClickingGameComponent } from './components/clicking-game/clicking-game.component';

@NgModule({
  declarations: [ClickingGameComponent],
  exports: [ClickingGameComponent]
})
export class ClickingGameModule { }

export { ClickingGameComponent };
