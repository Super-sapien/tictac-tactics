import Square from './Square';
import WinnerBoard from "@/components/WinnerBoard";
import calculateWinner from "@/middleware/CalculateWinner";

interface InnerBoardProps {
    move: (squareIndex: number) => void;
    disabled: boolean;
    value: string[];
}

export default function InnerBoard({ move, disabled, value }: InnerBoardProps) {
    const handleClick = (i: number) => {
        // if disabled or square already filled return (prevent the move)
        if (disabled || value[i]) {
            return;
        }
        move(i); // make the move
    };

    const winner = calculateWinner(value);

    return (
        <>
            {
                (winner === 'X' || winner === 'O') ?
                    <WinnerBoard winner={winner} /> :
                    <div className={`inner-board ${disabled ? 'disabled' : ''}`}>
                        {value.map((square, i) => (
                            <Square key={i} value={square} move={() => handleClick(i)}/>
                        ))}
                    </div>
            }
        </>
    );
}
