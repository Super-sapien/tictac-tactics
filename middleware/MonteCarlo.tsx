import calculateWinner from "@/middleware/CalculateWinner";

export class GameNode {
    public wins: number = 0;
    public visits: number = 0;
    public possibleMoves: { boardIndex: number, squareIndex: number }[] | null = null;

    constructor(public state: any, public parent: GameNode | null = null, public children: GameNode[] = []) {}

    // Add other methods as needed...
}

export class MCTS {
    private explorationParam: number = Math.sqrt(2);

    constructor(public root: GameNode) {}

    select(node: GameNode): GameNode {
        while (node.children.length > 0) {
            if (node.children.every(child => child.visits > 0)) {
                // All children have been visited, select the one with the highest UCT value
                node = node.children.reduce((maxNode, child) => {
                    const childUCT = this.calculateUCT(child);
                    const maxNodeUCT = this.calculateUCT(maxNode);
                    return childUCT > maxNodeUCT ? child : maxNode;
                });
            } else {
                // There are unvisited children, select one of them
                const unvisitedChildren = node.children.filter(child => child.visits === 0);
                node = unvisitedChildren[Math.floor(Math.random() * unvisitedChildren.length)];
            }
        }
        return node;
    }

    calculateUCT(node: GameNode): number {
        if (node.visits === 0) {
            // If the node has not been visited, return a high UCT value to prioritize it
            return Number.MAX_SAFE_INTEGER;
        }
        const exploitation = node.wins / node.visits;
        const exploration = this.explorationParam * Math.sqrt(Math.log(node.parent!.visits) / node.visits);
        return exploitation + exploration;
    }

    expand(node: GameNode): GameNode {
        const possibleMoves = this.generatePossibleMoves(node.state);
        for (const move of possibleMoves) {
            const newState = this.applyMove(node.state, move, 'O'); // Assuming 'O' is the AI player
            const child = new GameNode(newState, node);
            node.children.push(child);
        }
        return node.children[Math.floor(Math.random() * node.children.length)];
    }

// These methods are placeholders and need to be implemented
    generatePossibleMoves(state: { innerBoards: any[], boardsWon: any[], activeBoard: number | null }): { boardIndex: number, squareIndex: number }[] {
        let possibleMoves: { boardIndex: number, squareIndex: number }[] = [];

        for (let boardIndex = 0; boardIndex < state.innerBoards.length; boardIndex++) {
            // If the board has been won, or it's not the active board, skip it
            if (state.boardsWon[boardIndex] !== null || (state.activeBoard !== null && boardIndex !== state.activeBoard)) {
                continue;
            }

            for (let squareIndex = 0; squareIndex < state.innerBoards[boardIndex].length; squareIndex++) {
                // If the square has not been played yet, it's a possible move
                if (state.innerBoards[boardIndex][squareIndex] === null) {
                    possibleMoves.push({ boardIndex, squareIndex });
                }
            }
        }

        return possibleMoves;
    }

    // applyMove(state: { innerBoards: any[], boardsWon: any[], activeBoard: number | null },
    //           move: { boardIndex: number, squareIndex: number },
    //           player: 'X' | 'O'): // returns
    //     { innerBoards: any[], boardsWon: any[], activeBoard: number | null } {        // Copy the current state
    //     const newState = {
    //         innerBoards: state.innerBoards.map(board => board.slice()),
    //         boardsWon: state.boardsWon.slice(),
    //         activeBoard: state.activeBoard
    //     };
    //
    //     // Apply the move
    //     // newState.innerBoards[move.boardIndex][move.squareIndex] = 'O'; // Assuming 'O' is the AI player
    //     newState.innerBoards[move.boardIndex][move.squareIndex] = player;
    //
    //     // Check if the move resulted in the board being won
    //     const winner = calculateWinner(newState.innerBoards[move.boardIndex]);
    //     if (winner !== null && winner.winner === 'T') {
    //         newState.boardsWon[move.boardIndex] = 'T';
    //     } else if (winner) {
    //         newState.boardsWon[move.boardIndex] = 'O'; // Assuming 'O' is the AI player
    //     }
    //
    //     // Set the active board for the next move
    //     if (newState.boardsWon[move.squareIndex]) {
    //         newState.activeBoard = null; // If the board has been won, make all the boards active
    //     } else {
    //         newState.activeBoard = move.squareIndex; // Otherwise, only make the board that the player is being sent to active
    //     }
    //
    //     return newState;
    // }

