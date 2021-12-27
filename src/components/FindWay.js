import { FREE_CELL, board, boardSize } from './Main';

let boardFind = new Array();
const getAllPossibleLegalDirections = () => {
    for (let i = 0; i < boardSize; i++) {
        boardFind[i] = [];
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] != 0) {
                boardFind[i][j] = 1;
            } else {
                boardFind[i][j] = FREE_CELL;
            }
        }
    }
}

export const selectMinimumDistanceMove = (position, end, j) => {
    getAllPossibleLegalDirections();
    const visited = [];
    boardFind[position[0]][position[1]] = 1;
    visited.push([position]);
    let path;
    while (visited.length > 0) {
        path = visited.shift();
        const coord = path[path.length - 1];
        const direcTo = [
            [coord[0] + 1, coord[1]], [coord[0], coord[1] + 1],
            [coord[0] - 1, coord[1]], [coord[0], coord[1] - 1]
        ];
        for (let i = 0; i < direcTo.length; i++) {
            if (direcTo[i][0] == end[0] && direcTo[i][1] == end[1]) {
                path.concat([end]);
                if (path.length > 1) {
                    return path[1];
                } else {
                    return end;
                }
            }
            if (direcTo[i][0] < 0 || direcTo[i][0] >= boardFind.length
                || direcTo[i][1] < 0 || direcTo[i][1] >= boardFind[0].length
                || boardFind[direcTo[i][0]][direcTo[i][1]] != 0) {
                continue;
            }
            boardFind[direcTo[i][0]][direcTo[i][1]] = 1;
            visited.push(path.concat([direcTo[i]]));
        }
    }
    return path[0];
}


