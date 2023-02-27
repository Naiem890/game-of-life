import React from "react";
import Block from "./Block";

const BlockRow = ({ data, row, toggleHandler }) => {
  return (
    <div className="flex gap-1">
      {data.map((block, col) => {
        return (
          <Block
            toggleHandler={() => toggleHandler(block, [row, col])}
            position={[row, col]}
            isLive={block}
          />
        );
      })}
    </div>
  );
};

export default BlockRow;
