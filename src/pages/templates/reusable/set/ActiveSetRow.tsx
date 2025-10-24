import { Check, X } from "lucide-react";

interface ActiveSetRowProps {
  setNumber: number;
  reps: number | null;
  weight: number | null;
  actualReps?: number | null;
  completed: boolean;
  onToggleComplete?: () => void;
  onRemove?: () => void;
  onRepsChange?: (reps: number | null) => void;
  onWeightChange?: (weight: number | null) => void;
}

function ActiveSetRow({
  setNumber,
  reps,
  weight,
  actualReps,
  completed = false,
  onToggleComplete,
  onRemove,
  onRepsChange,
  onWeightChange,
}: ActiveSetRowProps) {
  return (
    <div
      className={`flex items-center gap-2 sm:gap-4 mb-2 py-3 px-2 rounded-lg transition duration-200 ${
        completed ? "bg-green" : "bg-borderDefault/30"
      }`}
    >
      <div className="flex gap-2 sm:gap-4 flex-1 min-w-0">
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <span className="text-sm text-textSecondary font-medium">set</span>
          <div className="text-sm text-textSecondary font-medium">{setNumber}</div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-textPrimary font-medium text-sm">reps</span>
          <input
            type="number"
            min="0"
            value={actualReps ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                onRepsChange?.(null);
                return;
              }
              const value = parseInt(e.target.value, 10);
              // Prevent invalid numbers, negative values, and zero
              if (isNaN(value) || value < 0) return;
              onRepsChange?.(value);
            }}
            className="bg-transparent text-textPrimary font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full max-w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder={reps?.toString() || "0"}
          />
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-textPrimary font-medium text-sm">kg</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={weight ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                onWeightChange?.(null);
                return;
              }
              const value = parseFloat(e.target.value);
              // Prevent invalid numbers and negative values (allow 0 for weight)
              if (isNaN(value) || value < 0) return;
              onWeightChange?.(value);
            }}
            className="bg-transparent text-textPrimary font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full max-w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>
      </div>
      <div className="flex gap-1 items-center justify-center flex-shrink-0">
        <button
          onClick={onToggleComplete}
          aria-label={completed ? "Mark set as incomplete" : "Mark set as complete"}
          className={`p-2 sm:p-3 rounded-lg transition duration-200 cursor-pointer ${
            completed
              ? "bg-green  text-textPrimary"
              : "bg-textDisabled hover:bg-green text-textPrimary"
          }`}
        >
          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove set"
          className="p-2 sm:p-3 rounded-lg bg-textDisabled cursor-pointer text-textPrimary transition duration-200 hover:bg-red"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default ActiveSetRow;