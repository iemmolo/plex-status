export class Bricks {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.columnCount = 5;
        this.rowCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 20;
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
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;

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

                // Only draw active bricks
                if (brick.active) {
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "#0095DD";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
}