import React from "react";

function Chart({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-w-[320px] rounded-xl border  border-borderDefault bg-cardColor p-1.5">
      <div className="flex items-center justify-center border border-dashed rounded-lg h-96 bg-darkCard/70 border-borderDefault">
        <div className="flex items-center justify-center w-full h-full ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Chart;
