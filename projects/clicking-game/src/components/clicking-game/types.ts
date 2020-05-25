export class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  bounciness: number;

  constructor(x: number, y: number, radius: number, dx = 0, dy = 0, bounciness = 0.8) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.bounciness = bounciness;
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    canvas.fill();
    canvas.stroke();
  }
}
