"use client";

import Dashboard from "@/components/dashboard/Dashboard";
// import {GameContextProvider} from "@/middleware/GameContext";
import React, {useContext, useEffect} from "react";
import {GameContext} from "@/middleware/GameContext";
import OuterBoard from "@/components/ultimate/OuterBoard";
import ClassicMode from "@/components/classic/ClassicMode";


let COUNT = 0;
export default function Home() {
    useEffect(() => {
        alert('Work in Progress! Online Mode and Ultimate AI are still being implemented. ' +
            'Classic AI, Classic and Ultimate Local Modes are available. Enjoy!');
    }, []);


    const { gameType, gameStarted } = useContext(GameContext);
    COUNT++;
    console.log('Home component rendered count:', COUNT);
    return (
    // <GameContextProvider>
          <div className="flex flex-wrap flex-col">
              {!gameStarted && <Dashboard />}
              {gameStarted && (gameType === 'Classic' ? <ClassicMode /> : <OuterBoard />)}
              {/*{*/}
              {/*<OuterBoard />*/}
              {/*}*/}
              {/*{*/}
              {/*<ClassicMode />*/}
              {/*}*/}
          </div>
    // </GameContextProvider>
  );
}
