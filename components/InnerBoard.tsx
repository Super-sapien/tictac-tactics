import Square from './Square';
import WinnerBoard from "@/components/WinnerBoard";
import classes from "@/components/ultimate/ultimate-mode.module.css";

interface InnerBoardProps {
    move: (squareIndex: number) => void,
    disabled: boolean,
    value: string[],
    className?: string,
    gameOver: boolean,
    winner: { winner: 'X' | 'O' | 'T' } | null,
    lastYourMove: { i: number | null, j: number | null },
    lastOpponentMove: { i: number | null, j: number | null },
    outerIndex: number,
    lastBoardWon: number | null;
}

export default function InnerBoard({move, disabled, value, className, gameOver, winner, lastOpponentMove, lastYourMove,
                                       outerIndex, lastBoardWon}: InnerBoardProps) {
    const handleClick = (i: number) => {
        // if disabled or square already filled return (prevent the move)
        if (disabled || value[i]) {
            return;
        }
        move(i); // make the move
    };

    return (
        <>
            {
                (winner !== null) ?
                    <WinnerBoard
                        winner={winner.winner}
                        className={`
                        ${gameOver ? className :
                            lastBoardWon === lastOpponentMove.i && lastBoardWon === outerIndex ? `${classes.lastBoardWonOpponent}` :
                                lastBoardWon === lastYourMove.i && lastBoardWon === outerIndex ? `${classes.lastBoardWonYou}` : undefined}
                         `}
                    />

                    :

                    <div className={`${classes.innerBoard} ${disabled ? `${classes.disabled}` : ''}`}>
                        {value.map((square, i) => {
                            return (
                                <Square
                                    key={i}
                                    value={square}
                                    move={() => handleClick(i)}
                                    className={`
                                    ${lastOpponentMove.i === outerIndex && lastOpponentMove.j === i ? `${classes.lastOpponentMove}` :
                                        lastYourMove.i === outerIndex && lastYourMove.j === i ? `${classes.lastYourMove}` : undefined}
                                    `}
                                    mode={'ultimate'}
                                />
                            );
                        })}
                    </div>
            }
        </>
    );
}
