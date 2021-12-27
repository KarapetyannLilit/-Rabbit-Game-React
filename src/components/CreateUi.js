
import { board, boardUi, boardSize,characters } from './Main';

// const createEmptyBoard = (size) => {
//     boardSize = size;
//     document.getElementById("buttons").style.display = "none";
//     for (let i = 0; i < boardSize; i++) {
//         boardUi[i] = document.createElement('tr');
//         for (let j = 0; j < boardSize; j++) {
//             boardUi[i][j] = document.createElement('td');
//             boardUi[i].appendChild(boardUi[i][j]);
//         }
//         document.getElementById('board').appendChild(boardUi[i]);
//     }
// }

export const gameOver = (x, y, win) => {
    document.onkeydown = null;
    document.getElementById("myModal").style.display = "block";
    if (win) {
        document.querySelector(".modal-content").innerHTML = "You Won!";
    } else {
        document.querySelector(".modal-content").innerHTML = "You Lose!";
    }
}

export const close = () => {
    window.location.reload();
}

export const createUiElement = (x, y, character) => {
    boardUi[x][y].classList.add(character.name);
}

export const removeUiElement = (x, y, character) => {
    boardUi[x][y].classList.remove(character.name);
}

export const createUi = () => {
    // board = Array(boardSize).fill(0).map(row => new Array(boardSize).fill(FREE_CELL))


    // return new Array(board.length).fill(characters.name).forEach(character => positionSingleCharacter(boardUi, character));
    // // return board

    let el;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            // debugger
            if (board[i][j] === characters.wolf.id) {
                el = characters.wolf.name;
                // break;
            }
            if (board[i][j] === characters.fence.id) {
                el = characters.fence.name;
                // break;
            }
            if (board[i][j] === characters.home.id) {
                el = characters.home.name;
                // break;
            }
            if (board[i][j] === characters.rabbit.id) {
                el = characters.rabbit.name;

            }
            // return el;
            // switch (board[i][j]) {
            //     case characters.wolf.id:
            //         console.log("hp");
            //         return 'wolf';
            //         break;
            //     case characters.fence.id:
            //         return "fence";
            //         break;
            //     case characters.home.id:
            //         return 'home';
            //         break;
            //     case characters.rabbit.id:
            //         return 'rabbit';
            //         break;
            //     default :
            //         return;
            //         break;
            // }
        }
        return el;
    }
}