import { FREE_CELL, RABBIT_CELL, HOME_CELL, WOLF_CELL, FENCE_CELL } from "../components/Const"
import { DefaultState } from "../store/GameReducer";

export const CharacterBoard = (board) => {
    switch (board) {
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

export const CreateUi = ({ board }) => {
    console.log(board);
    return (
        <div id="board" >
            {board.map((_, i) => (
                <tr key={i}>
                    {
                        board.map((_, j) => (
                            <td id='td' className={CharacterBoard(board[i][j])} key={j}>
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