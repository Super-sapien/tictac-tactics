import calculateWinner from "@/middleware/CalculateWinner";

export default function minimax(board: any[], player: string, alpha: number, beta: number): number {
    const winner = calculateWinner(board);
    if (winner?.winner === 'X') return -1;
    if (winner?.winner === 'O') return 1;
    if (!board.includes(null)) return 0; // draw

    if (player === 'O') {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let evaluate = minimax(board, 'X', alpha, beta);
                board[i] = null;
                maxEval = Math.max(evaluate, maxEval);
                alpha = Math.max(alpha, evaluate);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'X';
                let evaluate = minimax(board, 'O', alpha, beta);
                board[i] = null;
                minEval = Math.min(evaluate, minEval);
                beta = Math.min(beta, evaluate);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minEval;
    }
}