import { Check, X } from "lucide-react";

interface SetRowProps {
  setNumber: number;
  reps: number | null;
  weight: number | null;
  completed: boolean;
  onToggleComplete?: () => void;
  onRemove?: () => void;
  onRepsChange?: (reps: number | null) => void;
  onWeightChange?: (weight: number | null) => void;
}

function SetRow({
  setNumber,
  reps,
  weight,
  completed = false,
  onToggleComplete,
  onRemove,
  onRepsChange,
  onWeightChange,
}: SetRowProps) {
  return (
    <div
      className={`flex items-start gap-6 mb-3 py-6 px-4 rounded-lg transition duration-200 ${
        completed ? "bg-green-600" : "bg-primaryColor"
      }`}
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-4 ">
          <span className="text-sm text-gray-400 font-medium">set</span>
          <div className="text-sm text-gray-400 font-medium">{setNumber}</div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-white font-medium text-sm">reps</span>
          <input
            type="number"
            value={reps ?? ""}
            onChange={(e) =>
              onRepsChange?.(
                e.target.value === "" ? null : parseInt(e.target.value) || null
              )
            }
            className="bg-transparent text-white font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-white font-medium text-sm">kg</span>
          <input
            type="number"
            value={weight ?? ""}
            onChange={(e) =>
              onWeightChange?.(
                e.target.value === "" ? null : parseInt(e.target.value) || null
              )
            }
            className="bg-transparent text-white font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center mt-2.5 ">
        <button
          onClick={onToggleComplete}
          className={`p-3 rounded-lg transition duration-200 cursor-pointer ${
            completed
              ? "bg-green-600  text-white"
              : "bg-gray-600 hover:bg-green-600 text-white"
          }`}
        >
          <Check className="w-5 h-5 " />
        </button>

        <button
          onClick={onRemove}
          className="p-3  rounded-lg bg-gray-600  cursor-pointer  text-white transition duration-200 hover:bg-red-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SetRow;
