import React from "react";

const BlockResize = ({
  size,
  sizeChangeHandler,
  speed,
  speedChangeHandler,
}) => {
  return (
    <div className="flex justify-center items-center gap-8">
      <div className="w-80">
        <input
          id="minmax-range"
          type="range"
          min="5"
          step="1"
          max="20"
          value={size}
          onChange={(e) => sizeChangeHandler(e.target.value)}
          class="w-full h-2 bg-gray-200  rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div>
        <select
          value={speed}
          onChange={(e) => speedChangeHandler(e.target.value)}
          className="p-3 rounded-md font-bold"
          name="speed"
        >
          <option value="1">1 X</option>
          <option value="2">2 X</option>
          <option value="3">3 X</option>
          <option value="4">4 X</option>
        </select>
      </div>
    </div>
  );
};

export default BlockResize;
