import Button from "../../components/reusable/Button";

function NoWorkout() {
  return (
    <div className="bg-slate-800 text-center px-8 py-10 rounded-3xl shadow-lg space-y-6 w-full max-w-sm mx-auto">
      <h2 className="text-2xl text-gray-200 font-semibold">
        No active workout
      </h2>
      <p className="text-base text-gray-400">
        Start a workout to log your training
      </p>
      <Button
        variant="secondary"
        size="lg"
        to="templates"
        fullWidth
      >
        + Start Workout
      </Button>
    </div>
  );
}

export default NoWorkout;
