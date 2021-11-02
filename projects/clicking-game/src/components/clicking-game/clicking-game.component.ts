import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { defaultGameBoardConfiguration } from '../../project-lib';
import { ClickingGameConfiguration } from '../../types';
import { Ball } from './types';



@Component({
  selector: 'ce-clicking-game',
  templateUrl: './clicking-game.component.html',
  styleUrls: ['./clicking-game.component.scss']
})
export class ClickingGameComponent implements AfterViewInit, OnChanges {
  @Input() gameBoardConfiguration: ClickingGameConfiguration;

  @ViewChild('gameBoard') canvas: ElementRef<HTMLCanvasElement>;

  balls: Ball[] = [];
  config: ClickingGameConfiguration;

  ngAfterViewInit(): void {
    if (!this.canvas) {
      return;
    }

    this.updateGameConfig();

    this.canvas.nativeElement.width = this.config.canvasWidth;
    this.canvas.nativeElement.height = this.config.canvasHeight;

    this.updateRender();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('gameBoardConfiguration' in changes) {
      this.updateGameConfig();
    }
  }

  updateGameConfig() {
    this.config = {...defaultGameBoardConfiguration, ...this.gameBoardConfiguration};
  }

  onClick($event: MouseEvent) {
    const newBall = new Ball(
        $event.x,
        $event.y,
        5,
        20 * (Math.random() - 0.5),
        -10 * (Math.random()));

    this.balls = [...this.balls, newBall];
  }

  calculateGravityEffect(balls: Ball[]) {
    balls.forEach(ball => {
      if(this.config.bounciness !== 1 || ball.y + ball.radius !== this.config.canvasHeight) {
        ball.dy += this.config.gravityStrength;
      }
    });
  }

  calculateMotion(balls: Ball[]) {
    balls.forEach(ball => {
      ball.x += ball.dx;
      ball.y += ball.dy;
    });
  }

  resolveWallCollisions(balls: Ball[]) {
    const maxWidth = this.config.canvasWidth;
    const maxHeight = this.config.canvasHeight;
    const friction = this.config.groundFriction;
    balls.forEach(ball => {
      ball.x = (ball.x - ball.radius < 0) ? ball.radius : ball.x;
      ball.x = (ball.x + ball.radius > maxWidth) ? maxWidth - ball.radius : ball.x;
      ball.y = (ball.y - ball.radius < 0) ? ball.radius : ball.y;
      ball.y = (ball.y + ball.radius > maxHeight) ? maxHeight - ball.radius : ball.y;

      ball.dy = (ball.y === ball.radius || ball.y === maxHeight - ball.radius) ? -this.config.bounciness * ball.dy : ball.dy;
      ball.dx = (ball.x === ball.radius || ball.x === maxWidth - ball.radius) ? -this.config.bounciness * ball.dx : ball.dx;

      ball.dx = (ball.y === maxHeight - ball.radius) ? ball.dx * (1 - friction) : ball.dx;
    });
  }

  updateRender() {
    const canvasContext = this.canvas.nativeElement.getContext('2d');

    canvasContext.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
    this.resolveWallCollisions(this.balls);
    this.calculateGravityEffect(this.balls);
    this.calculateMotion(this.balls);

    this.balls.forEach(ball => ball.draw(canvasContext));

    requestAnimationFrame(this.updateRender.bind(this));
  }
}


