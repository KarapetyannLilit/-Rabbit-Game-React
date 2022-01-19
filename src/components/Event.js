import { nextPos, boardSize, move, x, y } from "./Main";
import moveRabbit from './Main';
import { useDispatch, useSelector } from 'react-redux';


export const changeRabbitPosiotion = (direction) => {
    let x, y;
    // const characters = useSelector(state => state.character);
    // [{ x, y }] = characters.rabbit.position;
    let newRabbitX = x, newRabbitY = y, nextPos;
    switch (direction.code) {
        case "ArrowLeft":
            newRabbitY = y > 0 ? y - 1 : nextPos = boardSize - 1;
            return [x, newRabbitY]
            // moveRabbit(x, newRabbitY);
            break;
        case "ArrowRight":
            newRabbitY = y < boardSize - 1 ? y + 1 : nextPos = 0;
            return [x, newRabbitY]

            // moveRabbit(x, newRabbitY);
            break;
        case "ArrowUp":
            newRabbitX = x > 0 ? x - 1 : nextPos = boardSize - 1;
            return [newRabbitX, y]
            // moveRabbit(newRabbitX, y);
            break;
        case "ArrowDown":
            newRabbitX = x < boardSize - 1 ? x + 1 : nextPos = 0;
            return [newRabbitX, y]
            // moveRabbit(newRabbitX, y);
            break;
        default: move = false;
            break;
    }
}
