interface ExerciseHeaderProps {
  exerciseName: string;
  setsCount: number;
}

function ExerciseHeader({ exerciseName, setsCount }: ExerciseHeaderProps) {
  return (
    <div className="px-4 py-3">
      <div>
        <h2 className="text-lg font-semibold text-white">{exerciseName}</h2>
        <p className="text-gray-400">Sets: {setsCount}</p>
      </div>
    </div>
  );
}

export default ExerciseHeader;