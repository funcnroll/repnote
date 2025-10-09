import React from "react";

function Chart({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-w-[320px] rounded-xl border  border-borderDefault bg-cardColor p-3">
      <div className="h-96 rounded-lg bg-darkCard/70 border border-dashed border-borderDefault flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Chart;
