import { Plex } from './Plex/plex.js';
import { GameEngine } from './Game/game-engine.js';

// Initialise when the page loads
document.addEventListener('DOMContentLoaded', () => {
	// Handle Plex
    const plex = new Plex();
    plex.loadData();

	document.getElementById("runButton").addEventListener("click", function() {
        const game = new GameEngine();
        game.startGame();
        this.disabled = true;
    });



});