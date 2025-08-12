import { JSX } from "react";

function NoWorkout(): JSX.Element {
  return (
    <div className="bg-slate-800 text-center px-8 py-10 rounded-3xl shadow-lg space-y-6 w-full max-w-sm mx-auto">
      <h2 className="text-2xl text-gray-200 font-semibold">
        No active workout
      </h2>
      <p className="text-base text-gray-400">
        Start a workout to log your training
      </p>
      <button className="bg-slate-700 hover:bg-slate-600 text-white text-base px-6 py-3 rounded-xl font-semibold transition">
        + Start Workout
      </button>
    </div>
  );
}

export default NoWorkout;
