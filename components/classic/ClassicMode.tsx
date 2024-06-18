"use client";

import {useEffect, useState} from 'react';
import calculateWinner from "@/middleware/CalculateWinner";
import Square from "@/components/Square";
import minimax from "@/middleware/ClassicAI";
import classes from "@/components/classic/classic-mode.module.css";

let MOVES = 0;

export default function ClassicMode(this: any) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const [lastYourMove, setLastYourMove] = useState<number | null>(null);
    const [lastOpponentMove, setLastOpponentMove] = useState<number | null>( null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    useEffect(() => {
        if (!xIsNext && !gameOver) {
            makeAIMove();
        }
    }, [xIsNext]);

    const handleClick = (i: number) => {
        // if disabled or square already filled return (prevent the move)
        const newBoard = board.slice();
        if (calculateWinner(newBoard) || newBoard[i]) {
            return;
        }
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        if (xIsNext) {
            setLastYourMove(i);
        } else {
            setLastOpponentMove(i);
        }
        MOVES++;
        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            if (gameWinner.winner === 'T') {
                console.log('Tie game');
            }
            if (gameWinner.winner !== 'T') {
                setWinningLine(gameWinner.line);
                console.log('Winner:', gameWinner.winner);
            }
            setGameOver(true);
            return;
        }
        setXIsNext(!xIsNext);
    };

    const makeAIMove = () => {
        setTimeout(() => {
        let bestScore = -Infinity;
        let move = 0;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let score = minimax(board, 'X', -Infinity, Infinity);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        const newBoard = board.slice();
        newBoard[move] = 'O';
        setBoard(newBoard);
        setLastOpponentMove(move);
        MOVES++;
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
    }, 200)};

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinningLine(null);
        setLastYourMove(null);
        setLastOpponentMove(null);
        MOVES = 0;
        setGameOver(false);
    }

    return (
        <div>
            <div className={"status"}>
                {`Moves: ${MOVES} / 9 | `}
                {gameOver ? `Game Over` : `Next player: ${xIsNext ? 'X' : 'O'}`}

            </div>
            <div className={classes.innerBoardClassic}>
                {board.map((square, i) => (
                    <Square
                        key={i}
                        value={square}
                        move={() => handleClick(i)}
                        className={`${gameOver && winningLine && winningLine.includes(i) ? `${classes.winningRow}` : ''}
                        ${lastYourMove === i ? `${classes.lastYourMove}` : ''}
                        ${lastOpponentMove === i ? `${classes.lastOpponentMove}` : ''} ${classes.square}`}
                        lastOpponentMove={lastOpponentMove}
                        lastYourMove={lastYourMove}
                        mode={'classic'}
                    />
                ))}
            </div>
            {gameOver &&
                <button className={classes.restartBtn} onClick={() => restartGame()}>Restart Game</button>
            }
        </div>
    )
}