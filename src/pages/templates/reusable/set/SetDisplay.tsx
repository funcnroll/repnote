import { Set } from "@/types/Set";
import SetCompletionIndicator from "./SetCompletionIndicator";

interface SetDisplayProps {
  set: Set;
  setNumber: number;
}

function SetDisplay({ set, setNumber }: SetDisplayProps) {
  return (
    <div
      className={`flex items-center gap-2 sm:gap-4 mb-2 py-3 px-2 rounded-lg transition duration-200 ${
        set.completed ? "bg-green" : "bg-borderDefault/30"
      }`}
    >
      <div className="flex gap-2 sm:gap-4 flex-1 min-w-0">
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <span className="text-sm text-textSecondary font-medium">set</span>
          <div className="text-sm text-textSecondary font-medium">{setNumber}</div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-textPrimary font-medium text-sm">reps</span>
          <div className="text-textPrimary font-medium text-center">
            {set.actualReps || set.reps || 0}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <span className="text-textPrimary font-medium text-sm">kg</span>
          <div className="text-textPrimary font-medium text-center">
            {set.weight || 0}
          </div>
        </div>
      </div>
      <SetCompletionIndicator completed={set.completed} />
    </div>
  );
}

export default SetDisplay;