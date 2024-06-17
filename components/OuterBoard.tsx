"use client";

import {useEffect, useState} from 'react';
import InnerBoard from './InnerBoard';
import calculateWinner from "@/middleware/CalculateWinner";
import bestMove from "@/middleware/Minimax";
// import { MCTS, GameNode } from "@/middleware/MonteCarlo";

let MOVES = 0;

// TODO: Build AI to play against. Highlight AI's last move.
// TODO: If the last move won a board, highlight the board.
export default function OuterBoard() {
    // Nested array of 9 inner boards, each with 9 squares.
    const [innerBoards, setInnerBoards] = useState(Array(9).fill(Array(9).fill(null)));

    // boardsWon represents which player has won the innerBoard at the index of the Array.
    const [boardsWon, setBoardsWon] = useState(Array(9).fill(null));

    // Human plays as X, AI plays as O.
    const [xIsNext, setXIsNext] = useState(true); // X starts game

    // Keep track of the last moves made.
    const [lastHumanMove, setLastHumanMove] = useState<{i: number | null, j: number | null}>({ i: null, j: null });
    const [lastAIMove, setLastAIMove] = useState<{i: number | null, j: number | null}>({ i: null, j: null });
    const [lastBoardWon, setLastBoardWon] = useState<number | null>(null);

    // Start with all boards active, after click, set the active board to the index of the last clicked square,
    // if the index of the last clicked square has been won, reactivate all other non-won boards.
    const [activeBoard, setActiveBoard] = useState<number | null>(null);

    const [gameOver, setGameOver] = useState(false);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    // Check if the AI should make a move after every update to the game.
    useEffect(() => {
        // Only make the AI move when it's the AI's turn and the game is not over.
        if (!xIsNext && !gameOver) {
            new Promise(resolve => setTimeout(resolve)).then(makeAIMove);
        }
    }, [xIsNext]);

    const handleInnerBoardClick = (boardIndex: number, squareIndex: number) => {
        // If it's not the player's turn, return until the AI has made a move.
        if (!xIsNext) {
            return;
        }
        // If the game is over or the board has been won, return.
        if (gameOver || boardsWon[boardIndex]) {
            return;
        }

        // Set the clicked square to X or O and update the innerBoards.
        const newInnerBoards = innerBoards.slice();
        const newBoard = newInnerBoards[boardIndex].slice();
        newBoard[squareIndex] = xIsNext ? 'X' : 'O';
        newInnerBoards[boardIndex] = newBoard;
        setInnerBoards(newInnerBoards);
        MOVES++;

        // Check if the innerBoard has been won and update the boardsWon array
        const winner = calculateWinner(newBoard);
        // const winner = calculateWinner({
        //     innerBoards: newInnerBoards,
        //     boardsWon: boardsWon,
        //     activeBoard: activeBoard
        // });

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
        const gameWinner = calculateWinner(newBoardsWon); // ,newBoardsWon[boardIndex] // is player
        // const gameWinner = calculateWinner({
        //     innerBoards: newInnerBoards,
        //     boardsWon: newBoardsWon,
        //     activeBoard: activeBoard
        // });
        if (gameWinner) {
            console.log('heey ya won')
            if (gameWinner.winner === 'T') {
                console.log('Tie game');
            }
            if (gameWinner.winner !== 'T') {
                setWinningLine(gameWinner.line);
            }
            setLastHumanMove({ i: null, j: null });
            setGameOver(true);
            return;
        }

        // Set up for next player.
        if (newBoardsWon[squareIndex]) {
            setActiveBoard(null); // If the board has been won, make all the boards active
        } else {
            setActiveBoard(squareIndex); // Otherwise, only make the board that the player is being sent to active
        }
        setLastHumanMove({i: boardIndex, j: squareIndex });
        setXIsNext(!xIsNext);
        return;
    };

    const makeAIMove = () => {
        // setTimeout(() => {


        // If the middle square is available in the early game, take it.
        // if (MOVES <= 2 && activeBoard !== null) {
        //     if (innerBoards[activeBoard][4] == null) {
        //         let newInnerBoards = innerBoards.slice();
        //         let newBoard = newInnerBoards[activeBoard].slice();
        //         newBoard[4] = 'O';
        //         newInnerBoards[activeBoard] = newBoard;
        //         setInnerBoards(newInnerBoards);
        //         MOVES++;
        //         setBoardsWon(boardsWon);
        //         setActiveBoard(4);
        //         setXIsNext(true);
        //         return;
        //     }
        // }

        // Get the best move from the AI.
        let bestMoveIndex = bestMove(activeBoard, innerBoards, boardsWon);
        setLastAIMove(bestMoveIndex);
        console.log('best move index', bestMoveIndex);
        let newInnerBoards = innerBoards.slice();
        let newBoard = newInnerBoards[bestMoveIndex.i].slice();
        newBoard[bestMoveIndex.j] = 'O';
        newInnerBoards[bestMoveIndex.i] = newBoard;
        setInnerBoards(newInnerBoards);
        MOVES++;
        // console.log('new inner boards after ai move', newInnerBoards);

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
            setLastAIMove({ i: null, j: null });
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


    // const makeAIMove = () => {
    //     // Create a new GameNode with the current game state
    //     const currentState = {
    //         innerBoards: innerBoards,
    //         boardsWon: boardsWon,
    //         activeBoard: activeBoard
    //     };
    //     const rootNode = new GameNode(currentState);
    //
    //     // Run the MCTS algorithm and get the best move
    //     const mcts = new MCTS(rootNode);
    //     mcts.run();
    //     const bestMove = mcts.getBestMove();
    //
    //     // Apply the best move to the game state
    //     let newInnerBoards = innerBoards.slice();
    //     let newBoard = newInnerBoards[bestMove.state.boardIndex].slice();
    //     newBoard[bestMove.state.squareIndex] = 'O';
    //     newInnerBoards[bestMove.state.boardIndex] = newBoard;
    //     setInnerBoards(newInnerBoards);
    //     MOVES++;
    //
    //     // Check if the innerBoard has been won and update the boardsWon array
    //     const winner = calculateWinner(newBoard);
    //     const newBoardsWon = boardsWon.slice();
    //     if (winner !== null && winner.winner === 'T') {
    //         newBoardsWon[bestMove.state.boardIndex] = 'T';
    //     } else if (winner) {
    //         newBoardsWon[bestMove.state.boardIndex] = 'O';
    //     }
    //
    //     // Check if the game has been won
    //     setBoardsWon(newBoardsWon);
    //     setActiveBoard(null);
    //     const gameWinner = calculateWinner(newBoardsWon);
    //     if (gameWinner) {
    //         if (gameWinner.winner === 'T') {
    //             console.log('Tie game');
    //         }
    //         if (gameWinner.winner !== 'T') {
    //             setWinningLine(gameWinner.line);
    //         }
    //         setGameOver(true);
    //         return;
    //     }
    //
    //     // Set up for next player
    //     if (newBoardsWon[bestMove.state.squareIndex]) {
    //         setActiveBoard(null);
    //     } else {
    //         setActiveBoard(bestMove.state.squareIndex);
    //     }
    //     setXIsNext(true);
    //     return;
    // }

    // const makeAIMove = () => {
    //     // Create a new GameNode with the current game state
    //     const currentState = {
    //         innerBoards: innerBoards,
    //         boardsWon: boardsWon,
    //         activeBoard: activeBoard
    //     };
    //     const rootNode = new GameNode(currentState);
    //
    //     // Run the MCTS algorithm and get the best move
    //     const mcts = new MCTS(rootNode);
    //     mcts.run();
    //     let bestMove = mcts.getBestMove();
    //
    //     // Check if bestMove and bestMove.state are not undefined
    //     if (bestMove && bestMove.state) {
    //         // Apply the best move to the game state
    //         // Check if bestMove.state.boardIndex is not undefined and is a valid index for newInnerBoards
    //         if (bestMove.state.boardIndex !== undefined && bestMove.state.boardIndex < innerBoards.length) {
    //             let newInnerBoards = innerBoards.slice();
    //             let newBoard = newInnerBoards[bestMove.state.boardIndex].slice();
    //             newBoard[bestMove.state.squareIndex] = 'O';
    //             newInnerBoards[bestMove.state.boardIndex] = newBoard;
    //             setInnerBoards(newInnerBoards);
    //             MOVES++;
    //
    //             // Check if the innerBoard has been won and update the boardsWon array
    //             const winner = calculateWinner(newBoard);
    //             // const winner = calculateWinner({
    //             //     innerBoards: newInnerBoards,
    //             //     boardsWon: boardsWon,
    //             //     activeBoard: activeBoard
    //             // });
    //             const newBoardsWon = boardsWon.slice();
    //             if (winner !== null && winner.winner === 'T') {
    //                 newBoardsWon[bestMove.state.boardIndex] = 'T';
    //             } else if (winner) {
    //                 newBoardsWon[bestMove.state.boardIndex] = 'O';
    //             }
    //
    //             // Check if the game has been won
    //             setBoardsWon(newBoardsWon);
    //             setActiveBoard(null);
    //             const gameWinner = calculateWinner(newBoardsWon);
    //             // const gameWinner = calculateWinner({
    //             //     innerBoards: newInnerBoards,
    //             //     boardsWon: newBoardsWon,
    //             //     activeBoard: activeBoard
    //             // });
    //             if (gameWinner) {
    //                 if (gameWinner.winner === 'T') {
    //                     console.log('Tie game');
    //                 }
    //                 if (gameWinner.winner !== 'T') {
    //                     setWinningLine(gameWinner.line);
    //                 }
    //                 setGameOver(true);
    //                 return;
    //             }
    //
    //             // Set up for next player
    //             if (newBoardsWon[bestMove.state.squareIndex]) {
    //                 setActiveBoard(null);
    //             } else {
    //                 setActiveBoard(bestMove.state.squareIndex);
    //             }
    //             setXIsNext(true);
    //             return;
    //         } else {
    //             // Handle the case where bestMove.state.boardIndex is undefined or out of bounds
    //             console.error('Error: bestMove.state.boardIndex is undefined or out of bounds');
    //             bestMove = mcts.getRandomMove()
    //         }
    //     } else {
    //         // Handle the case where bestMove or bestMove.state is undefined
    //         console.error('Error: bestMove or bestMove.state is undefined');
    //         bestMove = mcts.getRandomMove();
    //     }
    //     let newInnerBoards = innerBoards.slice();
    //     let newBoard = newInnerBoards[bestMove.state.boardIndex].slice();
    //     newBoard[bestMove.state.squareIndex] = 'O';
    //     newInnerBoards[bestMove.state.boardIndex] = newBoard;
    //     setInnerBoards(newInnerBoards);
    //     MOVES++;
    //
    //     // Check if the innerBoard has been won and update the boardsWon array
    //     const winner = calculateWinner(newBoard);
    //     // const winner = calculateWinner({
    //     //     innerBoards: newInnerBoards,
    //     //     boardsWon: boardsWon,
    //     //     activeBoard: activeBoard
    //     // });
    //     const newBoardsWon = boardsWon.slice();
    //     if (winner !== null && winner.winner === 'T') {
    //         newBoardsWon[bestMove.state.boardIndex] = 'T';
    //     } else if (winner) {
    //         newBoardsWon[bestMove.state.boardIndex] = 'O';
    //     }
    //
    //     // Check if the game has been won
    //     setBoardsWon(newBoardsWon);
    //     setActiveBoard(null);
    //     const gameWinner = calculateWinner(newBoardsWon);
    //     // const gameWinner = calculateWinner({
    //     //     innerBoards: newInnerBoards,
    //     //     boardsWon: newBoardsWon,
    //     //     activeBoard: activeBoard
    //     // });
    //     if (gameWinner) {
    //         if (gameWinner.winner === 'T') {
    //             console.log('Tie game');
    //         }
    //         if (gameWinner.winner !== 'T') {
    //             setWinningLine(gameWinner.line);
    //         }
    //         setGameOver(true);
    //         return;
    //     }
    //
    //     // Set up for next player
    //     if (newBoardsWon[bestMove.state.squareIndex]) {
    //         setActiveBoard(null);
    //     } else {
    //         setActiveBoard(bestMove.state.squareIndex);
    //     }
    //     setXIsNext(true);
    //     return;
    // }


    const restartGame = () => {
        setInnerBoards(Array(9).fill(Array(9).fill(null)));
        setBoardsWon(Array(9).fill(null));
        setXIsNext(true);
        setActiveBoard(null);
        setWinningLine(null);
        setLastAIMove({ i: null, j: null });
        setLastHumanMove({ i: null, j: null });
        setGameOver(false);
        MOVES = 0;
    }

    return (
        <div>
            <h1>TicTac TacTics</h1>
            <div className="status">
                {gameOver ? `Game Over` : `Next player: ${xIsNext ? 'X' : 'O'}`}
            {/*    . Winner: ${xIsNext ? 'O' : 'X'}` */}
            </div>
            <div className="outer-board">
                {innerBoards.map((board, i) => {
                    return (
                        <InnerBoard
                            key={i}
                            value={board}
                            move={(squareIndex) => handleInnerBoardClick(i, squareIndex)}
                            disabled={activeBoard !== null && i !== activeBoard}
                            className={`${gameOver && winningLine && winningLine.includes(i) ? 'winning-row' : ''}`}
                            gameOver={gameOver}
                            winner={boardsWon[i] ? { winner: boardsWon[i] } : null}
                            lastAIMove={lastAIMove}
                            lastHumanMove={lastHumanMove}
                            outerIndex={i}
                            lastBoardWon={lastBoardWon}
                        />
                    )
                })}
            </div>
        {gameOver &&
            <button className="restart-btn" onClick={() => restartGame()}>Restart Game</button>
        }
        </div>
    );
}
