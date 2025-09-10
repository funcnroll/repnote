import { ExerciseFromDB } from "@/types/ExerciseFromDB";

function SearchExerciseCard({
  e,
  func,
}: {
  e: ExerciseFromDB;
  func: (e: ExerciseFromDB) => void;
}) {
  return (
    <div
      key={e.id}
      className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700
  transition-colors border border-gray-600"
      onClick={() => func(e)}
    >
      <h3 className="font-semibold">{e.name}</h3>
      <p className="text-sm text-gray-400">
        {e.primaryMuscles.join(", ")} • {e.level}
      </p>
    </div>
  );
}

export default SearchExerciseCard;
