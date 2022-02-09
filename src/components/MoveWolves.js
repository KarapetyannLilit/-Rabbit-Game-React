import { nextCoordOfWolf } from "./FindWay";
import { WOLF_CELL, FREE_CELL, WIN, MOVE } from "./Const";
import { gameOver } from "./GameState";

export const AttackRabbit = (wolfCoord, rabbitCoord, i, wolf, board, boardSize, forbiddenMoves) => {
    const nextCoord = nextCoordOfWolf(wolfCoord, rabbitCoord, board, forbiddenMoves);
    moveWolf(wolfCoord, nextCoord, i, wolf, board);
    if (board[rabbitCoord[0]][rabbitCoord[1]] === WOLF_CELL) {
        // WIN = false;
        gameOver(WIN);
        MOVE = false;
    }
}

const moveWolf = (wolfCoord, nextCoord, i, wolf, board) => {
    board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
    [wolf.position[i].x, wolf.position[i].y] = nextCoord;
    board[wolf.position[i].x][wolf.position[i].y] = WOLF_CELL;
}
