// 'use client';
//
// import { useState } from 'react';
// import InnerBoard from './InnerBoard';
//
//
// export default function OuterBoard() {
//     const [boards, setBoards] = useState(Array(9).fill(null));
//     const [xIsNext, setXIsNext] = useState(true);
//     const [activeBoard, setActiveBoard] = useState(null);
//     const winner = calculateWinner(boards);
//
//     const handleInnerBoardClick = (boardIndex, squares) => {
//         if (winner || (activeBoard !== null && activeBoard !== boardIndex)) return;
//
//         const newBoards = boards.slice();
//         newBoards[boardIndex] = calculateWinner(squares) || null;
//         setBoards(newBoards);
//         setXIsNext(!xIsNext);
//         setActiveBoard(squares[boardIndex] === null ? boardIndex : null);
//     };
//
//     return (
//         <div>
//             <div className="status">
//                 {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
//             </div>
//             <div className="outer-board">
//                 {boards.map((board, i) => (
//                     <InnerBoard
//                         key={i}
//                         value={board}
//                         onClick={(i, squares) => handleInnerBoardClick(i, squares)}
//                         disabled={winner || (activeBoard !== null && activeBoard !== i)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// function calculateWinner(boards) {
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
//         if (boards[a] && boards[a] === boards[b] && boards[a] === boards[c]) {
//             return boards[a];
//         }
//     }
//     return null;
// }

"use client";

import { useState } from 'react';
import InnerBoard from './InnerBoard';
import calculateWinner from "@/middleware/CalculateWinner";

// interface OuterBoardProps {
//     activeBoard: number | null;
// }

// TODO: Fix the Game Status
// TODO: Prevent game from disabling other boards when an innerBoard is won
// TODO: Restart game function
export default function OuterBoard() {
    const [boards, setBoards] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [activeBoard, setActiveBoard] = useState(null);

    // calculateWinner(boards);
    // function calculateWinner(boards: any[]) {
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
    //         if (boards[a] && boards[a] === boards[b] && boards[a] === boards[c]) {
    //             return boards[a];
    //         }
    //     }
    //     return null;
    // }

    // const handleInnerBoardClick = (boardIndex: number, winner: any) => {
    //     const newBoards = boards.slice();
    //     newBoards[boardIndex] = winner;
    //     setBoards(newBoards);
    //     setXIsNext(!xIsNext);
    // };

    const handleInnerBoardClick = (boardIndex: number, squareIndex: number) => {
        const newBoards = boards.slice();
        newBoards[boardIndex] = xIsNext ? 'X' : 'O';
        setBoards(newBoards);
        setXIsNext(!xIsNext);
        setActiveBoard(squareIndex); // Set the active board to the index of the last clicked square
    };

    const winner = calculateWinner(boards);

    return (
        <div>
            <h1>TicTac TacTics</h1>
            <div className="status">
                {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <div className="outer-board">
                {boards.map((board, i) => (
                    <InnerBoard
                        key={i}
                        value={board}
                        onClick={(squareIndex) => handleInnerBoardClick(i, squareIndex)}
                        xIsNext={xIsNext}
                        disabled={activeBoard !== null && i !== activeBoard} // All boards are disabled except the active one
                    />
                ))}
            </div>
        </div>
    );
}
