import { Plex } from './Plex/plex.js';
import { Game } from './Game/game.js';

// Initialise when the page loads
document.addEventListener('DOMContentLoaded', () => {
	// Handle Plex
    const plex = new Plex();
    plex.loadData();

	// Handle Game


	document.getElementById("runButton").addEventListener("click", function() {
        const game = new Game();
        game.startGame();
        this.disabled = true;
    });



});