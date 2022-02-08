import {
  FREE_CELL,
  RABBIT_CELL,
  HOME_CELL,
  WIN,
  MOVE,
} from "../components/Const"
import { gameOver } from "./GameState"

const moveRabbit = (src, dst, rabbit, board) => {
  const [x, y] = src
  const [newX, newY] = dst

  if (board[newX][newY] === HOME_CELL || board[newX][newY] === FREE_CELL) {
    if (board[newX][newY] === HOME_CELL) {
      gameOver(WIN)
    }

    rabbit.positions = [[newX, newY]]

    board[x][y] = FREE_CELL
    board[newX][newY] = RABBIT_CELL
  }
}

export const ChangeRabbitPosiotion = (direction, rabbit, board, boardSize) => {
  const [x, y] = rabbit.positions[0]
  let newX = x,
    newY = y

  switch (direction.code) {
    case "ArrowLeft":
      newY = y > 0 ? y - 1 : boardSize - 1
      break
    case "ArrowRight":
      newY = y < boardSize - 1 ? y + 1 : 0
      break
    case "ArrowUp":
      newX = x > 0 ? x - 1 : boardSize - 1
      break
    case "ArrowDown":
      newX = x < boardSize - 1 ? x + 1 : 0
      break
    default:
      break
  }

  moveRabbit([x, y], [newX, newY], rabbit, board)
}
