import React from "react";

const Block = ({ isLive, toggleHandler }) => {
  return (
    <div className="">
      <div className=" bg-purple-700 bg-opacity-80 p-1">
        <div
          onClick={toggleHandler}
          className={`transition-all duration-500 w-8 h-8 flex align-middle justify-center cursor-pointer hover:bg-white hover:opacity-50 ${
            isLive ? "bg-white opacity-50" : "bg-[#111111]"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Block;
