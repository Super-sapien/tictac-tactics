import React, { useContext } from 'react';
import { GameContext } from '@/middleware/GameContext';
import classes from '@/components/dashboard/dashboard.module.css';

export default function Dashboard() {
    const { gameType, setGameType, opponentType,
        setOpponentType, connectionType, setConnectionType,
        isHost, setIsHost } = useContext(GameContext);

    const handleGameToggle = (toggleValue: string) => {
        setGameType(toggleValue);
    }

    const handleOpponentToggle = (toggleValue: string) => {
        setOpponentType(toggleValue);
        if (toggleValue === 'AI') {
            setConnectionType('Local'); // Set location to 'Local' when 'AI' is selected
        }
    }

    const handleConnectionToggle = (toggleValue: string) => {
        setConnectionType(toggleValue);
    }

    const handleHostToggle = (toggleValue: boolean) => {
        setIsHost(toggleValue);
    }

    const handleButtonClick = () => {
        if (gameType === '' || opponentType === '' || connectionType === '') {
            return;
        }
        let selection: string;
        if (connectionType === 'Online') {
            selection = `${gameType}-${opponentType}-${connectionType}-${isHost ? 'Host' : 'Join'}`;
        } else {
            selection = `${gameType}-${opponentType}-${connectionType}`;
        }

        switch (selection) {
            case 'Classic-AI-Local':
                setGameType('Classic');
                setOpponentType('AI');
                setConnectionType('Local');
                window.location.href = '/Classic';
                break;
            case 'Ultimate-AI-Local':
                setGameType('Ultimate');
                setOpponentType('AI');
                setConnectionType('Local');
                window.location.href = '/Ultimate';
                break;
            case 'Classic-Human-Online-Host':
                setGameType('Classic');
                setOpponentType('Human');
                setConnectionType('Online');
                setIsHost(true);
                window.location.href = '/Classic';
                break;
            case 'Classic-Human-Online-Join':
                setGameType('Classic');
                setOpponentType('Human');
                setConnectionType('Online');
                setIsHost(false);
                window.location.href = '/Classic';
                break;
            case 'Classic-Human-Local':
                setGameType('Classic');
                setOpponentType('Human');
                setConnectionType('Local');
                window.location.href = '/Classic';
                break;
            case 'Ultimate-Human-Online-Host':
                setGameType('Ultimate');
                setOpponentType('Human');
                setConnectionType('Online');
                setIsHost(true);
                window.location.href = '/Ultimate';
                break;
            case 'Ultimate-Human-Online-Join':
                setGameType('Ultimate');
                setOpponentType('Human');
                setConnectionType('Online');
                setIsHost(false);
                window.location.href = '/Ultimate';
                break;
            case 'Ultimate-Human-Local':
                setGameType('Ultimate');
                setOpponentType('Human');
                setConnectionType('Local');
                window.location.href = '/Ultimate';
                break;
            default:
                // TODO: Handle any errors
                console.log('Error, selection is:', selection);
                break;
        }
    }

    return (
        <>
            <div className="menu-screen">
                <div className={`${classes.row}`}>
                    <div className={`${classes.description}`}>
                        Game Mode
                    </div>
                    <div className={`${classes.buttonRow}`}>
                    <input type="radio" id="classic" className={`${classes.radioButtonInput}`}
                           checked={gameType === 'Classic'}
                           onChange={() => handleGameToggle('Classic')}/>
                    <label htmlFor="classic" className={`${classes.radioButtonLabel}`}>
                        Classic
                    </label>
                    <input type="radio" id="ultimate" className={`${classes.radioButtonInput}`}
                           checked={gameType === 'Ultimate'}
                           onChange={() => handleGameToggle('Ultimate')}/>
                    <label htmlFor="ultimate" className={`${classes.radioButtonLabel}`}>
                        Ultimate
                    </label>
                    </div>
                </div>
                <div className={`${classes.row}`}>
                    <div className={`${classes.description}`}>
                        Opponent
                    </div>
                    <div className={`${classes.buttonRow}`}>
                    <input type="radio" id="ai" className={`${classes.radioButtonInput}`}
                           checked={opponentType === 'AI'}
                           onChange={() => handleOpponentToggle('AI')}/>
                    <label htmlFor="ai" className={`${classes.radioButtonLabel}`}>
                        AI
                    </label>
                    <input type="radio" id="human" className={`${classes.radioButtonInput}`}
                           checked={opponentType === 'Human'}
                           onChange={() => handleOpponentToggle('Human')}/>
                    <label htmlFor="human" className={`${classes.radioButtonLabel}`}>
                        Human
                    </label>
                    </div>
                </div>
                <div className={`${classes.row}`}>
                    <div className={`${classes.description}`}>
                        Connection
                    </div>
                    <div className={`${classes.buttonRow}`}>
                    <input type="radio" id="local" className={`${classes.radioButtonInput}`}
                           checked={connectionType === 'Local'}
                           onChange={() => handleConnectionToggle('Local')}/>
                    <label htmlFor="local" className={`${classes.radioButtonLabel}`}>
                        Local
                    </label>
                    <input type="radio" id="online" className={`${classes.radioButtonInput}`}
                           checked={connectionType === 'Online'}
                           onChange={() => handleConnectionToggle('Online')}
                           disabled={opponentType === 'AI'}/> {/* Disable 'Online' when 'AI' is selected */}
                    <label htmlFor="online" className={`${classes.radioButtonLabel}`}>
                        Online
                    </label>
                    </div>
                </div>
                {connectionType === 'Online' && (
                    <div className={`${classes.row}`}
                         style={{visibility: connectionType === 'Online' ? 'visible' : 'hidden'}}>
                        <div className={`${classes.description}`}>
                            Role
                        </div>
                        <div className={`${classes.buttonRow}`}>
                            <input type="radio" id="host" className={`${classes.radioButtonInput}`}
                                   checked={isHost}
                                   onChange={() => handleHostToggle(true)}/>
                            <label htmlFor="host" className={`${classes.radioButtonLabel}`}>
                                Host
                            </label>
                            <input type="radio" id="join" className={`${classes.radioButtonInput}`}
                                   checked={!isHost}
                                   onChange={() => handleHostToggle(false)}/>
                            <label htmlFor="join" className={`${classes.radioButtonLabel}`}>
                                Join
                            </label>
                        </div>
                    </div>
                )}
                <div className={`${classes.startButton}`}>
                    <button onClick={handleButtonClick}>Start Game</button>
                </div>
            </div>
        </>
    );
};
