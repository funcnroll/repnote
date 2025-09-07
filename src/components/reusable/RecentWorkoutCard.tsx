import { CompletedWorkout } from "@/types/CompletedWorkout";
import { useNavigate } from "react-router";

interface RecentWorkoutCardProps {
  workout: CompletedWorkout;
  index: number;
}

function RecentWorkoutCard({ workout, index }: RecentWorkoutCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/recentActiveTemplate/${workout.id}`);
      }}
      key={index}
      className="bg-[#0f1419] p-5 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors duration-200 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
            {workout.name}
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">
                {workout.completedSets}/{workout.sets} sets
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">
                {new Date(workout.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="text-gray-500 group-hover:text-blue-400 transition-colors duration-200">
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