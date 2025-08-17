import NameInput from "./NameInput";
import H1 from "../../components/reusable/H1";
import NoWorkout from "./NoWorkout";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { isNotWorkingOut, isWorkingOut } from "../../app/homeSlice";

function Home() {
  const name = useAppSelector((state) => state.home.name);
  const isWorkingOutState = useAppSelector((state) => state.home.isWorkingOut);
  const dispatch = useAppDispatch();

  const activeTemplate = useAppSelector(
    (state) => state.templates.activeTemplate
  );

  if (activeTemplate) dispatch(isWorkingOut());
  if (!activeTemplate) dispatch(isNotWorkingOut());

  if (!name) {
    return (
      <div className="dvh-full overflow-y-auto flex items-center justify-center">
        <NameInput />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 text-white">
      <div className="flex justify-center items-center flex-wrap">
        <H1>Welcome back, {name}</H1>
      </div>
      {!isWorkingOutState ? (
        <div className="mt-14 flex justify-center">
          <NoWorkout />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Welcome back, {name}</h1>

          {/* Workout Progress */}
          <div className="bg-[#1c2331] p-8 rounded-xl mb-8 flex items-center justify-between">
            <p className="text-gray-400">Workout Progress</p>
            <div className="w-24 h-24 rounded-full border-8 border-blue-500 border-t-blue-900 flex items-center justify-center text-lg font-semibold">
              75%
            </div>
          </div>

          {/* Recent Workouts */}
          <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>

          <div className="space-y-3 pb-8">
            {[
              { name: "Full Body Workout", sets: 5 },
              { name: "Upper Body Workout", sets: 4 },
              { name: "Core Workout", sets: 6 },
            ].map((workout, index) => (
              <div
                key={index}
                className="bg-[#1c2331] p-6 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{workout.name}</p>
                  <p className="text-gray-400 text-sm">{workout.sets} sets</p>
                </div>
                <p className="text-gray-400 text-sm">{workout.sets} sets</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
