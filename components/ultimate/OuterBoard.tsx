"use client";

import {useEffect, useState} from 'react';
import InnerBoard from '../InnerBoard';
import calculateWinner from "@/middleware/CalculateWinner";
import minimax from "@/middleware/UltimateAI";
import classes from "@/components/ultimate/ultimate-mode.module.css";

let MOVES = 0;

type GameState = 'AI' | 'Online' | 'Local';

// TODO: Complete Ultimate AI and Online play. Get the game state from the context.
export default function OuterBoard(this: any) {
    const gameState: GameState = 'Local';

    // Nested array of 9 inner boards, each with 9 squares.
    const [innerBoards, setInnerBoards] = useState(Array(9).fill(Array(9).fill(null)));

    // boardsWon represents which player has won the innerBoard at the index of the Array.
    const [boardsWon, setBoardsWon] = useState(Array(9).fill(null));

    // Player X starts the game. AI opponent defaults to O.
    const [xIsNext, setXIsNext] = useState(true); // X starts game

    // Keep track of the last moves made.
    const [lastYourMove, setLastYourMove] = useState<{i: number | null, j: number | null}>({ i: null, j: null });
    const [lastOpponentMove, setLastOpponentMove] = useState<{i: number | null, j: number | null}>({ i: null, j: null });
    const [lastBoardWon, setLastBoardWon] = useState<number | null>(null);

    // Start with all boards active, after click, set the active board to the index of the last clicked square,
    // if the index of the last clicked square has been won, reactivate all other non-won boards.
    const [activeBoard, setActiveBoard] = useState<number | null>(null);

    const [gameOver, setGameOver] = useState(false);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    // Check if the opponent should make a move every time a turn is made.
    useEffect(() => {
        // Only give opponent a turn when it's not your turn and the game is not over.
        if (!xIsNext && !gameOver) {
            new Promise(resolve => setTimeout(resolve)).then(opponentMove);
        }
    }, [xIsNext]);

    const handleInnerBoardClick = (boardIndex: number, squareIndex: number) => {
        // If it's not your turn, or gameState === 'AI' || gameState === 'Online', return.
        if (((gameState as GameState) !== 'Local') && !xIsNext) {
            return;
        }
        if (gameOver || boardsWon[boardIndex]) {
            return;
        }

        // Set the clicked square to X or O and update the innerBoards
        const newInnerBoards = innerBoards.slice();
        const newBoard = newInnerBoards[boardIndex].slice();
        newBoard[squareIndex] = xIsNext ? 'X' : 'O'; // Swaps player in case of local game.
        newInnerBoards[boardIndex] = newBoard;
        setInnerBoards(newInnerBoards);
        MOVES++;

        // Check if the innerBoard has been won and update the boardsWon array
        const winner = calculateWinner(newBoard);
        const newBoardsWon = boardsWon.slice();
        if (winner !== null && winner.winner === 'T') {
            newBoardsWon[boardIndex] = 'T';
            setLastBoardWon(boardIndex);
        } else if (winner) {
            newBoardsWon[boardIndex] = xIsNext ? 'X' : 'O';
            setLastBoardWon(boardIndex);
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
            if (xIsNext) { // TODO: Fix this for online play (who is X or O?)
                setLastYourMove({ i: null, j: null });
            } else {
                setLastOpponentMove({ i: null, j: null });
            }
            setGameOver(true);
        }
        if (xIsNext) { // TODO: Fix this for online play (who is X or O?)
            setLastYourMove({i: boardIndex, j: squareIndex });
        } else {
            setLastOpponentMove({i: boardIndex, j: squareIndex });
        }

        // Set up for next player
        if (newBoardsWon[squareIndex]) {
            setActiveBoard(null); // If the board has been won, make all the boards active
        } else {
            setActiveBoard(squareIndex); // Otherwise, only make the board that the player is being sent to active
        }
        setXIsNext(prevState => !prevState);
        return;
    };

    const opponentMove = () => {
        if (gameState === 'AI') {
            console.log('AI state');
            let bestMoveIndex = minimax(activeBoard, innerBoards, boardsWon);
            setLastOpponentMove(bestMoveIndex);
            let newInnerBoards = innerBoards.slice();
            let newBoard = newInnerBoards[bestMoveIndex.i].slice();
            newBoard[bestMoveIndex.j] = 'O';
            newInnerBoards[bestMoveIndex.i] = newBoard;
            setInnerBoards(newInnerBoards);
            MOVES++;

            // Check if the innerBoard has been won and update the boardsWon array.
            const winner = calculateWinner(newBoard);
            const newBoardsWon = boardsWon.slice();
            if (winner !== null && winner.winner === 'T') {
                newBoardsWon[bestMoveIndex.i] = 'T';
                setLastBoardWon(bestMoveIndex.i);
            } else if (winner) {
                newBoardsWon[bestMoveIndex.i] = xIsNext ? 'X' : 'O';
                setLastBoardWon(bestMoveIndex.i);
            }

            // Check if the game has been won.
            setBoardsWon(newBoardsWon);
            setActiveBoard(null);
            const gameWinner = calculateWinner(newBoardsWon);
            if (gameWinner) {
                if (gameWinner.winner === 'T') {
                    console.log('Tie game');
                }
                if (gameWinner.winner !== 'T') {
                    setWinningLine(gameWinner.line);
                }
                setLastOpponentMove({ i: null, j: null });
                setGameOver(true);
                return;
            }

            // Set up for next player.
            if (newBoardsWon[bestMoveIndex.j]) {
                setActiveBoard(null);
            } else {
                setActiveBoard(bestMoveIndex.j);
            }
            setXIsNext(true);
            return;
            // }, 0);
        }
        if (gameState === 'Online') {
            console.log('Online state');
        }
        if (gameState === 'Local') {
            console.log('Local state, shouldn\'t need to do anything in here');
        }
        // else local, nothing to do here.
    }

    const restartGame = () => {
        setInnerBoards(Array(9).fill(Array(9).fill(null)));
        setBoardsWon(Array(9).fill(null));
        setXIsNext(true);
        setActiveBoard(null);
        setWinningLine(null);
        setLastOpponentMove({ i: null, j: null });
        setLastYourMove({ i: null, j: null });
        MOVES = 0;
        setGameOver(false);
    }

    return (
        <div>
            <div className={classes.status}>
                {`Moves: ${MOVES} / 81 | `}
                {gameOver ? `Game Over` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <div className={classes.outerBoard}>
                {innerBoards.map((board, i) => {
                    return (
                        <InnerBoard
                            key={i}
                            value={board}
                            move={(squareIndex) => handleInnerBoardClick(i, squareIndex)}
                            disabled={activeBoard !== null && i !== activeBoard}
                            className={`${gameOver && winningLine && winningLine.includes(i) ? classes.winningRow : ''}`}
                            gameOver={gameOver}
                            winner={boardsWon[i] ? { winner: boardsWon[i] } : null}
                            lastOpponentMove={lastOpponentMove}
                            lastYourMove={lastYourMove}
                            outerIndex={i}
                            lastBoardWon={lastBoardWon}
                        />
                    )
                })}
            </div>
            {gameOver &&
                <button className={classes.restartBtn} onClick={() => restartGame()}>Restart Game</button>
            }
        </div>
    );
}
