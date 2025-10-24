import { CompletedWorkout } from "@/types/CompletedWorkout";
import { useNavigate } from "react-router";

interface RecentWorkoutCardProps {
  workout: CompletedWorkout;
  index: number;
}

function RecentWorkoutCard({ workout, index }: RecentWorkoutCardProps) {
  const navigate = useNavigate();

  function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return "0m";
  }

  return (
    <div
      onClick={() => {
        navigate(`/recentActiveTemplate/${workout.id}`);
      }}
      key={index}
      className="bg-darkCard p-5 rounded-lg border border-borderDefault hover:border-borderHover cursor-pointer transition-colors duration-200 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-textPrimary group-hover:text-blue transition-colors duration-200">
            {workout.name}
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-nowrap whitespace-nowrap">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-blue rounded-full flex-shrink-0"></div>
              <span className="text-textSecondary text-sm whitespace-nowrap">
                {workout.completedSets}/{workout.sets} sets
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-green rounded-full flex-shrink-0"></div>
              <span className="text-textSecondary text-sm whitespace-nowrap">
                {new Date(workout.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
            </div>
            <div className="w-2 h-2 bg-purple rounded-full flex-shrink-0"></div>
            <span className="text-textSecondary text-sm whitespace-nowrap">
              {formatDuration(workout.duration)}
            </span>
          </div>
        </div>
        <div className="text-textMuted group-hover:text-blue transition-colors duration-200">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default RecentWorkoutCard;
