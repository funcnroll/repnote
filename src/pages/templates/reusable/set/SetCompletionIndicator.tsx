import { Check } from "lucide-react";

interface SetCompletionIndicatorProps {
  completed: boolean;
}

function SetCompletionIndicator({ completed }: SetCompletionIndicatorProps) {
  return (
    <div className="flex gap-1 items-center justify-center flex-shrink-0">
      <div
        className={`p-2 sm:p-3 rounded-lg ${
          completed
            ? "bg-green-600 text-white"
            : "bg-gray-600 text-white"
        }`}
      >
        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
  );
}

export default SetCompletionIndicator;