    applyMove(state: { innerBoards: any[], boardsWon: any[], activeBoard: number | null },
              move: { boardIndex: number, squareIndex: number },
              player: 'X' | 'O'): // returns
        { innerBoards: any[], boardsWon: any[], activeBoard: number | null } {        // Copy the current state
        const newState = {
            innerBoards: state.innerBoards.map(board => board.slice()),
            boardsWon: state.boardsWon.slice(),
            activeBoard: state.activeBoard
        };

        // Apply the move
        newState.innerBoards[move.boardIndex][move.squareIndex] = player;

        // Check if the move resulted in the inner board being won
        const innerWinner = calculateWinner(newState.innerBoards[move.boardIndex]);
        if (innerWinner !== null && innerWinner.winner === 'T') {
            newState.boardsWon[move.boardIndex] = 'T';
        } else if (innerWinner) {
            newState.boardsWon[move.boardIndex] = player;
        }

        // Check if the move resulted in the game being won
        const gameWinner = calculateWinner(newState.boardsWon);
        if (gameWinner) {
            newState.activeBoard = null; // If the game has been won, no active board
        } else if (newState.boardsWon[move.squareIndex]) {
            newState.activeBoard = null; // If the board has been won, make all the boards active
        } else {
            newState.activeBoard = move.squareIndex; // Otherwise, only make the board that the player is being sent to active
        }

        return newState;
    }

    // simulate(node: GameNode): 'X' | 'O' | 'T' {
    //     let state = node.state;
    //     while (!this.isGameOver(state)) {
    //         const possibleMoves = this.generatePossibleMoves(state);
    //         const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    //         state = this.applyMove(state, move);
    //     }
    //     return this.getOutcome(state);
    // }

    simulate(node: GameNode): 'X' | 'O' | 'T' {
        let state = node.state;
        let player: 'X' | 'O' = 'O'; // Assuming 'O' is the AI player
        while (calculateWinner(state.boardsWon) === null && this.generatePossibleMoves(state).length > 0) {
            const possibleMoves = this.generatePossibleMoves(state);
            const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            state = this.applyMove(state, move, player);
            player = player === 'O' ? 'X' : 'O'; // Switch player
        }
        return this.getOutcome(state);
    }

// These methods are placeholders and need to be implemented
//     isGameOver(state: any): boolean {
//         // Check if the game is over
//         // This is game-specific and needs to be implemented
//         return false;
//     }

    getOutcome(state: { innerBoards: any[], boardsWon: any[], activeBoard: number | null }): 'X' | 'O' | 'T' {
        const winner = calculateWinner(state.boardsWon);
        if (winner !== null) {
            if (winner.winner === 'T') {
                return 'T'; // The game is a tie
            } else {
                return winner.winner; // The winner of the game
            }
        }
        return 'T'; // Default to tie if no winner is found
    }

    backpropagate(node: GameNode | null, result: 'X' | 'O' | 'T'): void {
        while (node !== null) {
            node.visits++;
            if (result === 'O') { // Assuming 'O' is the AI player
                node.wins++;
            }
            node = node.parent;
        }
    }

    run(): void {
        const startTime = Date.now();
        const timeLimit = 1000; // Run for 1000 milliseconds
        while (Date.now() - startTime < timeLimit) {
            let leaf = this.select(this.root);
            let child = this.expand(leaf);
            let simulationResult = this.simulate(child);
            this.backpropagate(child, simulationResult);
        }
    }

    getBestMove(): GameNode {
        return this.root.children.reduce((bestChild, child) => {
            return child.visits > bestChild.visits ? child : bestChild;
        });
    }

    getRandomMove(): GameNode {
        const possibleMoves = this.generatePossibleMoves(this.root.state);
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return new GameNode(this.applyMove(this.root.state, randomMove, 'O'), this.root);
    }
}