"use client";

import { useState } from 'react';
import InnerBoard from './InnerBoard';
import calculateWinner from "@/middleware/CalculateWinner";

// TODO: Build AI to play against. Highlight AI's last move.
export default function OuterBoard(this: any) {
    // Nested array of 9 inner boards, each with 9 squares.
    const [innerBoards, setInnerBoards] = useState(Array(9).fill(Array(9).fill(null)));

    // boardsWon represents which player has won the innerBoard at the index of the Array.
    const [boardsWon, setBoardsWon] = useState(Array(9).fill(null));

    const [xIsNext, setXIsNext] = useState(true); // X starts game

    // Start with all boards active, after click, set the active board to the index of the last clicked square,
    // if the index of the last clicked square has been won, reactivate all other non-won boards.
    const [activeBoard, setActiveBoard] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    const handleInnerBoardClick = (boardIndex: number, squareIndex: number) => {
        if (gameOver || boardsWon[boardIndex]) {
            return;
        }

        // Set the clicked square to X or O and update the innerBoards
        const newInnerBoards = innerBoards.slice();
        const newBoard = newInnerBoards[boardIndex].slice();
        newBoard[squareIndex] = xIsNext ? 'X' : 'O';
        newInnerBoards[boardIndex] = newBoard;
        setInnerBoards(newInnerBoards);

        // Check if the innerBoard has been won and update the boardsWon array
        const winner = calculateWinner(newBoard);
        const newBoardsWon = boardsWon.slice();
        console.log('new boards won', newBoardsWon);
        console.log('winner', winner);
        if (winner !== null && winner.winner === 'T') {
            newBoardsWon[boardIndex] = 'T';
        } else if (winner) {
            newBoardsWon[boardIndex] = xIsNext ? 'X' : 'O';
        }
        setBoardsWon(newBoardsWon);
        setActiveBoard(null); // If the board at the outer index has been won, make all other boards active

        // Check if the game has been won
        const gameWinner = calculateWinner(newBoardsWon);
        if (gameWinner) {
            if (gameWinner.winner === 'T') {
                console.log('Tie game');
            }
            if (gameWinner.winner !== 'T') {
                setWinningLine(gameWinner.line);
            }
            setGameOver(true);
        }

        // Set up for next player
        setXIsNext(!xIsNext);
        if (newBoardsWon[squareIndex]) {
            setActiveBoard(null); // If the board has been won, make all the boards active
        } else {
            setActiveBoard(squareIndex); // Otherwise, only make the board that the player is being sent to active
        }
        return;
    };

    const restartGame = () => {
        setInnerBoards(Array(9).fill(Array(9).fill(null)));
        setBoardsWon(Array(9).fill(null));
        setXIsNext(true);
        setActiveBoard(null);
        setGameOver(false);
    }

    return (
        <div>
            <h1>TicTac TacTics</h1>
            <div className="status">
                {gameOver ? `Game Over` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            {/*    . Winner: ${xIsNext ? 'O' : 'X'}` */}
            </div>
            <div className="outer-board">
                {innerBoards.map((board, i) => (
                    <InnerBoard
                        key={i}
                        value={board}
                        move={(squareIndex) => handleInnerBoardClick(i, squareIndex)}
                        disabled={activeBoard !== null && i !== activeBoard} // All boards are disabled except the active one
                        className={gameOver && winningLine && winningLine.includes(i) ? 'winning-row' : ''} // Highlights row that won the game
                        gameOver={gameOver}
                    />
                ))}
            </div>
        {gameOver &&
            <button className="restart-btn" onClick={() => restartGame()}>Restart Game</button>
        }
        </div>
    );
}
