
interface Winner {
    winner: 'X' | 'O' | 'T';
}

interface WinnerBoardProps extends Winner {
    className?: string;
}

export default function WinnerBoard({ winner, className }: WinnerBoardProps) {
    return (
        <div className={`winner-board ${className}`}>
            <div className="winner-char">
                {winner === 'X' && (
                    <svg viewBox="0 0 24 24" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                        <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2" />
                        <line x1="22" y1="2" x2="2" y2="22" stroke="white" strokeWidth="2" />
                    </svg>
                )}
                {winner === 'O' && (
                    <svg viewBox="0 0 24 24" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                )}
                {winner === 'T' && (
                    <svg viewBox="0 0 24 24" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                        <line x1="2" y1="2" x2="22" y2="2" stroke="white" strokeWidth="2"/>
                        <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth="2"/>
                    </svg>
                )}
            </div>
        </div>
    );
}
