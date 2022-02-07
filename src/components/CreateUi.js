import { FREE_CELL, RABBIT_CELL, HOME_CELL, WOLF_CELL, FENCE_CELL } from "../components/Const"


export const CharacterBoard = (board, i, j) => {
    // for (let i = 0; i < boardSize; i++) {
    //     for (let j = 0; j < boardSize; j++) {
    //         // Array(boardSize).fill(<tr></tr>).map(row => new Array(state.boardSize).fill(<td className={characterBoard()}></td>))

    //         switch (board[i][j]) {
    //             case WOLF_CELL:
    //                 return 'wolf';
    //             case FENCE_CELL:
    //                 return "fence";
    //             case HOME_CELL:
    //                 return 'home';
    //             case RABBIT_CELL:
    //                 return 'rabbit';
    //             default:
    //                 return '';
    //         }
    //     }
    // }

    switch (board[i][j]) {
        case WOLF_CELL:
            return 'wolf';
        case FENCE_CELL:
            return "fence";
        case HOME_CELL:
            return 'home';
        case RABBIT_CELL:
            return 'rabbit';
        default:
            return '';
    }
}

export const CreateUi = (board, boardSize) => {
    return (
        <div id="board" >
            {/* 
            {Array(boardSize).fill(<tr></tr>).forEach((_, i) => {
                board[i] = new Array(boardSize);
                Array(boardSize).fill(<td className={CharacterBoard(board, i,j)}></td>).forEach((_, j) => {
                });
            })} */}

            {board.map((i) => (
                <tr key={i}>
                    {
                        board.map((j) => (
                            <td id='td' className={CharacterBoard(board, i, j)} key={j}>
                                {
                                }
                            </td>
                        ))
                    }
                </tr>
            ))
            }
        </div>

    );
}
