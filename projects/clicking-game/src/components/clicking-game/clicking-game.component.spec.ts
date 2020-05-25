import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickingGameConfiguration } from '@click-engine/clicking-game';

import { ClickingGameComponent } from './clicking-game.component';
import { Ball } from './types';

describe('ClickingGameComponent', () => {
  let component: ClickingGameComponent;
  let fixture: ComponentFixture<ClickingGameComponent>;

  const mockGameBoardConfiguration: ClickingGameConfiguration = {
    canvasWidth: 500,
    canvasHeight: 500,
    groundFriction: 0.01,
    gravityStrength: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickingGameComponent);
    component = fixture.componentInstance;
    component.gameBoardConfiguration = mockGameBoardConfiguration;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate addGravityEffect correctly', () => {
    const ball = new Ball(100, 100, 3, 0, 0);
    component.calculateGravityEffect([ball]);
    expect(ball.dy).toBe(1);
  });

  it('should calculate addGravityEffect correctly', () => {
    const ball = new Ball(100, 100, 3, 0, 0);
    component.calculateGravityEffect([ball]);
    expect(ball.dy).toBe(1);
  });

  it('should calculate motion correctly', () => {
    const ball = new Ball(100, 100, 3, -50, 50);
    component.calculateMotion([ball]);
    expect(ball.y).toBe(150);
    expect(ball.x).toBe(50);
  });

  it('should resolve wall collisions correctly', () => {
    const ball = new Ball(500, 500, 1, 1, 1,  1);
    component.resolveWallCollisions([ball]);
    expect(ball.dy).toBe(-1);
  });
});
