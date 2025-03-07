export class Paddle {

    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.height = 15;
        this.width = 75;
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - this.height;
    }

    draw() {
        // Draw bed frame
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#A0522D"; // Sienna for wooden bed frame
        this.ctx.fill();
        this.ctx.strokeStyle = "#6B3100"; // Darker brown for outline
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw mattress
        this.ctx.beginPath();
        this.ctx.rect(this.x + 2, this.y - 3, this.width - 4, this.height - 2);
        this.ctx.fillStyle = "#F5F5DC"; // Beige for mattress
        this.ctx.fill();

        // Draw pillow
        this.ctx.beginPath();
        this.ctx.rect(this.x + 5, this.y - 2, 20, 8);
        this.ctx.fillStyle = "#FFFFFF"; // White for pillow
        this.ctx.fill();

        // Draw blanket
        this.ctx.beginPath();
        this.ctx.rect(this.x + 30, this.y - 2, this.width - 35, 8);
        this.ctx.fillStyle = "#FF6347"; // Tomato red for blanket (different from bricks)
        this.ctx.fill();

        // Draw bed legs
        this.ctx.beginPath();
        this.ctx.rect(this.x + 5, this.y + this.height, 5, 5);
        this.ctx.rect(this.x + this.width - 10, this.y + this.height, 5, 5);
        this.ctx.fillStyle = "#8B4513"; // Brown for legs
        this.ctx.fill();
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