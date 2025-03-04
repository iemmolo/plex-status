export class Paddle {

    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.height = 10;
        this.width = 75;
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - this.height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    moveRight(amount) {
        if (this.x < this.canvasWidth - this.width) {
            this.x += amount;
        }
    }

    moveLeft(amount) {
        if (this.x > 0) {
            this.x -= amount;
        }
    }
}