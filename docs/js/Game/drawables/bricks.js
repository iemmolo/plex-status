export class Bricks {

    constructor(ctx, canvasWidth, canvasHeight) {
        this.brickRowCount = 3;
        this.brickColumnCount = 5;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;

        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.radius = 10;
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 30;
        this.dx = 2;
        this.dy = -2;
        this.colour = '#0095DD';
        this.bricks = [];

    }

    setUpBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0 };
            }
        }
    }

    draw() {
        this.setUpBricks();
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                this.bricks[c][r].x = brickX;
                this.bricks[c][r].y = brickY;
                this.ctx.beginPath();
                this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                this.ctx.fillStyle = "#0095DD";
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}