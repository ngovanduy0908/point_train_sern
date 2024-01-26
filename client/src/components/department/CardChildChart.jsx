import React from "react";

const CardChildChart = ({ icon, value, text, bg }) => {
  return (
    <div
      className={`p-[12px] rounded-lg col-span-1 h-full flex justify-start items-center gap-3`}
      style={{ background: `${bg}` }}
    >
      <div className="w-[50px] h-[50px] p-2 bg-gray-500 bg-opacity-50 rounded-[50%]">
        {icon}
      </div>{" "}
      <div>
        <h1 className="font-semibold text-[24px] text-[#151D48]">
          {value.toLocaleString("vi-VN")}
        </h1>
        <p
          className="font-medium text-[16px] text-[#425166]"
          style={{
            margin: "0px",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default CardChildChart;
