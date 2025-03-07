export class Bricks {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.columnCount = 5;
        this.rowCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 70;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;

        // Initialize brick grid once in constructor
        this.brickGrid = [];
        this.setUpBricks();
    }

    setUpBricks() {
        for (let c = 0; c < this.columnCount; c++) {
            this.brickGrid[c] = [];
            for (let r = 0; r < this.rowCount; r++) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
            const brickY = r * (this.brickHeight + this.brickPadding + 10) + this.brickOffsetTop + 10;

                this.brickGrid[c][r] = {
                    x: brickX,
                    y: brickY,
                    active: true
                };
            }
        }
    }

    draw() {
        for (let c = 0; c < this.columnCount; c++) {
            for (let r = 0; r < this.rowCount; r++) {
                const brick = this.brickGrid[c][r];

                if (brick.active) {
                    // Draw headboard
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y - 10, this.brickWidth, 10);
                    this.ctx.fillStyle = "#8B4513"; // Brown for wooden headboard
                    this.ctx.fill();
                    this.ctx.strokeStyle = "#5D2906"; // Darker brown for outline
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();

                    // Add decorative detail to headboard
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x + 5, brick.y - 8, this.brickWidth - 10, 6);
                    this.ctx.strokeStyle = "#5D2906";
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();

                    // Draw bed frame (rectangle)
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "#8B4513"; // Brown for wooden bed frame
                    this.ctx.fill();
                    this.ctx.strokeStyle = "#5D2906"; // Darker brown for outline
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();

                    // Draw mattress (slightly smaller)
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x + 3, brick.y + 3, this.brickWidth - 6, this.brickHeight - 6);
                    this.ctx.fillStyle = "#F5F5DC"; // Beige for mattress
                    this.ctx.fill();

                    // Draw pillow
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x + 5, brick.y + 5, 20, 10);
                    this.ctx.fillStyle = "#FFFFFF"; // White for pillow
                    this.ctx.fill();
                    this.ctx.strokeStyle = "#DDDDDD"; // Light gray outline
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();

                    // Draw blanket
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x + 30, brick.y + 5, this.brickWidth - 35, 10);
                    this.ctx.fillStyle = "#77AADD"; // Light blue for blanket
                    this.ctx.fill();

                    // Draw bed legs
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x + 5, brick.y + this.brickHeight, 5, 5);
                    this.ctx.rect(brick.x + this.brickWidth - 10, brick.y + this.brickHeight, 5, 5);
                    this.ctx.fillStyle = "#8B4513"; // Brown for legs
                    this.ctx.fill();
                }
            }
        }
    }
}