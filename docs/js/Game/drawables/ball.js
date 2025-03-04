export class Ball {

    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.radius = 10;
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 30;
        this.dx = 2;
        this.dy = -2;
        this.colour = '#0095DD';
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    setColour(colour) {
        this.colour = colour;
    }
}