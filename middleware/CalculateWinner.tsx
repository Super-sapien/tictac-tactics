// Checks for matching values for 3 squares in a row in the board array and returns the winner of that board.
export default function calculateWinner(points: any[]) {
    // console.log('calculateWinner called with points:', points);
    // if (!points) {
    //     console.error('Error: points is null');
    //     return null;
    // }
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // Check for a winner.
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // console.log('lines', lines[i]);
        // console.log('points', points[a], points[b], points[c]);
        if (points[a] && points[a] === points[b] && points[a] === points[c]) {
            // console.log('-----------------winner found:---------------', points[a]);
            // return points[a];
            // console.log('Winner found:', points[a], 'on line:', lines[i]);
            return { winner: points[a], line: lines[i] };
        }
    }
    // Check for a tie.
    if ((points.every((point) => point !== null))) {
        // console.log('Tie found');
        return { winner: 'T', line: [] };
    }
    // If no winner or tie found, return null.
    return null;
}

// export default function calculateWinner(board: any[], player: string) {
//     if (
//         ((board[0] == player && board[1] == player && board[2] == player) ||
//             (board[3] == player && board[4] == player && board[5] == player) ||
//             (board[6] == player && board[7] == player && board[8] == player) ||
//             (board[0] == player && board[3] == player && board[6] == player) ||
//             (board[1] == player && board[4] == player && board[7] == player) ||
//             (board[2] == player && board[5] == player && board[8] == player) ||
//             (board[0] == player && board[4] == player && board[8] == player) ||
//             (board[2] == player && board[4] == player && board[6] == player))
//     ) {
//         return { winner: player };
//     } else if (board.every((point) => point !== null)) {
//         return {winner: 'T'};
//     } else {
//         return null;
//     }
// }

// export default function calculateWinner(state: { innerBoards: any[], boardsWon: any[], activeBoard: number | null }) {
//     const points = state.boardsWon;
//
//     // Check if points is not undefined
//     if (!points) {
//         console.error('Error: points is undefined');
//         return null;
//     }
//
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     // Check for a winner.
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (points[a] && points[a] === points[b] && points[a] === points[c]) {
//             return { winner: points[a], line: lines[i] };
//         }
//     }
//     // Check for a tie.
//     if ((points.every((point) => point !== null))) {
//         return { winner: 'T', line: [] };
//     }
//     // If no winner or tie found, return null.
//     return null;
// }


export function hasTwoInARow(board: any[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if ((board[a] === board[b] && board[c] === null) ||
            (board[a] === board[c] && board[b] === null) ||
            (board[b] === board[c] && board[a] === null)) {
            return true;
        }
    }
    return false;
}

// export function checkPotentialWin(board: any[]) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if ((board[a] && board[a] === board[b] && board[c] == null) ||
//             (board[a] && board[a] === board[c] && board[b] == null) ||
//             (board[b] && board[b] === board[c] && board[a] == null)) {
//             return board[a] || board[b] || board[c];
//         }
//     }
//     return null;
// }