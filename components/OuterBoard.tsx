"use client";

import { useState } from 'react';
import InnerBoard from './InnerBoard';
import calculateWinner from "@/middleware/CalculateWinner";

// TODO: Restart game function
export default function OuterBoard() {
    // Nested array of 9 inner boards, each with 9 squares.
    const [innerBoards, setInnerBoards] = useState(Array(9).fill(Array(9).fill(null)));

    // boardsWon represents which player has won the innerBoard at the index of the Array.
    const [boardsWon, setBoardsWon] = useState(Array(9).fill(null));

    const [xIsNext, setXIsNext] = useState(true); // X starts game

    // Start with all boards active, after click, set the active board to the index of the last clicked square,
    // if the index of the last clicked square has been won, reactivate all other non-won boards.
    const [activeBoard, setActiveBoard] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const handleInnerBoardClick = (boardIndex: number, squareIndex: number) => {
        if (gameOver || boardsWon[boardIndex]) {
            return;
        }
        // && (activeBoard !== null && activeBoard !== boardIndex)

        // Set the clicked square to X or O and update the innerBoards
        const newInnerBoards = innerBoards.slice();
        const newBoard = newInnerBoards[boardIndex].slice();
        newBoard[squareIndex] = xIsNext ? 'X' : 'O';
        newInnerBoards[boardIndex] = newBoard;
        setInnerBoards(newInnerBoards);

        // Check if the innerBoard has been won and update the boardsWon array
        if (calculateWinner(newBoard)) {
            const newBoardsWon = boardsWon.slice();
            newBoardsWon[boardIndex] = xIsNext ? 'X' : 'O';
            setBoardsWon(newBoardsWon);
            setActiveBoard(null); // If the board at the outer index has been won, make all other boards active

            // console.log('boards won', boardsWon);
            // console.log('new boards won', newBoardsWon);
            // Check if the game has been won
            const winner = calculateWinner(newBoardsWon);
            if (winner) {
                setGameOver(true);
            }
            setXIsNext(!xIsNext);
            return;
        }

        // Set up for next player
        setXIsNext(!xIsNext);
        if (boardsWon[squareIndex]) {
            setActiveBoard(null); // If the board has been won, make all the boards active
        } else {
            setActiveBoard(squareIndex); // Otherwise, only make the board that the player is being sent to active
        }
        return;
    };

    return (
        <div>
            <h1>TicTac TacTics</h1>
            <div className="status">
                {gameOver ? `Game Over. Winner: ${xIsNext ? 'O' : 'X'}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <div className="outer-board">
                {innerBoards.map((board, i) => (
                    <InnerBoard
                        key={i}
                        value={board}
                        move={(squareIndex) => handleInnerBoardClick(i, squareIndex)}
                        disabled={activeBoard !== null && i !== activeBoard} // All boards are disabled except the active one
                    />
                ))}
            </div>
        </div>
    );
}
