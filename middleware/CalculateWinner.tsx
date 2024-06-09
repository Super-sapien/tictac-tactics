// Checks for matching values for 3 squares in a row in the board array and returns the winner of that board.
export default function calculateWinner(points: any[]) {
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
    // Check for a tie.
    if (points.every((point) => point !== null)) {
        return 'T';
    }
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (points[a] && points[a] === points[b] && points[a] === points[c]) {
            // return points[a];
            return { winner: points[a], line: lines[i] };
        }
    }
    // If no winner found, return null.
    return null;
}
