// 'use client';
//
// import { useState } from 'react';
// import Square from './Square';
//
// export default function Board() {
//     const [squares, setSquares] = useState(Array(9).fill(null));
//     const [xIsNext, setXIsNext] = useState(true);
//
//     const handleClick = (i: number) => {
//         const squaresCopy = squares.slice();
//         if (calculateWinner(squaresCopy) || squaresCopy[i]) {
//             return;
//         }
//         squaresCopy[i] = xIsNext ? 'X' : 'O';
//         setSquares(squaresCopy);
//         setXIsNext(!xIsNext);
//     };
//
//     const winner = calculateWinner(squares);
//     let status;
//     if (winner) {
//         if (winner === 'Draw') {
//             status = `Draw`;
//         } else {
//             status = `Winner: ${winner}`;
//         }
//     } else {
//         status = `Next player: ${xIsNext ? 'X' : 'O'}`;
//     }
//
//     return (
//         <div>
//             <div className="status">{status}</div>
//             <div className="board-row">
//                 <Square value={squares[0]} onClick={() => handleClick(0)} />
//                 <Square value={squares[1]} onClick={() => handleClick(1)} />
//                 <Square value={squares[2]} onClick={() => handleClick(2)} />
//             </div>
//             <div className="board-row">
//                 <Square value={squares[3]} onClick={() => handleClick(3)} />
//                 <Square value={squares[4]} onClick={() => handleClick(4)} />
//                 <Square value={squares[5]} onClick={() => handleClick(5)} />
//             </div>
//             <div className="board-row">
//                 <Square value={squares[6]} onClick={() => handleClick(6)} />
//                 <Square value={squares[7]} onClick={() => handleClick(7)} />
//                 <Square value={squares[8]} onClick={() => handleClick(8)} />
//             </div>
//         </div>
//     );
// }
//
// function calculateWinner(squares: any[]) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     if (!squares.includes(null)) {
//         return 'Draw';
//     }
//
//     return null;
// }

// components/InnerBoard.js
// 'use client';
//
// interface InnerBoardProps {
//     value: any; // replace 'any' with the actual type
//     onClick: (i: number, squares: any[]) => void; // replace 'any' with the actual type
//     disabled: boolean;
// }
//
// import { useState } from 'react';
// import Square from './Square';
//
// export default function InnerBoard({ value, onClick, disabled }: InnerBoardProps) {
//     const [squares, setSquares] = useState(Array(9).fill(null));
//     // const [xIsNext, setXIsNext] = useState(true);
//     const winner = calculateWinner(squares);
//
//     const handleClick = (i: number) => {
//         if (winner || squares[i] || disabled) return;
//
//         const squaresCopy = squares.slice();
//         squaresCopy[i] = xIsNext ? 'X' : 'O';
//         setSquares(squaresCopy);
//         setXIsNext(!xIsNext);
//
//         onClick(i, squaresCopy);
//     };
//
//     return (
//         <div className="inner-board">
//             {squares.map((square, i) => (
//                 <Square key={i} value={square} onClick={() => handleClick(i)} />
//             ))}
//         </div>
//     );
// }
//
// function calculateWinner(squares: any[]) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null;
// }



import { useState } from 'react';
import Square from './Square';
import WinnerBoard from "@/components/WinnerBoard";
import calculateWinner from "@/middleware/CalculateWinner";

// interface InnerBoardProps {
//     value: any; // replace 'any' with the actual type
//     onClick: (i: number, squares: any[]) => void; // replace 'any' with the actual type
//     disabled: boolean;
//     xIsNext: boolean;
// }

// interface InnerBoardProps {
//     value: any; // replace 'any' with the actual type
//     onClick: (i: number, squares: any[]) => void; // replace 'any' with the actual type
//     disabled: boolean;
//     xIsNext: boolean;
//     setXIsNext: (xIsNext: boolean) => void;
// }
//
// export default function InnerBoard({ value, onClick, xIsNext, setXIsNext }: InnerBoardProps) {
//     const [squares, setSquares] = useState(Array(9).fill(null));
//     // const [xIsNext, setXIsNext] = useState(true);
//     const calculateWinner = (squares: any[]) => {
//         const lines = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ];
//         for (let i = 0; i < lines.length; i++) {
//             const [a, b, c] = lines[i];
//             if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//                 return squares[a];
//             }
//         }
//         return null;
//     }
//
//     const handleClick = (i: number) => {
//         const squaresCopy = squares.slice();
//         if (calculateWinner(squaresCopy) || squaresCopy[i]) {
//             return; // already won or square already filled so prevent move
//         }
//         squaresCopy[i] = xIsNext ? 'X' : 'O';
//         setSquares(squaresCopy);
//
//         const winner = calculateWinner(squaresCopy);
//
//         if (winner) {
//             console.log('winner', winner);
//         }
//         // setXIsNext(!xIsNext);
//     };
//
//     return (
//         <div className="inner-board">
//             {squares.map((square, i) => (
//                 <Square key={i} value={square} onClick={() => handleClick(i)} />
//             ))}
//         </div>
//     );
// }


interface InnerBoardProps {
    value: any; // replace 'any' with the actual type
    onClick: (winner: any) => void; // replace 'any' with the actual type
    xIsNext: boolean;
    disabled: boolean;
}

export default function InnerBoard({ value, onClick, xIsNext, disabled }: InnerBoardProps) {
    const [squares, setSquares] = useState(Array(9).fill(null));

    // const handleClick = (i: number) => {
    //     const squaresCopy = squares.slice();
    //     if (calculateWinner(squaresCopy) || squaresCopy[i]) {
    //         return;
    //     }
    //     squaresCopy[i] = xIsNext ? 'X' : 'O';
    //     setSquares(squaresCopy);
    //     const winner = calculateWinner(squaresCopy);
    //
    //     setXIsNext(!xIsNext) // set next player
    // };

    const handleClick = (i: number) => {
        if (disabled || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setSquares(squares);
        onClick(i);
    };

    const winner = calculateWinner(squares);

    if (winner === 'X' || winner === 'O') {
        return <WinnerBoard winner={winner} />;
    }
    return (
        <div className={`inner-board ${disabled ? 'disabled' : ''}`}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => handleClick(i)}/>
            ))}
        </div>
    );
}