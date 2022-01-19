import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectMinimumDistanceMove } from './FindWay';
import { gameOver, createUiElement, removeUiElement, createUi, close } from './CreateUi';
import BoardUi from './BoardUi';

export let board = new Array(), boardUi = new Array();
export let boardSize, wolfCount, fenceCount, x, y, nextPos;
export let win = false, move = true, characters;
export const FREE_CELL=0 , WOLF_CELL = 1;




export default function Main() {
    const dispatch = useDispatch();
    const characters = useSelector(state => state.character);

    const startGame = (id) => {
        dispatch({ type: 'BOARD-SIZE', id: id });
        dispatch({ type: 'CREATE_BOARD', id: id });
        dispatch({ type: 'POSITION_CHARACTERS' });
    }

    useEffect(() => {
        document.addEventListener("keydown", reactOnKeyboard);
        return () => {
            window.removeEventListener("keydown", reactOnKeyboard);
        };
    }, [])

    const reactOnKeyboard = (direction) => {
       let [x,y] =  dispatch({ type: 'RABBIT_MOVE', position: [x, y] })
        moveRabbit()
        if (move) {
            Array(characters.wolf.count).fill().forEach((_, i) => {
                const wolfCoord = Object.values(characters.wolf.position[i]);
                const rabbitCoord = Object.values(characters.rabbit.position[0]);
                attackRabbit(wolfCoord, rabbitCoord, i);
            });
        }
    }

    const moveRabbit = (newRabbitX, newRabbitY) => {
        move = true;
        if (board[newRabbitX][newRabbitY] === FREE_CELL || board[newRabbitX][newRabbitY] === characters.home.id) {
            board[x][y] = FREE_CELL;
            // removeUiElement(x, y, characters.rabbit);
            if (boardUi[newRabbitX][newRabbitY].classList.contains(characters.home.name)) {
                win = true;
                gameOver(x, y, win);
                move = false;
                return;
            }
            // createUiElement(newRabbitX, newRabbitY, characters.rabbit)
            x = newRabbitX; y = newRabbitY;
            characters.rabbit.position = [{ x, y }];
        }
    }

    const attackRabbit = (wolfCoord, rabbitCoord, i) => {
        const nextCoord = selectMinimumDistanceMove(wolfCoord, rabbitCoord, i, FREE_CELL, board, boardSize);
        moveWolf(wolfCoord, nextCoord, i);
    }

    const moveWolf = (wolfCoord, nextCoord, i) => {
        board[wolfCoord[0]][wolfCoord[1]] = FREE_CELL;
        [characters.wolf.position[i].x, characters.wolf.position[i].y] = nextCoord;
        board[characters.wolf.position[i].x][characters.wolf.position[i].y] = WOLF_CELL;
        // removeUiElement(wolfCoord[0], wolfCoord[1], characters.wolf)
        // createUiElement(nextCoord[0], nextCoord[1], characters.wolf)
        if (boardUi[x][y].classList.contains(characters.wolf.name)) {
            win = false;
            gameOver(x, y, win);
            move = false;
        }
    }

    return (
        <div>
            <h1>Rabbit Game</h1>
            <div id="rabbitGame">
                <div id="buttons">
                    <button type="submit" onClick={() => startGame(5)} >5x5</button>
                    <button type="submit" onClick={() => startGame(7)} >7x7</button>
                    <button type="submit" onClick={() => startGame(10)} >10x10</button>
                </div>
                    <BoardUi></BoardUi>
                <div id="myModal" className="modal">
                    <span className="close" onClick={close}>&times;</span>
                    <div className="modal-content">
                    </div>
                </div>
            </div>
        </div>
    );
}
