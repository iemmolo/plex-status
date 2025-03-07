export class Ball {
    constructor(ctx, canvasWidth, canvasHeight, drawerRef) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.drawerRef = drawerRef;
        this.radius = 10;
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 30;
        this.dx = 2;
        this.dy = -2;
        this.colour = '#0095DD';
        this.maxSpeed = 12;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius - 2, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    setColour(colour) {
        this.colour = colour;
    }

    accelerate(factor) {
        this.dx *= factor;
        this.dy *= factor;

        if (Math.abs(this.dx) > this.maxSpeed) {
            this.dx = this.maxSpeed * Math.sign(this.dx);
        }
        if (Math.abs(this.dy) > this.maxSpeed) {
            this.dy = this.maxSpeed * Math.sign(this.dy);
        }
    }

    collisionDetection() {
        const bricks = this.drawerRef.bricks;

        for (let c = 0; c < bricks.columnCount; c++) {
            for (let r = 0; r < bricks.rowCount; r++) {
                const brick = bricks.brickGrid[c][r];

                if (brick.active) {
                    // Calculate the closest point on the brick to the center of the ball
                    const closestX = Math.max(brick.x, Math.min(this.x, brick.x + bricks.brickWidth));
                    const closestY = Math.max(brick.y, Math.min(this.y, brick.y + bricks.brickHeight));

                    // Calculate the distance between the closest point and the center of the ball
                    const distanceX = this.x - closestX;
                    const distanceY = this.y - closestY;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    // If the distance is less than the radius, collision occurred
                    if (distance < this.radius) {
                        // Determine which side was hit by checking which distance is greater
                        if (Math.abs(distanceX) > Math.abs(distanceY)) {
                            // Hit was on the left or right side
                            this.dx = -this.dx;
                        } else {
                            // Hit was on the top or bottom
                            this.dy = -this.dy;
                        }

                        brick.active = false;
                        this.setColour(this.drawerRef.randomColour());
                        this.accelerate(1.05);

                        // Break early to avoid multiple collisions in same frame
                        return;
                    }
                }
            }
        }
    }
}