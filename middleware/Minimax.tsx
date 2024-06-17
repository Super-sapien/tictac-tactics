import calculateWinner, {hasTwoInARow} from "@/middleware/CalculateWinner";
// max depth 3 = 87,000 runs
// max depth 2 = ??

// const memo: { [key: string]: number } = {};
// const bestMoveMemo: { [key: string]: { i: number, j: number } } = {};
const maxDepth = 1;

// let openBoards = [null, null, null, null, null, null, null, null, null];
// let lastBoards = [...openBoards];

// Returns the best move by iterating through all possible moves from the current game state.
// Calls minimax to evaluate each possible move by looking ahead depth number of moves.
export default function bestMove(activeBoard: number | null, board: any[][], boardsWon: any[]) {
    // const boardKey = JSON.stringify(board);
    // if (bestMoveMemo[boardKey]) {
    //     return bestMoveMemo[boardKey];
    // }

    let bestScore: number | void = -Infinity;
    // let move = {i: 0, j: 0};
    // const weights = [1.3, 1.2, 1.3, 1.2, 1.4, 1.2, 1.3, 1.2, 1.3]; // prioritize middle, then corners, then sides.
    let moves: any[] = [];
    // TODO: If the active board is null there will be a lot of options, and this would be too much for the minimax algorithm.
    // TODO: Consider reducing the depth of the minimax algorithm if the active board is null. OR
    // TODO: Consider a heuristic evaluation function that can be used to evaluate the board state.
    if (activeBoard === null) {
        // Loop through all the boards to find the best move.
        for (let i = 0; i < 9; i++) {
            // Skip the board if it has already been won.
            if (boardsWon[i] !== null) continue;
            for (let j = 0; j < 9; j++) {
                // If the square is empty, consider it.
                if (board[i][j] === null) {
                    board[i][j] = 'O';
                    let score = minimax(board, 0, true, -Infinity, Infinity, maxDepth, activeBoard);
                    board[i][j] = null; // Undo the move
                    if (score > bestScore) {
                        bestScore = score;
                        moves = [{i, j}];
                    } else if (score === bestScore) {
                        moves.push({i, j});
                    }
                }
            }
        }
        // If multiple moves have the same score, randomly select one of them
        console.log(bestScore, moves);
        let bestMove;
        if (moves.length > 1) {
            console.log('many moves:', moves)
            // return moves[Math.floor(Math.random() * moves.length)];
            bestMove = moves[Math.floor(Math.random() * moves.length)];
        } else {
            bestMove = moves[0];
            // return moves[0];
        }
        // bestMoveMemo[boardKey] = bestMove;
        return bestMove;
    } else {
        // Loop through the active board to find the best move.
        let i = activeBoard;
        // Skip the board if it has already been won.
        if (boardsWon[i] !== null) return;
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === null) {
                board[i][j] = 'O'; // [i][j] is the move
                let score = minimax(board, 0, true, -Infinity, Infinity, maxDepth, activeBoard);
                board[i][j] = null; // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    moves = [{i, j}];
                } else if (score === bestScore) {
                    moves.push({i, j});
                }
            }
        }
        // If multiple moves have the same score, randomly select one of them
        console.log(bestScore, moves);
        let bestMove;
        if (moves.length > 1) {
            console.log('many moves:', moves)
            // return moves[Math.floor(Math.random() * moves.length)];
            bestMove = moves[Math.floor(Math.random() * moves.length)];
        } else {
            bestMove = moves[0];
            // return moves[0];
        }
        // bestMoveMemo[boardKey] = bestMove;
        return bestMove;
    }
    // // If multiple moves have the same score, randomly select one of them
    // console.log(bestScore, moves);
    // let bestMove;
    // if (moves.length > 1) {
    //     console.log('many moves:', moves)
    //     // return moves[Math.floor(Math.random() * moves.length)];
    //     bestMove = moves[Math.floor(Math.random() * moves.length)];
    // } else {
    //     bestMove = moves[0];
    //     // return moves[0];
    // }
    // // bestMoveMemo[boardKey] = bestMove;
    // return bestMove;
}




