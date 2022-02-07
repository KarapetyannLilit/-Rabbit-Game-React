import { FREE_CELL, RABBIT_CELL, HOME_CELL, WOLF_CELL, FENCE_CELL } from "../components/Const"

export const CharacterBoard = (board) => {
    document.getElementById("buttons").style.display = "none";
    switch (board) {
        case RABBIT_CELL:
            return 'rabbit';
        case WOLF_CELL:
            return 'wolf';
        case FENCE_CELL:
            return "fence";
        case HOME_CELL:
            return 'home';
        default:
            return '';
    }

}

export const CreateUi = ({ board }) => {
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