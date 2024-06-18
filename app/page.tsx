"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import {GameContextProvider} from "@/middleware/GameContext";
import {useEffect} from "react";

let COUNT = 0;
export default function Home() {
    useEffect(() => {
        alert('Work in Progress! Online Mode and Ultimate AI are still being implemented. ' +
            'Classic AI, Classic and Ultimate Local Modes are available. Enjoy!');
    }, []);
    COUNT++;
    console.log('Home component rendered count:', COUNT);
    return (
    <GameContextProvider>
      {/*<main>*/}
          <div className="flex flex-wrap flex-col">
              <Dashboard />
          </div>
      {/*</main>*/}
    </GameContextProvider>
  );
}