// Called from bestMove to recursively evaluate each possible move from the current board state.
// Returns a score for the best move from that board state by checking depth number of moves ahead.
function minimax(board: any[][], depth: number, isMaximizing: boolean, alpha: number, beta: number, maxDepth: number, activeBoard: number | null) {
    // const boardKey = JSON.stringify(board);
    // if (memo[boardKey]) {
    //     // console.log('Retrieved result from memo:', memo[boardKey]);
    //     return memo[boardKey];
    // }
    // const winner = calculateWinner(board);
    // // console.log('in minimax')
    // if (winner?.winner === 'O') return 10 - depth;
    // if (winner?.winner === 'X') return depth - 10;
    // // if (winner?.winner === 'T') {
    // //     console.log('minimax winner', winner);
    // //     return 0;
    //  if (board.every(row => row.every(cell => cell !== null))) {
    //      console.log('tie found', board);
    //      // It's a tie
    //      return 0;
    //  }

    let score = heuristicEvaluation(activeBoard, board);
    if (depth === maxDepth) {
        // console.log(`Max depth reached. Board: ${JSON.stringify(board)}`);
        return score;
    }

    let outerBoardMinimax = [];
    for (let i = 0; i < 9; i++) {
        if (calculateWinner(board[i])?.winner === 'O') {
            outerBoardMinimax[i] = 'O'
        }
        else if (calculateWinner(board[i])?.winner === 'X') {
            outerBoardMinimax[i] = 'X'
        }
        else if (board.every(row => row.every(cell => cell !== null))) {
            outerBoardMinimax[i] = 'T'
        } else {
            outerBoardMinimax[i] = null
        }
    }

    if (calculateWinner(outerBoardMinimax)?.winner === 'O'){
        return score + depth;
    }
    else if (calculateWinner(outerBoardMinimax)?.winner === 'X'){
        return score - depth;
    }

    // if (typeof outerBoardMinimax[board[activeBoard]] === 'number' || outerBoardMinimax[board][activeBoard] === null) {
    //     for (let j = 0; j < 9; j++) {
    //         if (typeof outerBoardMinimax[j] === 'number') {
    //             outerBoardMinimax[j] = null
    //         }
    //     }
    // }
    if (outerBoardMinimax.length === 0) {
        return  score;
    }

    let bestScore;
    // is the AI's turn
    if (isMaximizing) {
        bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === null) {
                    board[i][j] = 'O';
                    let score: any = minimax(board, depth + 1, false, alpha, beta, maxDepth, activeBoard);
                    board[i][j] = null;
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, bestScore);
                    // console.log('max bestscore', bestScore);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        // console.log("max bestScore", bestScore)
        // memo[boardKey] = bestScore;
        return bestScore;
    } else {
        // Is minimizing.
        bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === null) {
                    board[i][j] = 'X';
                    // TODO: The main diff between loudringphone is he passes in move instead of activeBoard (move is outerboard and innerboard index, whereas activeBoard is just outerboard index)
                    // TODO: He then uses the indices to get the empty spots in the outer and inner boards. I'm doing this with my null check.
                    let score: any = minimax(board, depth + 1, true, alpha, beta, maxDepth, activeBoard);
                    board[i][j] = null; // Undo the move
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) {
                        // console.log('breakin min')
                        break;
                    }
                }
            }
        }
        // console.log("min bestScore", bestScore)
        // memo[boardKey] = bestScore;
        return bestScore;
    }
}



