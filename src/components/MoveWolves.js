import { selectMinimumDistanceMove } from "./FindWay";
import { WOLF_CELL, FREE_CELL, WIN, MOVE } from "./Const";
import { gameOver } from "./GameState";

export const AttackRabbit = (wolfCoord, rabbitCoord, i, wolf, board, boardUi, boardSize) => {
    const nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i, board, boardSize);
    moveWolf(wolfCoord, nextCoord, i, wolf, board, boardUi);
    if (boardUi[rabbitCoord[0]][rabbitCoord[1]].classList.contains("wolf")) {
        // WIN = false;
        console.log(WIN);
        gameOver(WIN);
        MOVE = false;
    }
}

const moveWolf = (wolfCoord, nextCoord, i, wolf, board, boardUi) => {
    board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
    [wolf.position[i].x, wolf.position[i].y] = nextCoord;
    board[wolf.position[i].x][wolf.position[i].y] = WOLF_CELL;
    removeUiElement(wolfCoord[0], wolfCoord[1], wolf, boardUi)
    createUiElement(nextCoord[0], nextCoord[1], wolf, boardUi)
}


const createUiElement = (x, y, character, boardUi) => {
    boardUi[x][y].classList.add(character.name);
}
const removeUiElement = (x, y, character, boardUi) => {
    boardUi[x][y].classList.remove(character.name);
}
