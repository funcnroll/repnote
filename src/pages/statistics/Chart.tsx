import React from "react";

function VolumeChart({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className=" min-w-[330px] rounded-xl border  border-borderDefault bg-cardColor p-3">
      <div className="h-72 rounded-lg bg-darkCard/70 border border-dashed border-borderDefault flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm text-textSecondary flex justify-center items-center">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default VolumeChart;