// TODO: This Heuristic!
function heuristicEvaluation(current: number | null, innerBoards: any[][]) {
    const allWinningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const positionWeights = [0.3, 0.2, 0.3, 0.2, 0.4, 0.2, 0.3, 0.2, 0.3];
    const innerBoardWeights = [1.35, 1, 1.35, 1, 1.7, 1, 1.35, 1, 1.35];

    // Returns the score of a row.
    function rowScore(row: any[]) {
        let oCount = 0;
        let xCount = 0;
        let numCount = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 'O') {
                oCount++;
            } else if (row[i] === 'X') {
                xCount++;
            } else {
                numCount++;
            }
        }

        if (oCount === 3) {
            return -12
        }
        if (oCount === 2 && numCount === 1) {
            return -6
        }
        if (xCount === 2 && numCount === 1) {
            return 6
        }
        if (xCount === 2 && oCount === 1) {
            return -9
        }
        if (xCount === 3) {
            return 12
        }
        if (oCount === 2 && xCount === 1) {
            return 9
        } else {
            return 0
        }
    }

    let score = 0;
    let outerBoard = [];

    // for (let i = 0; i < 9; i++) {
    //     let innerBoard = board[i];
    //     let innerBoardScore = 0;
    //     let innerBoardWinningLines = allWinningLines.map(line => line.map(cell => innerBoard[cell]));
    //     for (let j = 0; j < innerBoardWinningLines.length; j++) {
    //         innerBoardScore += rowScore(innerBoardWinningLines[j]);
    //     }
    //     score += innerBoardScore * innerBoardWeights[i];
    // }

    // Check for winning lines in the inner boards.
    for (let i = 0; i < 9; i++) {
       if (calculateWinner(innerBoards[i])?.winner === 'O') {
           outerBoard[i] = 'O';
           score -= positionWeights[i] * 150;
       } else if (calculateWinner(innerBoards[i])?.winner === 'X') {
           outerBoard[i] = 'X';
           score += positionWeights[i] * 150;
       } else if (innerBoards[i].every((cell: any) => cell !== null)) {
           outerBoard[i] = 'T';
       } else {
          outerBoard[i] = null;
       }
    }

    // Check for winning lines in the outer board.
    if (calculateWinner(outerBoard)?.winner === 'O') {
        score -= 50000;
    } else if (calculateWinner(outerBoard)?.winner === 'X') {
        score += 50000;
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (innerBoards[i][j] === 'O') {
                if (i === current) {
                    score -= positionWeights[j] * 1.5 * innerBoardWeights[i];
                } else {
                    score -= positionWeights[j] * innerBoardWeights[i];
                }
            } else if (innerBoards[i][j] === 'X') {
                if (i === current) {
                    score += positionWeights[j] * 1.5 * innerBoardWeights[i];
                } else {
                    score += positionWeights[j] * innerBoardWeights[i];
                }
            }
        }
        let RawScores = new Set();
        for (let line of allWinningLines) {
            let innerBoardLine = [innerBoards[i][line[0]], innerBoards[i][line[1]], innerBoards[i][line[2]]];
            let rowScoreVal = rowScore(innerBoardLine);
            if (!RawScores.has(rowScoreVal)) {
                if ((line[0] === 0 && line[1] === 4 && line[2] === 8) || (line[0] === 2 && line[1] === 4 && line[2] === 6)) {
                    if (rowScoreVal === 6 || rowScoreVal === -6) {
                        if (i === current) {
                            score += rowScoreVal * 1.2 * 1.5 * innerBoardWeights[i];
                        } else {
                            score += rowScoreVal * 1.2 * innerBoardWeights[i];
                        }
                    }
                } else {
                    if (i === current) {
                        score += rowScoreVal * 1.5 * innerBoardWeights[i];
                    } else {
                        score += rowScoreVal * innerBoardWeights[i];
                    }
                }
                RawScores.add(rowScoreVal);
            }
        }
    }
    let rawScores = new Set();
    for (let line of allWinningLines) {
        let outerBoardLine = [outerBoard[line[0]], outerBoard[line[1]], outerBoard[line[2]]];
        let rowScoreVal = rowScore(outerBoardLine);
        if (!rawScores.has(rowScoreVal)) {
            if ((line[0] === 0 && line[1] === 4 && line[2] === 8) || (line[0] === 2 && line[1] === 4 && line[2] === 6)) {
                if (rowScoreVal === 6 || rowScoreVal === -6) {
                    score += rowScoreVal * 1.2 * 150;
                }
            } else {
                score += rowScoreVal * 150;
            }
            rawScores.add(rowScoreVal);
        }
    }
    return score
}



// function heuristicEvaluation(innerBoards: any[][], boardsWon: any[]) {
//     let score = 0;
//
//     // Increase score for each inner board won by the AI
//     for (let i = 0; i < boardsWon.length; i++) {
//         if (boardsWon[i] === 'O') {
//             score += 10;
//         }
//     }
//
//     // Decrease score for each inner board won by the opponent
//     for (let i = 0; i < boardsWon.length; i++) {
//         if (boardsWon[i] === 'X') {
//             score -= 10;
//         }
//     }
//
//     // Increase score for each potential winning line for the AI on each inner board
//     for (let i = 0; i < innerBoards.length; i++) {
//         for (let j = 0; j < innerBoards[i].length; j++) {
//             if (innerBoards[i][j] === 'O') {
//                 score += 1;
//             }
//         }
//     }
//
//     // Decrease score for each potential winning line for the opponent on each inner board
//     for (let i = 0; i < innerBoards.length; i++) {
//         for (let j = 0; j < innerBoards[i].length; j++) {
//             if (innerBoards[i][j] === 'X') {
//                 score -= 1;
//             }
//         }
//     }
//     // console.log('max depth reached, score = ', score);
//     return score;
// }

