import React from "react";

function VolumeChart({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="flex-1 min-w-[280px] rounded-xl border border-borderDefault bg-cardColor p-4">
      <div className="h-56 rounded-lg bg-darkCard/70 border border-dashed border-borderDefault flex items-center justify-center">
        {children}
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
