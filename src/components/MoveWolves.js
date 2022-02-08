import { nextCoordOfWolf } from "./FindWay"
import { WOLF_CELL, FREE_CELL, WIN, MOVE } from "./Const"
import { gameOver } from "./GameState"

const moveCharacter = (srcCoord, dstCoord, board) => {
  board[srcCoord[0]][srcCoord[1]] = FREE_CELL
  board[dstCoord[0]][dstCoord[1]] = WOLF_CELL
}

export const AttackRabbit = (rabbit, wolfPosition, board, forbiddenMoves) => {
  const nextCoord = nextCoordOfWolf(
    wolfPosition,
    rabbit.positions[0],
    board,
    forbiddenMoves
  )

  moveCharacter(wolfPosition, nextCoord, board)
  return nextCoord
}
