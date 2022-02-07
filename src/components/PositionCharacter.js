import { FREE_CELL } from "../components/Const";

export const PositionCharacter = (board, character, count, boardUi, boardSize) => {
    new Array(count).fill(character).forEach(character => positionSingleCharacter(board, character, boardUi, boardSize));
}

const positionSingleCharacter = (board, character, boardUi, boardSize) => {
    const [x, y] = getRandomFreeCoords(board, boardSize);
    board[x][y] = character.id;
    character.position.push({ x: x, y: y });
    createUiElement(x, y, character, boardUi);
}

const getRandomFreeCoords = (board, boardSize) => {
    const [x, y] = [getRandomCoords(boardSize), getRandomCoords(boardSize)];
    if (board[x][y] === FREE_CELL) { return [x, y]; }
    return getRandomFreeCoords(board, boardSize);
}

const getRandomCoords = (boardSize) => {
    return Math.floor(Math.random() * (boardSize - 1));
}
const createUiElement = (x, y, character, boardUi) => {
    boardUi[x][y].classList.add(character.name);
}