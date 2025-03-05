import { Controls } from './controls.js';
import { Ball } from './drawables/ball.js';
import { Paddle } from './drawables/paddle.js';
import { Bricks } from './drawables/bricks.js';

export class Drawer {
    constructor(gameRef) {
        this.gameRef = gameRef;
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.bricks = new Bricks(this.ctx, this.canvas.width, this.canvas.height);
        this.paddle = new Paddle(this.ctx, this.canvas.width, this.canvas.height);
        this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height, this);
        this.controls = new Controls();

        this.potentialColours = [
            '#0095DD', // Blue
            '#C0C7C8', // Windows 98 button gray
            '#000000', // Black
            '#FFFFFF', // White
            '#DF0000', // Red
            '#008080', // Teal (classic Windows 98 default)
            '#000080', // Navy blue (used for selections)
            '#DFDFDF', // Light gray (UI element)
            '#808080', // Medium gray
            '#00A800', // Windows 98 green
            '#FFFF00', // Yellow
            '#A85400', // Brown
            '#FF00FF', // Magenta
            '#00FFFF', // Cyan
            '#7F7F7F', // Dark gray
            '#D4D0C8'  // Windows 98 dialog background
        ];
    }

    randomColour() {
        const random = Math.floor(Math.random() * this.potentialColours.length);
        return this.potentialColours[random];
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Ball collision with walls (horizontal)
        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
            this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.setColour(this.randomColour());
            this.ball.dx = -this.ball.dx;
            this.ball.accelerate(1.05);
        }

        // Ball collision with ceiling or paddle
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            // Top collision (ceiling)
            this.ball.setColour(this.randomColour());
            this.ball.dy = -this.ball.dy;
            this.ball.accelerate(1.05);
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            // Bottom collision (paddle or game over)
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                // Advanced paddle collision with angle
                const relativeIntersectX = (this.ball.x - (this.paddle.x + this.paddle.width/2)) / (this.paddle.width/2);
                const angle = relativeIntersectX * Math.PI/3;

                const speed = Math.sqrt(this.ball.dx * this.ball.dx + this.ball.dy * this.ball.dy);
                this.ball.dx = speed * Math.sin(angle);
                this.ball.dy = -speed * Math.cos(angle);

                this.ball.setColour(this.randomColour());
                this.ball.accelerate(1.05);
            } else {
                // Missed the paddle - game over
                this.gameRef.gameOver();
                return;
            }
        }

        // Handle paddle movement based on controls
        if (this.controls.isRightPressed()) {
            this.paddle.moveRight(7);
        } else if (this.controls.isLeftPressed()) {
            this.paddle.moveLeft(7);
        }

        // Check for brick collisions
        this.ball.collisionDetection();

        // Move the ball
        this.ball.move();

        // Draw everything
        this.ball.draw();
        this.paddle.draw();
        this.bricks.draw();
    }
}