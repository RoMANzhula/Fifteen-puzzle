const SIZE = 4;
const EMPTY_TILE = 0;
const FRAME_WIDTH = 400;
const FRAME_HEIGHT = 400;

let tiles = [];
let buttons = [];
let puzzleContainer;

function initializeTiles() {
    tiles = [];
    for (let i = 1; i <= SIZE * SIZE - 1; i++) {
        tiles.push(i);
    }
    tiles.push(EMPTY_TILE);
    shuffleTiles();
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function initializeButtons() {
    buttons = [];
    for (let i = 0; i < tiles.length; i++) {
        const tileNumber = tiles[i];
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = tileNumber === EMPTY_TILE ? '' : tileNumber.toString();
        button.addEventListener('click', () => buttonClicked(i));
        buttons.push(button);
    }
}

function createPuzzle() {
    puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';

    for (const button of buttons) {
        puzzleContainer.appendChild(button);
    }
}

function buttonClicked(buttonIndex) {
    if (isAdjacentEmpty(buttonIndex)) {
        const emptyIndex = getEmptyIndex();
        swapTiles(buttonIndex, emptyIndex);
        updateButtonLabels();
        if (isGameWin()) {
            alert('Congratulations! You solved the puzzle.');
            resetGame();
        }
    }
}

function isAdjacentEmpty(buttonIndex) {
    const emptyIndex = getEmptyIndex();
    return (
        (buttonIndex === emptyIndex - 1 && emptyIndex % SIZE !== 0) ||
        (buttonIndex === emptyIndex + 1 && buttonIndex % SIZE !== 0) ||
        buttonIndex === emptyIndex - SIZE ||
        buttonIndex === emptyIndex + SIZE
    );
}

function getEmptyIndex() {
    return tiles.indexOf(EMPTY_TILE);
}

function swapTiles(index1, index2) {
    [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
}

function updateButtonLabels() {
    for (let i = 0; i < buttons.length; i++) {
        const tileNumber = tiles[i];
        buttons[i].textContent = tileNumber === EMPTY_TILE ? '' : tileNumber.toString();
    }
}

function isGameWin() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    initializeTiles();
    initializeButtons();
    createPuzzle();
}

function initialize() {
    initializeTiles();
    initializeButtons();
    createPuzzle();
}

initialize();