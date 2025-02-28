import { Drawer } from './drawer.js';

export class GameEngine {

    constructor() {
        this.draw = new Drawer(this);
        this.interval = 0;
    }

    startGame() {
        this.interval = setInterval(() => this.setupGame(), 10);
    }

    setupGame() {
        this.draw.draw();
    }

    gameOver() {
        alert("Bummer");
        document.location.reload();
        clearInterval(this.interval);
    }

}