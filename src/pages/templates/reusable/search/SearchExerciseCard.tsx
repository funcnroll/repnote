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
      className="p-3 bg-darkCard rounded-lg cursor-pointer hover:bg-cardColor
  transition-colors border border-borderDefault"
      onClick={() => func(e)}
    >
      <h3 className="font-semibold">{e.name}</h3>
      <p className="text-sm text-textSecondary">
        {e.primaryMuscles.join(", ")} • {e.level}
      </p>
    </div>
  );
}

export default SearchExerciseCard;
