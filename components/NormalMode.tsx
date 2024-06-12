"use client";

import {useEffect, useState} from 'react';
import calculateWinner from "@/middleware/CalculateWinner";
import Square from "@/components/Square";
import minimax from "@/middleware/Normal-AI";

export default function NormalMode(this: any) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // const gameWinner = calculateWinner(board);
        // if (gameWinner) {
        //     if (gameWinner.winner === 'T') {
        //         console.log('Tie game');
        //     }
        //     if (gameWinner.winner !== 'T') {
        //         console.log('Winner:', gameWinner.winner);
        //     }
        //     setGameOver(true);
        //     return;
        // }
        if (!xIsNext && !gameOver) {
            makeAIMove();
        }
    }, [board, xIsNext]);

    const handleClick = (i: number) => {
        // if disabled or square already filled return (prevent the move)
        const newBoard = board.slice();
        if (calculateWinner(newBoard) || newBoard[i]) {
            return;
        }
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            if (gameWinner.winner === 'T') {
                console.log('Tie game');
            }
            if (gameWinner.winner !== 'T') {
                console.log('Winner:', gameWinner.winner);
            }
            setGameOver(true);
            return;
        }

        setXIsNext(!xIsNext);
    };

    // const makeAIMove = () => {
    //     const move = minimax(board, 'O');
    //     const newBoard = board.slice();
    //     newBoard[move] = 'O';
    //     setBoard(newBoard);
    //     setXIsNext(!xIsNext);
    // }

    const makeAIMove = () => {
        let bestScore = -Infinity;
        let move = 0;
        // const weights = [3, 2, 3, 2, 4, 2, 3, 2, 3]; // prioritize middle, then corners, then sides

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                // let score = minimax(board, 'X') * weights[i];
                let score = minimax(board, 'X', -Infinity, Infinity);
                board[i] = null;

                // console.log(`Move: ${i}, Score: ${score}`);

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        console.log(`AI's move: ${move}, Best score: ${bestScore}`); // Log the chosen move and the best score

        const newBoard = board.slice();
        newBoard[move] = 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            if (gameWinner.winner === 'T') {
                console.log('Tie game');
            }
            if (gameWinner.winner !== 'T') {
                console.log('Winner:', gameWinner.winner);
            }
            setGameOver(true);
            return;
        }
    }

    // const winner = calculateWinner(board[i]);
    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setGameOver(false);
    }

    return (
        <div className={"main"}>
            <h1>TicTacToe</h1>
            <div className={"status"}>
                {gameOver ? `Game Over` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <div className={"inner-board"}>
                {board.map((square, i) => (
                    <Square
                        key={i}
                        value={square}
                        move={() => handleClick(i)}
                    />
                ))}
            </div>
            {gameOver &&
                <button className="restart-btn" onClick={() => restartGame()}>Restart Game</button>
            }
        </div>
    )
}