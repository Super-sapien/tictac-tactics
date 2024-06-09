
import OuterBoard from "@/components/OuterBoard";
import GameStatus from "@/components/GameStatus";

// TODO: fix errors: 11-13 moves - Winner: X? If make move that ends game, winner who ended wins?
export default function Home() {
  return (
      <main>
          {/*<h1>TicTac TacTics</h1>*/}
          {/*<> TODO: tab selection for Local, Online, AI, About </>*/}
          {/*<GameStatus/>*/}
          <OuterBoard/>
      </main>
  );
}
