import NameInput from "./NameInput";
import H1 from "../../components/reusable/H1";
import NoWorkout from "./NoWorkout";
import RecentWorkouts from "./RecentWorkouts";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { isNotWorkingOut, isWorkingOut } from "../../app/homeSlice";
import { useEffect } from "react";

import Button from "../../components/reusable/Button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  calculateTotalSets,
  calculateCompletedSets,
  calculateWorkoutProgress,
} from "@/services/exercises/workoutCalculations";
import {
  generatePPLWorkoutHistory,
  generatePPLTemplates,
} from "../../helpers/seedWorkoutData";
import {
  seedWorkoutsToLocalStorage,
  saveTemplatesToLocalStorage,
  loadRecentWorkoutsFromLocalStorage,
} from "../../app/localStorage";

function Home() {
  const name = useAppSelector((state) => state.home.name);
  const isWorkingOutState = useAppSelector((state) => state.home.isWorkingOut);
  const dispatch = useAppDispatch();

  const activeTemplate = useAppSelector(
    (state) => state.activeTemplate.activeTemplate
  );

  const recentWorkouts = loadRecentWorkoutsFromLocalStorage()
    .reverse()
    .slice(0, 4);

  const hasPreloadedData = recentWorkouts.some(
    (template) =>
      template.name.includes("Push Day") ||
      template.name.includes("Pull Day") ||
      template.name.includes("Leg Day")
  );

  useEffect(() => {
    if (activeTemplate) {
      dispatch(isWorkingOut());
    } else {
      dispatch(isNotWorkingOut());
    }
  }, [activeTemplate, dispatch]);

  const totalSets = calculateTotalSets(activeTemplate);
  const completedSets = calculateCompletedSets(activeTemplate);
  const progress = calculateWorkoutProgress(activeTemplate);

  const progressData = [
    { name: "Completed", value: completedSets, fill: "#3B82F6" },
    { name: "Remaining", value: totalSets - completedSets, fill: "#1E293B" },
  ];

  function handlePreloadData() {
    if (hasPreloadedData) {
      // Clear all data
      localStorage.removeItem("recentWorkouts");
      localStorage.removeItem("templates");
    } else {
      // Generate and seed workout history
      const historicalWorkouts = generatePPLWorkoutHistory();
      seedWorkoutsToLocalStorage(historicalWorkouts);

      // Generate and seed PPL templates
      const pplTemplates = generatePPLTemplates();
      saveTemplatesToLocalStorage(pplTemplates);
    }

    // Force refresh by reloading the page to show updated data
    window.location.reload();
  }

  if (!name) {
    return (
      <div className="dvh-full overflow-y-auto flex items-center justify-center">
        <NameInput />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-4 pb-24 text-textPrimary">
      <div className="flex justify-center items-center flex-wrap">
        <H1>Welcome back, {name}</H1>
      </div>

      <div className="max-w-4xl mx-auto">
        {!isWorkingOutState ? (
          <div className="mt-14">
            <div className="flex justify-center mb-8">
              <NoWorkout />
            </div>
            <div className="flex justify-center">
              <Button
                variant="secondary"
                onClick={handlePreloadData}
                className={`${
                  hasPreloadedData
                    ? "bg-red hover:bg-redHover"
                    : "bg-blue hover:bg-blueHover"
                } text-textPrimary px-6 py-3 rounded-lg font-medium`}
              >
                {hasPreloadedData ? "Clear Data" : "Preload Data"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Workout Progress */}
            <div className="bg-cardColor p-8 rounded-xl mb-8 flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <Button
                  variant="text"
                  to={`/activeTemplate/${activeTemplate?.id}`}
                  className="text-2xl"
                >
                  {activeTemplate?.name}
                </Button>
                <p className="text-textSecondary">Workout Progress</p>
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
