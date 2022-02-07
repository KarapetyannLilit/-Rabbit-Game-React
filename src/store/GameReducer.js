// import { boardSize, characters } from "../components/Main";
import { PositionCharacter } from "../components/PositionCharacter";
import { FREE_CELL, RABBIT_CELL, HOME_CELL, WOLF_CELL, FENCE_CELL, WIN, MOVE } from "../components/Const"
import { ChangeRabbitPosiotion } from "../components/Event";
import { AttackRabbit } from "../components/MoveWolves"
import { CreateUi } from "../components/CreateUi";

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
            // size = action.size;
            state.boardSize = action.id;
            document.getElementById("buttons").style.display = "none";
            state.board = Array(state.boardSize).fill(0).map(row => new Array(state.boardSize).fill(FREE_CELL))
            CreateUi(state.board,state.boardSize)
            // boardUi = Array(boardSize).fill(document.createElement('tr')).map(row => new Array(boardSize).fill(document.createElement('td')))
            for (let i = 0; i < state.boardSize; i++) {
                state.boardUi[i] = document.createElement('tr');
                for (let j = 0; j < state.boardSize; j++) {
                    state.boardUi[i][j] = document.createElement('td');
                    state.boardUi[i].appendChild(state.boardUi[i][j]);
                }
                document.getElementById('board').appendChild(state.boardUi[i]);
            }



            // CreateUi(state.board, state.boardSize)

            // boardSize = action.id;
            // board = Array(boardSize).fill(0).map(row => new Array(boardSize).fill(FREE_CELL))
            // console.log(board);
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
                PositionCharacter(state.board, state.rabbit, state.rabbit.count, state.boardUi, state.boardSize)
                PositionCharacter(state.board, state.home, state.home.count, state.boardUi, state.boardSize)
                PositionCharacter(state.board, state.wolf, state.wolf.count, state.boardUi, state.boardSize)
                PositionCharacter(state.board, state.fence, state.fence.count, state.boardUi, state.boardSize)
                PositionCharacter(state.board, state.stone, state.fence.count, state.boardUi, state.boardSize)

                return {
                    ...state,
                }
            }
        case 'MOVE_CHARACTERS': {
            const direction = action.direction;
            ChangeRabbitPosiotion(direction, state.rabbit, state.board, state.boardUi, state.boardSize);

            if (MOVE) {
                for (let i = 0; i < state.wolf.count; i++) {
                    const wolfCoord = Object.values(state.wolf.position[i]);
                    console.log(state.wolf.position[i]);
                    const rabbitCoord = Object.values(state.rabbit.position[0]);
                    AttackRabbit(wolfCoord, rabbitCoord, i,state.wolf, state.board, state.boardUi, state.boardSize);
                }
            }
        }
        //    let [newRabbitX, newRabbitY] = changeRabbitPosiotion(state.direction)
        //     return {
        //         ...state,
        //         rabbit:{
        //             ...state.rabbit,
        //             position: [newRabbitX, newRabbitY]
        //         }
        //     }
        // case 'ATTACK_RABBIT'

        default: return {
            ...state
        };
    }
}