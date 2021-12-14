import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
let board = new Array(), boardUi = new Array(), boardFind = new Array();
let boardSize, wolfCount, fenceCount, x, y, nextPos;
let win = false, move = true;

export default function Main() {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.characters);

    function startGame(e) {
        createEmptyBoard(e)
        positionPlayers()
        dispatch({ type: "character", name: Object.keys(characters).name, id: Object.keys(characters).id, count: Object.keys(characters).count, position: Object.keys(characters).position })
        document.onkeydown = reactOnKeyboard;
    }

    function createEmptyBoard(e) {
        boardSize = e.target.id;
        wolfCount = fenceCount = boardSize / 2;
        characters.wolf.count = characters.fence.count = characters.stone.count = fenceCount;
        document.getElementById("buttons").style.display = "none";
        for (let i = 0; i < boardSize; i++) {
            board[i] = new Array();
            boardUi[i] = document.createElement('tr');
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = 0;
                boardUi[i][j] = document.createElement('td');
                boardUi[i].appendChild(boardUi[i][j]);
            }
            document.getElementById('board').appendChild(boardUi[i]);
        }
        dispatch({ type: "character", name: Object.keys(characters).name, id: Object.keys(characters).id, count: boardSize / 2, position: Object.keys(characters).position })
    }

    function positionPlayers() {
        positionCharacter(board, characters.rabbit, 1)
        positionCharacter(board, characters.home, 1)
        positionCharacter(board, characters.wolf, wolfCount)
        positionCharacter(board, characters.fence, fenceCount)
        positionCharacter(board, characters.stone, fenceCount)
    }

    function positionCharacter(board, character, count) {
        for (let i = 0; i < count; i++) {
            positionSingleCharacter(board, character);
        }
    }

    function positionSingleCharacter(board, character) {
        const [x, y] = getRandomFreeCoords(board);
        board[x][y] = character.id;
        boardUi[x][y].classList.add(character.name);
        character.position.push({ x: x, y: y });
    }

    function getRandomFreeCoords(board) {
        const [x, y] = [getRandomCoords(boardSize), getRandomCoords(boardSize)];
        if (board[x][y] === 0) {
            return [x, y];
        }
        return getRandomFreeCoords(board);
    }

    function getRandomCoords(boardSize) {
        let rand = Math.floor(Math.random() * (boardSize - 1));
        return rand;
    }

    function reactOnKeyboard(direction) {
        changeRabbitPosiotion(direction)
        if (move) {
            for (let i = 0; i < wolfCount; i++) {
                let wolfCoord = Object.values(characters.wolf.position[i]);
                let rabbitCoord = Object.values(characters.rabbit.position[0]);
                attackRabbit(wolfCoord, rabbitCoord, i);
            }
        }
        dispatch({ type: "character", name: Object.keys(characters).name, id: Object.keys(characters).id, count: Object.keys(characters).count, position: Object.keys(characters).position })
    }

    function changeRabbitPosiotion(direction) {
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

    function moveRabbit(newRabbitX, newRabbitY) {
        move = true;
        if (board[newRabbitX][newRabbitY] === 0 || board[newRabbitX][newRabbitY] === characters.home.id) {
            board[x][y] = 0;
            boardUi[x][y].classList.remove(characters.rabbit.name);
            if (boardUi[newRabbitX][newRabbitY].classList.contains(characters.home.name)) {
                win = true;
                gameOver(x, y, win);
                move = false;
                return;
            }
            boardUi[newRabbitX][newRabbitY].classList.add(characters.rabbit.name);
            x = newRabbitX; y = newRabbitY;
            characters.rabbit.position = [{ x, y }];
        }
    }

    function attackRabbit(wolfCoord, rabbitCoord, i) {
        let nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i);
        moveWolf(wolfCoord, nextCoord, i);
    }

    function selectMinimumDistanceMove(position, end, j) {
        for (let i = 0; i < boardSize; i++) {
            boardFind[i] = [];
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] != 0) {
                    boardFind[i][j] = 1;
                } else {
                    boardFind[i][j] = 0;
                }
            }
        }
        let visited = [];
        boardFind[position[0]][position[1]] = 1;
        visited.push([position]);
        let path;
        while (visited.length > 0) {
            path = visited.shift();
            let coord = path[path.length - 1];
            let direcTo = [
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

    function moveWolf(wolfCoord, nextCoord, i) {
        board[wolfCoord[0]][wolfCoord[1]] = 0;
        boardUi[wolfCoord[0]][wolfCoord[1]].classList.remove(characters.wolf.name);
        [characters.wolf.position[i].x, characters.wolf.position[i].y] = nextCoord;
        board[characters.wolf.position[i].x][characters.wolf.position[i].y] = 1;
        boardUi[characters.wolf.position[i].x][characters.wolf.position[i].y].classList.add(characters.wolf.name);
        if (boardUi[x][y].classList.contains(characters.wolf.name)) {
            win = false;
            gameOver(x, y, win);
            move = false;
        }
    }

    function gameOver(x, y, win) {
        boardUi[x][y].classList.remove(characters.rabbit.name);
        document.onkeydown = null;
        document.getElementById("myModal").style.display = "block";
        if (win) {
            document.querySelector(".modal-content").innerHTML = "You Won!";
        } else {
            document.querySelector(".modal-content").innerHTML = "You Lose!";
        }
    }

    function close() {
        window.location.reload();
    }

    return (
        <div>
            <h1>Rabbit Game</h1>
            <div id="rabbitGame">
                <div id="buttons">
                    <button type="submit" onClick={startGame} id={"5"}>5x5</button>
                    <button type="submit" onClick={startGame} id={"7"}>7x7</button>
                    <button type="submit" onClick={startGame} id={"10"}>10x10</button>
                </div>
                <div id="board">
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