// function heuristicEvaluation(innerBoards: any[][], boardsWon: any[]) {
//     let score = 0;
//
//     // Winning Boards
//     for (let i = 0; i < boardsWon.length; i++) {
//         if (boardsWon[i] === 'O') {
//             score += 10;
//         } else if (boardsWon[i] === 'X') {
//             score -= 10;
//         }
//     }
//
//     // Potential Winning Boards, Blocking Opponent's Winning Boards
//     for (let i = 0; i < innerBoards.length; i++) {
//         if (boardsWon[i] !== null) continue; // Skip if the board has been won
//
//         let board = innerBoards[i];
//         let potentialLines = 0;
//         let blockingLines = 0;
//
//         // Check rows
//         for (let j = 0; j < 3; j++) {
//             let row = board.slice(j * 3, j * 3 + 3);
//             if (row.filter(x => x === 'O').length === 2 && !row.includes('X')) potentialLines++;
//             if (row.filter(x => x === 'X').length === 2 && !row.includes('O')) blockingLines++;
//         }
//
//         // Check columns
//         for (let j = 0; j < 3; j++) {
//             let col = [board[j], board[j + 3], board[j + 6]];
//             if (col.filter(x => x === 'O').length === 2 && !col.includes('X')) potentialLines++;
//             if (col.filter(x => x === 'X').length === 2 && !col.includes('O')) blockingLines++;
//         }
//
//         // Check diagonals
//         let diag1 = [board[0], board[4], board[8]];
//         let diag2 = [board[2], board[4], board[6]];
//         if (diag1.filter(x => x === 'O').length === 2 && !diag1.includes('X')) potentialLines++;
//         if (diag1.filter(x => x === 'X').length === 2 && !diag1.includes('O')) blockingLines++;
//         if (diag2.filter(x => x === 'O').length === 2 && !diag2.includes('X')) potentialLines++;
//         if (diag2.filter(x => x === 'X').length === 2 && !diag2.includes('O')) blockingLines++;
//
//         score += potentialLines * 2;
//         score += blockingLines * 2;
//     }
//
//     // Center Control, Corner Control, Side Control
//     for (let i = 0; i < innerBoards.length; i++) {
//         let board = innerBoards[i];
//         if (board[4] === 'O') score += 1; // Center
//         if (board[4] === 'X') score -= 1;
//         if ([0, 2, 6, 8].filter(j => board[j] === 'O').length > 0) score += 1; // Corners
//         if ([0, 2, 6, 8].filter(j => board[j] === 'X').length > 0) score -= 1;
//         if ([1, 3, 5, 7].filter(j => board[j] === 'O').length > 0) score += 1; // Sides
//         if ([1, 3, 5, 7].filter(j => board[j] === 'X').length > 0) score -= 1;
//     }
//
//     // Check for two in a row
//     for (let i = 0; i < innerBoards.length; i++) {
//         if (boardsWon[i] !== null) continue; // Skip if the board has been won
//
//         let board = innerBoards[i];
//
//         // Check rows
//         for (let j = 0; j < 3; j++) {
//             let row = board.slice(j * 3, j * 3 + 3);
//             if (row.filter(x => x === 'O').length === 2 && row.includes(null)) score += 50;
//         }
//
//         // Check columns
//         for (let j = 0; j < 3; j++) {
//             let col = [board[j], board[j + 3], board[j + 6]];
//             if (col.filter(x => x === 'O').length === 2 && col.includes(null)) score += 50;
//         }
//
//         // Check diagonals
//         let diag1 = [board[0], board[4], board[8]];
//         let diag2 = [board[2], board[4], board[6]];
//         if (diag1.filter(x => x === 'O').length === 2 && diag1.includes(null)) score += 50;
//         if (diag2.filter(x => x === 'O').length === 2 && diag2.includes(null)) score += 50;
//     }
//     // console.log(`Heuristic evaluation called. Score: ${score}`);
//     return score;
// }


// TODO: Heuristic changes
// 1. Prioritize winning the board over blocking the opponent from winning the board.
// 2. Prioritize winning the game over blocking the opponent from winning the game.
// TODO: Minimax changes
// 1. Only recurse down the tree if there are 2 moves from the same player in a row.
// 2. If the active board is null, only recurse down the tree if there are 2 moves from the same player in a row in any of the innerboards.