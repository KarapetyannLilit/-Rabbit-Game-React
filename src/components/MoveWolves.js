import { selectMinimumDistanceMove } from "./FindWay";
import { WOLF_CELL, FREE_CELL, WIN, MOVE } from "./Const";
import { gameOver } from "./GameState";

export const AttackRabbit = (wolfCoord, rabbitCoord, i, wolf, board, boardSize) => {
    const nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i, board, boardSize);
    moveWolf(wolfCoord, nextCoord, i, wolf, board);
    if (board[rabbitCoord[0]][rabbitCoord[1]] === WOLF_CELL) {
        // WIN = false;
        console.log(WIN);
        gameOver(WIN);
        MOVE = false;
    }
}

const moveWolf = (wolfCoord, nextCoord, i, wolf, board) => {
    board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
    [wolf.position[i].x, wolf.position[i].y] = nextCoord;
    board[wolf.position[i].x][wolf.position[i].y] = WOLF_CELL;
}
