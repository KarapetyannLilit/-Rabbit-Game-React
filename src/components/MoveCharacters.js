// import { characters, move, board, FREE_CELL,x,y,boardUi ,win,WOLF_CELL} from "./Main";
// import { selectMinimumDistanceMove } from './FindWay';
// import { gameOver,createUiElement,removeUiElement } from "./CreateUi";



// export const moveRabbit = (newRabbitX, newRabbitY) => {
//     move = true;
//     if (board[newRabbitX][newRabbitY] === FREE_CELL || board[newRabbitX][newRabbitY] === characters.home.id) {
//         board[x][y] = FREE_CELL;
//         removeUiElement(x, y, characters.rabbit);
//         if (boardUi[newRabbitX][newRabbitY].classList.contains(characters.home.name)) {
//             win = true;
//             gameOver(x, y, win);
//             move = false;
//             return;
//         }
//         createUiElement(newRabbitX, newRabbitY, characters.rabbit)
//         x = newRabbitX; y = newRabbitY;
//         characters.rabbit.position = [{ x, y }];
//     }
// }

// export const attackRabbit = (wolfCoord, rabbitCoord, i) => {
//     const nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i);
//     moveWolf(wolfCoord, nextCoord, i);
// }

// export const moveWolf = (wolfCoord, nextCoord, i) => {
//     board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
//     [characters.wolf.position[i].x, characters.wolf.position[i].y] = nextCoord;
//     board[characters.wolf.position[i].x][characters.wolf.position[i].y] = WOLF_CELL;
//     removeUiElement(wolfCoord[0], wolfCoord[1], characters.wolf)
//     createUiElement(nextCoord[0], nextCoord[1], characters.wolf)
//     if (boardUi[x][y].classList.contains(characters.wolf.name)) {
//         win = false;
//         gameOver(x, y, win);
//         move = false;
//     }
// }
