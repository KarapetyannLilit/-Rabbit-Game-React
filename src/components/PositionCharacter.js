import { FREE_CELL, boardUi, boardSize } from './Main';


export const positionCharacter = (board, character, count) => {
    new Array(count).fill(character).forEach(character => positionSingleCharacter(board, character));
}

const positionSingleCharacter = (board, character) => {
    const [x, y] = getRandomFreeCoords(board);
    board[x][y] = character.id;
    character.position.push({ x: x, y: y });
    createUiElement(x, y, character);
}

const getRandomFreeCoords = (board) => {
    const [x, y] = [getRandomCoords(boardSize), getRandomCoords(boardSize)];
    if (board[x][y] === FREE_CELL) { return [x, y]; }
    return getRandomFreeCoords(board);
}

const getRandomCoords = (boardSize) => {
    return Math.floor(Math.random() * (boardSize - 1));
}

const createUiElement = (x, y, character) => {
    boardUi[x][y].classList.add(character.name);
}

const removeUiElement = (x, y, character) => {
    boardUi[x][y].classList.remove(character.name);
}