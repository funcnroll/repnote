import { Check, X } from "lucide-react";

interface ActiveSetRowProps {
  setNumber: number;
  reps: number | null;
  weight: number | null;
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
  completed = false,
  onToggleComplete,
  onRemove,
  onRepsChange,
  onWeightChange,
}: ActiveSetRowProps) {
  return (
    <div
      className={`flex items-center gap-2 sm:gap-4 mb-2 py-3 px-2 rounded-lg transition duration-200 ${
        completed ? "bg-green-600" : "bg-gray-700/30"
      }`}
    >
      <div className="flex gap-2 sm:gap-4 flex-1 min-w-0">
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <span className="text-sm text-gray-400 font-medium">set</span>
          <div className="text-sm text-gray-400 font-medium">{setNumber}</div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-white font-medium text-sm">reps</span>
          <input
            type="number"
            value={reps ?? ""}
            onChange={(e) =>
              onRepsChange?.(
                e.target.value === "" ? null : parseInt(e.target.value) || null
              )
            }
            className="bg-transparent text-white font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full max-w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-white font-medium text-sm">kg</span>
          <input
            type="number"
            value={weight ?? ""}
            onChange={(e) =>
              onWeightChange?.(
                e.target.value === "" ? null : parseInt(e.target.value) || null
              )
            }
            className="bg-transparent text-white font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-full max-w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>
      </div>
      <div className="flex gap-1 items-center justify-center flex-shrink-0">
        <button
          onClick={onToggleComplete}
          className={`p-2 sm:p-3 rounded-lg transition duration-200 cursor-pointer ${
            completed
              ? "bg-green-600  text-white"
              : "bg-gray-600 hover:bg-green-600 text-white"
          }`}
        >
          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={onRemove}
          className="p-2 sm:p-3 rounded-lg bg-gray-600 cursor-pointer text-white transition duration-200 hover:bg-red-600"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default ActiveSetRow;