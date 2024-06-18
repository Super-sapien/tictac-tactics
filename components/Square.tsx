// Displays a square with an X or O, depending on the player who makes the first valid move on the square.
import classes from "@/components/square.module.css";

export default function Square({ value, move, className, mode }: any) {
    const isLastOpponentMove = className.includes('lastOpponentMove');
    const strokeColorO = isLastOpponentMove ? 'red' : 'black';
    const isLastYourMove = className.includes('lastYourMove');
    const strokeColorX = isLastYourMove ? 'blue' : 'black';
    // const isLastBoardWon = className.includes('lastBoardWon');
    // const isLastBoardWonOpponent = className.includes('lastBoardWonOpponent');
    // const isLastBoardWonYou = className.includes('lastBoardWonYou');

    const squareClass = mode === 'classic' ? 'squareClassic' : 'squareUltimate';

    return (
        <button className={`${classes[squareClass]} ${className}`} onClick={move} >
            {value === 'X' && (
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <line x1="2" y1="2" x2="22" y2="22" stroke={strokeColorX} strokeWidth="4" />
                    <line x1="22" y1="2" x2="2" y2="22" stroke={strokeColorX} strokeWidth="4" />
                </svg>
            )}
            {value === 'O' && (
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="12" r="10" stroke={strokeColorO} strokeWidth="4" fill="none" />
                </svg>
            )}
        </button>
    );
}