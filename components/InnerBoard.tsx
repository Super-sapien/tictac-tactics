import Square from './Square';
import WinnerBoard from "@/components/WinnerBoard";
import calculateWinner from "@/middleware/CalculateWinner";

interface InnerBoardProps {
    move: (squareIndex: number) => void,
    disabled: boolean,
    value: string[],
    className?: string,
    gameOver: boolean,
    winner: { winner: 'X' | 'O' | 'T' } | null,
    lastHumanMove: { i: number | null, j: number | null },
    lastAIMove: { i: number | null, j: number | null },
    outerIndex: number,
    lastBoardWon: number | null;
}

export default function InnerBoard({move, disabled, value, className, gameOver, winner, lastAIMove, lastHumanMove, outerIndex, lastBoardWon}: InnerBoardProps) {
    const handleClick = (i: number) => {
        // if disabled or square already filled return (prevent the move)
        if (disabled || value[i]) {
            return;
        }
        move(i); // make the move
    };

    // const winner = calculateWinner(value);

    return (
        <>
            {
                (winner !== null) ?
                    <WinnerBoard
                        winner={winner.winner}
                        className={`
                        ${gameOver ? className :
                        lastBoardWon === lastAIMove.i && lastBoardWon === outerIndex ? 'last-board-won-AI' : 
                        lastBoardWon === lastHumanMove.i && lastBoardWon === outerIndex ? 'last-board-won-human' : undefined}
                         `}
                    />

                    :

                    <div className={`inner-board ${disabled ? 'disabled' : ''}`}>
                        {value.map((square, i) => {
                            let extraClass = '';
                            if (lastAIMove.i === outerIndex && lastAIMove.j === i) {
                                extraClass = 'last-ai-move';
                            } else if (lastHumanMove.i === outerIndex && lastHumanMove.j === i) {
                                extraClass = 'last-human-move';
                            }
                            return (
                                <Square
                                    key={i}
                                    value={square}
                                    move={() => handleClick(i)}
                                    className={extraClass}
                                />
                            );
                        })}
                    </div>
            }
        </>
    );
}

