// Checks for matching values for 3 squares in a row in the board array and returns the winner of that board.
export default function calculateWinner(points: any[]) {
    const lines = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // col 1
        [1, 4, 7], // col 2
        [2, 5, 8], // col 3
        [0, 4, 8], // diag 1
        [2, 4, 6], // diag 2
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (points[a] && points[a] === points[b] && points[a] === points[c]) {
            // console.log('Winner:', points[a], 'line:', lines[i]);
            return { winner: points[a], line: lines[i] };
        }
    }
    // Check for a tie.
    if (points.every((point) => point !== null)) {
        return {winner: 'T', line: [] };
    }
    // If no winner found, return null.
    return null;
}
