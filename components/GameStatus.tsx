// import calculateWinner from "@/middleware/CalculateWinner";

export default function GameStatus({ xIsNext, winner }: any) {
    // const winner = calculateWinner(boards);

    return (
        <div className="status">
            {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
    )
};
