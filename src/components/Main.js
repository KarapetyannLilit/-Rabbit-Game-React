import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
let board = new Array(), boardUi = new Array(), boardFind = new Array();
let boardSize, wolfCount, fenceCount, x, y, nextPos;
let win = false, move = true;
const FREE_CELL = 0, WOLF_CELL = 1;

export default function Main() {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.characters);
    
    const startGame = (size) => {
        createEmptyBoard(size)
        positionPlayers()
        dispatch({
            type: "character",
            name: Object.keys(characters).name,
            id: Object.keys(characters).id,
            count: Object.keys(characters).count,
            position: Object.keys(characters).position
        })
        document.onkeydown = reactOnKeyboard;
    }

    const createEmptyBoard = (size) => {
        boardSize = size;
        wolfCount = fenceCount = Math.round(boardSize / 2);
        characters.wolf.count = characters.fence.count = characters.stone.count = fenceCount;
        document.getElementById("buttons").style.display = "none";
        board = Array(boardSize).fill(0).map(row => new Array(boardSize).fill(FREE_CELL))
        // boardUi = Array(boardSize).fill(document.createElement('tr')).map(row => new Array(boardSize).fill(document.createElement('td')))
        for (let i = 0; i < boardSize; i++) {
            boardUi[i] = document.createElement('tr');
            for (let j = 0; j < boardSize; j++) {
                boardUi[i][j] = document.createElement('td');
                boardUi[i].appendChild(boardUi[i][j]);
            }
            document.getElementById('board').appendChild(boardUi[i]);
        }
        dispatch({ type: "character", name: Object.keys(characters).name, id: Object.keys(characters).id, count: boardSize / 2, position: Object.keys(characters).position })
    }

    const positionPlayers = () => {
        positionCharacter(board, characters.rabbit, 1)
        positionCharacter(board, characters.home, 1)
        positionCharacter(board, characters.wolf, wolfCount)
        positionCharacter(board, characters.fence, fenceCount)
        positionCharacter(board, characters.stone, fenceCount)
    }

    const positionCharacter = (board, character, count) => {
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

    const reactOnKeyboard = (direction) => {
        changeRabbitPosiotion(direction)
        if (move) {
            for (let i = 0; i < wolfCount; i++) {
                const wolfCoord = Object.values(characters.wolf.position[i]);
                const rabbitCoord = Object.values(characters.rabbit.position[0]);
                attackRabbit(wolfCoord, rabbitCoord, i);
            }
            // let i;
            // new Array(wolfCount).fill(characters.wolf.position[i]).forEach((element) => {
            //     const wolfCoord = Object.values(characters.wolf.position[i]);
            //     const rabbitCoord = Object.values(characters.rabbit.position[0]);
            //     attackRabbit(wolfCoord, rabbitCoord, i);
            //   })
        }
        dispatch({ type: "character", name: Object.keys(characters).name, id: Object.keys(characters).id, count: Object.keys(characters).count, position: Object.keys(characters).position })
    }

    const changeRabbitPosiotion = (direction) => {
        [{ x, y }] = characters.rabbit.position;
        let newRabbitX = x, newRabbitY = y;
        switch (direction.code) {
            case "ArrowLeft":
                newRabbitY = y > 0 ? y - 1 : nextPos = boardSize - 1;
                moveRabbit(x, newRabbitY);
                break;
            case "ArrowRight":
                newRabbitY = y < boardSize - 1 ? y + 1 : nextPos = 0;
                moveRabbit(x, newRabbitY);
                break;
            case "ArrowUp":
                newRabbitX = x > 0 ? x - 1 : nextPos = boardSize - 1;
                moveRabbit(newRabbitX, y);
                break;
            case "ArrowDown":
                newRabbitX = x < boardSize - 1 ? x + 1 : nextPos = 0;
                moveRabbit(newRabbitX, y);
                break;
            default: move = false;
                break;
        }
    }

    const moveRabbit = (newRabbitX, newRabbitY) => {
        move = true;
        if (board[newRabbitX][newRabbitY] === FREE_CELL || board[newRabbitX][newRabbitY] === characters.home.id) {
            board[x][y] = FREE_CELL;
            removeUiElement(x, y, characters.rabbit);
            if (boardUi[newRabbitX][newRabbitY].classList.contains(characters.home.name)) {
                win = true;
                gameOver(x, y, win);
                move = false;
                return;
            }
            createUiElement(newRabbitX, newRabbitY, characters.rabbit)
            x = newRabbitX; y = newRabbitY;
            characters.rabbit.position = [{ x, y }];
        }
    }

    const attackRabbit = (wolfCoord, rabbitCoord, i) => {
        const nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i);
        moveWolf(wolfCoord, nextCoord, i);
    }

    const getAllPossibleLegalDirections = () => {
        for (let i = 0; i < boardSize; i++) {
            boardFind[i] = [];
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] != 0) {
                    boardFind[i][j] = 1;
                } else {
                    boardFind[i][j] = FREE_CELL;
                }
            }
        }
    }

    const selectMinimumDistanceMove = (position, end, j) => {
        getAllPossibleLegalDirections();
        const visited = [];
        boardFind[position[0]][position[1]] = 1;
        visited.push([position]);
        let path;
        while (visited.length > 0) {
            path = visited.shift();
            const coord = path[path.length - 1];
            const direcTo = [
                [coord[0] + 1, coord[1]], [coord[0], coord[1] + 1],
                [coord[0] - 1, coord[1]], [coord[0], coord[1] - 1]
            ];
            for (let i = 0; i < direcTo.length; i++) {
                if (direcTo[i][0] == end[0] && direcTo[i][1] == end[1]) {
                    path.concat([end]);
                    if (path.length > 1) {
                        return path[1];
                    } else {
                        return end;
                    }
                }
                if (direcTo[i][0] < 0 || direcTo[i][0] >= boardFind.length
                    || direcTo[i][1] < 0 || direcTo[i][1] >= boardFind[0].length
                    || boardFind[direcTo[i][0]][direcTo[i][1]] != 0) {
                    continue;
                }
                boardFind[direcTo[i][0]][direcTo[i][1]] = 1;
                visited.push(path.concat([direcTo[i]]));
            }
        }
        return path[0];
    }

    const moveWolf = (wolfCoord, nextCoord, i) => {
        board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
        [characters.wolf.position[i].x, characters.wolf.position[i].y] = nextCoord;
        board[characters.wolf.position[i].x][characters.wolf.position[i].y] = WOLF_CELL;
        removeUiElement(wolfCoord[0], wolfCoord[1], characters.wolf)
        createUiElement(nextCoord[0], nextCoord[1], characters.wolf)
        if (boardUi[x][y].classList.contains(characters.wolf.name)) {
            win = false;
            gameOver(x, y, win);
            move = false;
        }
    }

    const gameOver = (x, y, win) => {
        document.onkeydown = null;
        document.getElementById("myModal").style.display = "block";
        if (win) {
            document.querySelector(".modal-content").innerHTML = "You Won!";
        } else {
            document.querySelector(".modal-content").innerHTML = "You Lose!";
        }
    }

    const close = () => {
        window.location.reload();
    }

    const createUiElement = (x, y, character) => {
        boardUi[x][y].classList.add(character.name);
    }

    const removeUiElement = (x, y, character) => {
        boardUi[x][y].classList.remove(character.name);
    }

    const tr = new Array();
    return (
        <div>
            <h1>Rabbit Game</h1>
            <div id="rabbitGame">
                <div id="buttons">
                    <button type="submit" onClick={() => startGame(5)} >5x5</button>
                    <button type="submit" onClick={() => startGame(7)} >7x7</button>
                    <button type="submit" onClick={() => startGame(10)} >10x10</button>
                </div>
                <div id="board">
                    {/* {
                        boardUi.map((boardSize) => (
                            <tr key={tr}>
                                {
                                    boardUi.map((boardSize) => (
                                        <td id='td' key={tr}>
                                            {
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    } */}
                </div>
                <div id="myModal" className="modal">
                    <span className="close" onClick={close}>&times;</span>
                    <div className="modal-content">
                    </div>
                </div>
            </div>
        </div>
    );
}
