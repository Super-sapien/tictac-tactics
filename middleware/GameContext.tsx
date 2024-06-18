import React, { useState, ReactNode } from 'react';

// Define a type for the context value
interface GameContextType {
    gameType: string;
    opponentType: string;
    connectionType: string;
    isHost: boolean;
    setGameType: React.Dispatch<React.SetStateAction<string>>;
    setOpponentType: React.Dispatch<React.SetStateAction<string>>;
    setConnectionType: React.Dispatch<React.SetStateAction<string>>;
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with the defined type
export const GameContext = React.createContext<GameContextType>({
    gameType: '',
    opponentType: '',
    connectionType: '',
    isHost: false,
    setGameType: () => {},
    setOpponentType: () => {},
    setConnectionType: () => {},
    setIsHost: () => {},
});

interface GameContextProviderProps {
    children: ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [gameType, setGameType] = useState<string>('');
    const [opponentType, setOpponentType] = useState<string>('');
    const [connectionType, setConnectionType] = useState<string>('');
    const [isHost, setIsHost] = useState(false); // Add this line


    return (
        <GameContext.Provider value={{ gameType, setGameType, opponentType, setOpponentType, connectionType,
            setConnectionType, isHost, setIsHost }}>
            {children}
        </GameContext.Provider>
    );
};