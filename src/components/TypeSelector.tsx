import { useState } from "react";

const TypeSelector = () => {
  const [type, setType] = useState("together");

  return (
    <div className="bg-white p-[2px] rounded-[5px] flex">
      <button
        onClick={() => setType("together")}
        className={`text-[14px] w-[50%] py-3 rounded-[5px] font-medium ${
          type === "together" ? "bg-main text-white" : "bg-white text-font1"
        }`}
      >
        같이 사요
      </button>

      <button
        onClick={() => setType("sell")}
        className={`text-[14px] w-[50%] py-3 rounded-[5px] font-medium ${
          type === "sell" ? "bg-main text-white" : "bg-white text-font1"
        }`}
      >
        팔아요
      </button>
    </div>
  );
};

export default TypeSelector;
