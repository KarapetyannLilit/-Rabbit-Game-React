import { FREE_CELL } from "../components/Const";

export const PositionCharacter = (board, character, count, boardSize) => {
    new Array(count).fill(character).forEach(character => positionSingleCharacter(board, character, boardSize));
}

const positionSingleCharacter = (board, character, boardSize) => {
    const [x, y] = getRandomFreeCoords(board, boardSize);
    board[x][y] = character.id;
    character.position.push({ x: x, y: y });
}

const getRandomFreeCoords = (board, boardSize) => {
    const [x, y] = [getRandomCoords(boardSize), getRandomCoords(boardSize)];
    if (board[x][y] === FREE_CELL) { return [x, y]; }
    return getRandomFreeCoords(board, boardSize);
}

const getRandomCoords = (boardSize) => {
    return Math.floor(Math.random() * (boardSize - 1));
}