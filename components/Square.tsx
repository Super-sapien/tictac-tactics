// Displays a square with an X or O, depending on the player who makes the first valid move on the square.
export default function Square({ value, move, className }: any) {
    return (
        <button className={`${className} square`} onClick={move} >
            {value === 'X' && (
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <line x1="2" y1="2" x2="22" y2="22" stroke="black" strokeWidth="2" />
                    <line x1="22" y1="2" x2="2" y2="22" stroke="black" strokeWidth="2" />
                </svg>
            )}
            {value === 'O' && (
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="none" />
                </svg>
            )}
        </button>
    );
}