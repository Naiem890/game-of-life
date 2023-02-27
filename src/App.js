import { useState } from "react";
import "./App.css";
import GameController from "./components/GameController";
import Game from "./components/Game";

function App() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(1);

  const sizeChangeHandler = (value) => {
    setSize(+value);
  };

  const speedChangeHandler = (value) => {
    setSpeed(+value);
  };

  console.log(size);
  return (
    <div className="flex mx-auto flex-col align-middle justify-center h-screen">
      <GameController
        size={size}
        sizeChangeHandler={sizeChangeHandler}
        speed={speed}
        speedChangeHandler={speedChangeHandler}
      />
      <Game speed={speed} size={size} />
    </div>
  );
}

export default App;
