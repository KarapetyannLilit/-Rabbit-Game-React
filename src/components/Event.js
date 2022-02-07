import { FREE_CELL, HOME_CELL, WIN, MOVE } from "../components/Const";
import { gameOver } from "./GameState";

const createUiElement = (x, y, character, boardUi) => {
    boardUi[x][y].classList.add(character.name);
}
const removeUiElement = (x, y, character, boardUi) => {
    boardUi[x][y].classList.remove(character.name);
}

const moveRabbit = (newRabbitX, newRabbitY, rabbit, board, boardUi) => {
    // MOVE = true;
    if (board[newRabbitX][newRabbitY] === FREE_CELL || board[newRabbitX][newRabbitY] === HOME_CELL) {
        board[x][y] = FREE_CELL;
        removeUiElement(x, y, rabbit, boardUi);
        if (boardUi[newRabbitX][newRabbitY].classList.contains("home")) {
            WIN = true;
            gameOver(WIN);
            MOVE = false;
            return;
        }
        createUiElement(newRabbitX, newRabbitY, rabbit, boardUi)
        x = newRabbitX; y = newRabbitY;
        rabbit.position = [{ x, y }];
    }
}

let x, y, nextPos;
export const ChangeRabbitPosiotion = (direction, rabbit, board, boardUi, boardSize) => {
    [{ x, y }] = rabbit.position;
    let newRabbitX = x, newRabbitY = y;
    switch (direction.code) {
        case "ArrowLeft":
            newRabbitY = y > 0 ? y - 1 : nextPos = boardSize - 1;
            moveRabbit(x, newRabbitY, rabbit, board, boardUi);
            break;
        case "ArrowRight":
            newRabbitY = y < boardSize - 1 ? y + 1 : nextPos = 0;
            moveRabbit(x, newRabbitY, rabbit, board, boardUi);
            break;
        case "ArrowUp":
            newRabbitX = x > 0 ? x - 1 : nextPos = boardSize - 1;
            moveRabbit(newRabbitX, y, rabbit, board, boardUi);
            break;
        case "ArrowDown":
            newRabbitX = x < boardSize - 1 ? x + 1 : nextPos = 0;
            moveRabbit(newRabbitX, y, rabbit, board, boardUi);
            break;
        default: MOVE = false;
            break;
    }
}

