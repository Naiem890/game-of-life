import React, { useCallback, useEffect, useState } from "react";
import BlockRow from "./BlockRow";

const Game = ({ size, speed }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocks, setBlocks] = useState(
    new Array(+size).fill(0).map(() => new Array(+size).fill(0))
  );
  const calculateAliveNeighbour = (updatedBlocksData, i, j) => {
    let a1 = 0;
    let a2 = 0;
    let a3 = 0;
    let a4 = 0;
    let a5 = 0;
    let a6 = 0;
    let a7 = 0;
    let a8 = 0;

    if (j - 1 >= 0) {
      a1 = updatedBlocksData[i][j - 1]; // left
    }
    if (j + 1 < updatedBlocksData.length) {
      a2 = updatedBlocksData[i][j + 1]; // right
    }
    if (i + 1 < updatedBlocksData.length) {
      a3 = updatedBlocksData[i + 1][j]; // up
    }
    if (i - 1 >= 0) {
      a4 = updatedBlocksData[i - 1][j]; // down
    }
    if (i - 1 >= 0 && j - 1 >= 0) {
      a5 = updatedBlocksData[i - 1][j - 1]; // right up
    }
    if (i - 1 >= 0 && j + 1 < updatedBlocksData.length) {
      a6 = updatedBlocksData[i - 1][j + 1]; // left up
    }
    if (i + 1 < updatedBlocksData.length && j - 1 >= 0) {
      a7 = updatedBlocksData[i + 1][j - 1]; // left down
    }
    if (
      (i + 1 < updatedBlocksData.length) &
      (j + 1 < updatedBlocksData.length)
    ) {
      a8 = updatedBlocksData[i + 1][j + 1]; // right down
    }
    const aliveNeighbour = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;

    return aliveNeighbour;
  };

  const generateBlocks = useCallback(() => {
    const copyBlocksData = blocks.map((b) => b.slice());
    const updatedBlocksData = blocks.map((b) => b.slice());

    for (let i = 0; i < updatedBlocksData.length; i++) {
      // row
      const row = updatedBlocksData[i];

      for (let j = 0; j < row.length; j++) {
        // col
        const isLive = row[j];

        let aliveNeighbour = calculateAliveNeighbour(copyBlocksData, i, j);

        if (isLive & (aliveNeighbour === 2 || aliveNeighbour === 3)) {
          updatedBlocksData[i][j] = 1;
        } else if (isLive & (aliveNeighbour > 3)) {
          updatedBlocksData[i][j] = 0;
        } else if (isLive & (aliveNeighbour < 2)) {
          updatedBlocksData[i][j] = 0;
        } else if (!isLive & (aliveNeighbour === 3)) {
          updatedBlocksData[i][j] = 1;
        }

        console.log(
          `${i + 1}x${j + 1}=>`,
          aliveNeighbour,
          updatedBlocksData[i][j]
        );
      }
    }

    console.log(updatedBlocksData);
    setBlocks(updatedBlocksData);
  }, [blocks]);

  useEffect(() => {
    setIsPlaying(false);
    setBlocks(new Array(+size).fill(0).map(() => new Array(+size).fill(0)));
  }, [size]);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setTimeout(generateBlocks, 1000 / speed);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [generateBlocks, isPlaying, speed]);

  const toggleHandler = useCallback(
    (currentValue, [row, col]) => {
      const updatedBlocksData = blocks.map((b) => b.slice());

      updatedBlocksData[row][col] = currentValue ? 0 : 1;

      setBlocks(updatedBlocksData);
    },
    [blocks]
  );

  return (
    <div className="mx-auto mt-10 flex flex-col justify-center">
      <div className="flex gap-1 flex-col">
        {blocks.map((row, rowIndex) => {
          return (
            <BlockRow toggleHandler={toggleHandler} row={rowIndex} data={row} />
          );
        })}
      </div>
      <div></div>

      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="mt-10 m-2 p-6 text-white text-2xl uppercase font-bold font-mono rounded-xl transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
      >
        {isPlaying ? "Stop Game" : "Start Game"}
      </button>
    </div>
  );
};

export default Game;
