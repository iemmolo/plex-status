import { Controls } from './controls.js';

export class Game {

    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ballRadius = 10;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.ballColour = '#0095DD';
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        this.potentialBallColours = [
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
        this.controls = new Controls();
        this.interval = 0;
    }

    startGame() {
        this.interval = setInterval(() => this.setupGame(), 10);
    }

    setupGame() {
        this.draw();
    }

    randomColour() {
        const random = Math.floor(Math.random() * this.potentialBallColours.length);
        return this.potentialBallColours[random];
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Horizontal collision detection (walls)
        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.ballColour = this.randomColour();
            this.dx = -this.dx;
        }

        // Vertical collision detection with paddle and ceiling
        if (this.y + this.dy < this.ballRadius) {
            // Top collision (ceiling)
            this.ballColour = this.randomColour();
            this.dy = -this.dy;
        }else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
            // Bottom collision (paddle or game over)
            if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                // Hit the paddle - bounce back
                this.ballColour = this.randomColour();
                this.dy = -this.dy;
            } else {
                // Missed the paddle - game over
                alert("GAME OVER");
                document.location.reload();
                clearInterval(this.interval);
            }
        }

        // Makes the ball go bounce
        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.ballColour = this.randomColour();
            this.dx = -this.dx;
        }
        if (this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.ballColour = this.randomColour();
            this.dy = -this.dy;
        }

        this.drawBall(this.ballColour);
        this.drawPaddle();

        // Use the controls to move the paddle
        if (this.controls.isRightPressed() && this.paddleX < this.canvas.width - this.paddleWidth) {
            this.paddleX += 7;
        } else if (this.controls.isLeftPressed() && this.paddleX > 0) {
            this.paddleX -= 7;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    drawBall(ballColour) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = ballColour;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

}