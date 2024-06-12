import Square from './Square';
import WinnerBoard from "@/components/WinnerBoard";
import calculateWinner from "@/middleware/CalculateWinner";

interface InnerBoardProps {
    move: (squareIndex: number) => void,
    disabled: boolean,
    value: string[],
    className?: string,
    gameOver: boolean,
    winner: { winner: 'X' | 'O' | 'T' } | null
}

export default function InnerBoard({move, disabled, value, className, gameOver, winner}: InnerBoardProps) {
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
                        className={gameOver ? className : undefined}
                    />

                    :

                    <div className={`inner-board ${disabled ? 'disabled' : ''}`}>
                        {value.map((square, i) => (
                            <Square
                                key={i}
                                value={square}
                                move={() => handleClick(i)}

                            />
                        ))}
                    </div>
            }
        </>
    );
}
