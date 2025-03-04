export class Controls {
    constructor() {
        this.rightPressed = false;
        this.leftPressed = false;

		document.addEventListener("keydown", (e) => this.keyDownHandler(e), false);
        document.addEventListener("keyup", (e) => this.keyUpHandler(e), false);
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    isRightPressed() {
        return this.rightPressed;
    }

    isLeftPressed() {
        return this.leftPressed;
    }
}