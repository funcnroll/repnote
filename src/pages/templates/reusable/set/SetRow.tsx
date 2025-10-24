import { X } from "lucide-react";

interface SetRowProps {
  setNumber: number;
  reps: number | null;
  weight: number | null;
  onRemove?: () => void;
  onRepsChange?: (reps: number | null) => void;
  onWeightChange?: (weight: number | null) => void;
}

function SetRow({
  setNumber,
  reps,
  weight,
  onRemove,
  onRepsChange,
  onWeightChange,
}: SetRowProps) {
  return (
    <div className="flex items-start gap-6 mb-3 py-6 px-4 rounded-lg transition duration-200 bg-primaryColor">
      <div className="flex gap-6 flex-1">
        <div className="flex flex-col items-center gap-4 ">
          <span className="text-sm text-textSecondary font-medium">set</span>
          <div className="text-sm text-textSecondary font-medium">{setNumber}</div>
        </div>

        <div className="flex flex-col items-center gap-4 flex-1">
          <span className="text-textPrimary font-medium text-sm">reps</span>
          <input
            type="number"
            min="0"
            value={reps ?? ""}
            onChange={(e) => {
              const value = e.target.value === "" ? null : parseInt(e.target.value);
              // Prevent negative values
              if (value !== null && value < 0) return;
              onRepsChange?.(value || null);
            }}
            className="bg-transparent text-textPrimary font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col items-center gap-4 flex-1">
          <span className="text-textPrimary font-medium text-sm">kg</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={weight ?? ""}
            onChange={(e) => {
              const value = e.target.value === "" ? null : parseFloat(e.target.value);
              // Prevent negative values
              if (value !== null && value < 0) return;
              onWeightChange?.(value || null);
            }}
            className="bg-transparent text-textPrimary font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>
      </div>
      <div className="ml-4 mt-2.5 ">
        <button
          onClick={onRemove}
          aria-label="Remove set"
          className="p-3   rounded-lg bg-textDisabled  cursor-pointer  text-textPrimary transition duration-200 hover:bg-redHover"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SetRow;
