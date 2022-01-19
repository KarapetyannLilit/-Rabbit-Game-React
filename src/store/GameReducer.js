import { boardSize, characters } from "../components/Main";
import { positionCharacter } from "../components/PositionCharacter";
import { changeRabbitPosiotion } from "../components/Event";

const FREE_CELL = 0, RABBIT_CELL = 1, HOME_CELL = 2, WOLF_CELL = 1, FENCE_CELL = 4;
let board

const defaultState = {
    boardSize: 0,
    board: [],
    gameOver: false,
    winner: '',
    direction: ['left', 'right', 'up', 'down'],
    rabbit: {
        name: "rabbit",
        id: RABBIT_CELL,
        count: 1,
        position: [],
    },
    home: {
        name: "home",
        id: HOME_CELL,
        count: 1,
        position: []
    },
    wolf: {
        name: "wolf",
        id: WOLF_CELL,
        count: '',
        position: [],
        forbiddenMoves: [FENCE_CELL, WOLF_CELL, HOME_CELL],
    },
    fence: {
        name: "fence",
        id: FENCE_CELL,
        count: '',
        position: []
    },
    stone: {
        name: "stone",
        id: FENCE_CELL,
        count: '',
        position: []
    }
}



export const GameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'BOARD-SIZE': {
            return { ...state, boardSize: action.id }
        }
        case 'CREATE_BOARD':
            boardSize = action.id;
            board = Array(boardSize).fill(0).map(row => new Array(boardSize).fill(FREE_CELL))
            console.log(board);
            return {
                ...state,
                boardSize: action.id,
                wolf: {
                    ...state.wolf,
                    count: Math.round(boardSize / 2),
                },
                stone: {
                    ...state.stone,
                    count: Math.round(boardSize / 2) - 1,
                },
                fence: {
                    ...state.fence,
                    count: Math.round(boardSize / 2) - 1,
                }
            }

        case 'POSITION_CHARACTERS':
            positionCharacter(state.board, characters.rabbit, state.rabbit.count)
            positionCharacter(state.board, state.home, state.house.count)
            positionCharacter(state.board, state.wolf, state.wolf.count)
            positionCharacter(state.board, state.fence, state.fence.count)
            positionCharacter(state.board, state.stone, state.fence.count)
            return {
                ...state,
            }
        case 'RABBIT_MOVE':
           let [newRabbitX, newRabbitY] = changeRabbitPosiotion(state.direction)
            return {
                ...state,
                rabbit:{
                    ...state.rabbit,
                    position: [newRabbitX, newRabbitY]
                }
            }
        // case 'ATTACK_RABBIT'

        
    }
}