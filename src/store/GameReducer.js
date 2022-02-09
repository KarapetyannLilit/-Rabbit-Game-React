import { PositionCharacter } from "../components/PositionCharacter";
import { FREE_CELL, RABBIT_CELL, HOME_CELL, WOLF_CELL, FENCE_CELL, WIN, MOVE } from "../components/Const"
import { ChangeRabbitPosiotion } from "../components/Event";
import { AttackRabbit } from "../components/MoveWolves"

const defaultState = {
    boardSize: 0,
    board: [],
    boardUi: [],
    gameOver: false,
    WINner: '',
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
        case 'CREATE_BOARD':
            state.boardSize = action.id;
            state.board = Array(state.boardSize).fill(0).map(row => new Array(state.boardSize).fill(FREE_CELL))

            return {
                ...state,
                boardSize: action.id,
                wolf: {
                    ...state.wolf,
                    count: Math.round(state.boardSize / 2),
                },
                stone: {
                    ...state.stone,
                    count: Math.round(state.boardSize / 2) - 1,
                },
                fence: {
                    ...state.fence,
                    count: Math.round(state.boardSize / 2) - 1,
                }
            }

        case 'POSITION_CHARACTERS':
            {
                PositionCharacter(state.board, state.rabbit, state.rabbit.count, state.boardSize)
                PositionCharacter(state.board, state.home, state.home.count, state.boardSize)
                PositionCharacter(state.board, state.wolf, state.wolf.count, state.boardSize)
                PositionCharacter(state.board, state.fence, state.fence.count, state.boardSize)
                PositionCharacter(state.board, state.stone, state.fence.count, state.boardSize)

                return {
                    ...state,
                }
            }
        case 'MOVE_CHARACTERS': {
            const direction = action.direction;
            ChangeRabbitPosiotion(direction, state.rabbit, state.board, state.boardSize);

            if (MOVE) {
                for (let i = 0; i < state.wolf.count; i++) {
                    const wolfCoord = Object.values(state.wolf.position[i]);
                    const rabbitCoord = Object.values(state.rabbit.position[0]);
                    AttackRabbit(wolfCoord, rabbitCoord, i,state.wolf, state.board, state.boardSize, state.wolf.forbiddenMoves);
                }
            }
        }

        default: return {
            ...state
        };
    }
}