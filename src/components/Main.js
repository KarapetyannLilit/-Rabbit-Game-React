import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { CreateUi } from "./CreateUi"
import { WOLF_CELL } from "./Const"

export default function Main() {
  const dispatch = useDispatch()
  const characters = useSelector((state) => state.characters)

  const startGame = (id) => {
    dispatch({ type: "CREATE_BOARD", id })
    dispatch({ type: "POSITION_CHARACTERS" })
  }

  useEffect(() => {
    document.addEventListener("keydown", reactOnKeyboard)
    return () => {
      window.removeEventListener("keydown", reactOnKeyboard)
    }
  }, [])

  useEffect(() => {
    if (!characters) return

    const { board, rabbit } = characters
    const rabbitPosition = rabbit.positions[0]

    if (rabbit.positions.length === 0) return

    if (board[rabbitPosition[0]][rabbitPosition[1]] === WOLF_CELL) {
      // dispatch('WIN')
      console.log("WIN")
    }
    console.log("....")
  }, characters.rabbit.positions)

  const reactOnKeyboard = (direction) => {
    dispatch({ type: "MOVE_CHARACTERS", direction })
  }

  const close = () => {
    window.location.reload()
  }

  return (
    <div>
      <h1>Rabbit Game</h1>
      <div id="rabbitGame">
        <div id="buttons">
          <button type="submit" onClick={() => startGame(5)}>
            5x5
          </button>
          <button type="submit" onClick={() => startGame(7)}>
            7x7
          </button>
          <button type="submit" onClick={() => startGame(10)}>
            10x10
          </button>
        </div>
        <div id="board">
          <CreateUi board={characters.board}></CreateUi>
        </div>
        <div id="myModal" className="modal">
          <span className="close" onClick={close}>
            &times;
          </span>
          <div className="modal-content"></div>
        </div>
      </div>
    </div>
  )
}
