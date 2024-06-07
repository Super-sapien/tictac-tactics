
export default function Square({ value, onClick }: any) {
    return (
        <button className="square" onClick={onClick}>
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
