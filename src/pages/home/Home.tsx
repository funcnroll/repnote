import NameInput from "./NameInput";
import H1 from "../../components/reusable/H1";
import NoWorkout from "./NoWorkout";
import RecentWorkouts from "./RecentWorkouts";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { isNotWorkingOut, isWorkingOut } from "../../app/homeSlice";

import Button from "../../components/reusable/Button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  calculateTotalSets,
  calculateCompletedSets,
  calculateWorkoutProgress,
} from "@/helpers/workoutCalculations";

function Home() {
  const name = useAppSelector((state) => state.home.name);
  const isWorkingOutState = useAppSelector((state) => state.home.isWorkingOut);
  const dispatch = useAppDispatch();

  const activeTemplate = useAppSelector(
    (state) => state.activeTemplate.activeTemplate
  );

  if (activeTemplate) dispatch(isWorkingOut());
  if (!activeTemplate) dispatch(isNotWorkingOut());

  const totalSets = calculateTotalSets(activeTemplate);
  const completedSets = calculateCompletedSets(activeTemplate);
  const progress = calculateWorkoutProgress(activeTemplate);

  const progressData = [
    { name: "Completed", value: completedSets, fill: "#3B82F6" },
    { name: "Remaining", value: totalSets - completedSets, fill: "#1E293B" },
  ];

  if (!name) {
    return (
      <div className="dvh-full overflow-y-auto flex items-center justify-center">
        <NameInput />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-4 pb-24 text-white">
      <div className="flex justify-center items-center flex-wrap">
        <H1>Welcome back, {name}</H1>
      </div>

      <div className="max-w-4xl mx-auto">
        {!isWorkingOutState ? (
          <div className="mt-14 flex justify-center">
            <NoWorkout />
          </div>
        ) : (
          <>
            {/* Workout Progress */}
            <div className="bg-[#1c2331] p-8 rounded-xl mb-8 flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <Button
                  variant="text"
                  to={`/activeTemplate/${activeTemplate?.id}`}
                  className="text-2xl"
                >
                  {activeTemplate?.name}
                </Button>
                <p className="text-gray-400">Workout Progress</p>
              </div>
              <div className="w-24 h-24 relative">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {progressData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  {progress}%
                </div>
              </div>
            </div>
          </>
        )}

        <RecentWorkouts />
      </div>
    </div>
  );
}

export default Home;
