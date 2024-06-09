
// export default function WinnerBoard({ winner }: { winner: 'X' | 'O' }) {
//     return (
//         <div className="inner-board winner-board">
//             {winner === 'X' && (
//                 <svg viewBox="0 0 24 24" width="100%" height="100%">
//                     <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2" />
//                     <line x1="22" y1="2" x2="2" y2="22" stroke="white" strokeWidth="2" />
//                 </svg>
//             )}
//             {winner === 'O' && (
//                 <svg viewBox="0 0 24 24" width="100%" height="100%">
//                     <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
//                 </svg>
//             )}
//         </div>
//     );
// }

interface Winner {
    winner: 'X' | 'O' | 'T';
}

export default function WinnerBoard({ winner }: Winner) {
    return (
        <div className="winner-board">
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