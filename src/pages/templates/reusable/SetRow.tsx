import { Check, X } from "lucide-react";

interface SetRowProps {
  setNumber: number;
  reps: number;
  completed: boolean;
  onToggleComplete?: () => void;
  onRemove?: () => void;
  onRepsChange?: (reps: number) => void;
}

function SetRow({
  setNumber,
  reps,
  completed = false,
  onToggleComplete,
  onRemove,
  onRepsChange,
}: SetRowProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-3 p-3 rounded-lg transition duration-200 ${
        completed ? "bg-green-600" : "bg-primaryColor"
      }`}
    >
      <div className="text-sm text-gray-400 font-medium w-12">
        Set {setNumber}
      </div>

      {/* Clickable reps input */}
      <div className="flex-1">
        <input
          type="number"
          value={reps}
          onChange={(e) => onRepsChange?.(parseInt(e.target.value) || 0)}
          className="bg-transparent text-white font-medium focus:outline-none focus:bg-backgroundColor focus:px-2 focus:py-1 focus:rounded transition-all duration-200 w-16"
          placeholder="0"
        />
        <span className="text-white font-medium ">reps</span>
      </div>

      {/* Actions container */}
      <div className="flex items-center gap-2">
        {/* Complete button */}
        <button
          onClick={onToggleComplete}
          className={`p-2 rounded-lg transition duration-200 cursor-pointer ${
            completed
              ? "bg-green-600  text-white"
              : "bg-gray-600 hover:bg-green-600 text-white"
          }`}
        >
          <Check className="w-4 h-4" />
        </button>

        {/* Remove button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-lg bg-gray-600  cursor-pointer  text-white transition duration-200 hover:bg-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default SetRow;
