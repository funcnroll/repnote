function AddExercise() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">Add Exercise</h1>

      {/* Exercise Name */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Exercise name
        </label>
        <input
          type="text"
          placeholder="Squats"
          className="w-full px-4 py-3 rounded-lg bg-[#1e293b] placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">Sets</label>
          <input
            type="number"
            placeholder="3"
            className="w-full px-4 py-3 rounded-lg bg-[#1e293b] placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">Reps</label>
          <input
            type="number"
            placeholder="10"
            className="w-full px-4 py-3 rounded-lg bg-[#1e293b] placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition">
        Add Exercise
      </button>
    </div>
  );
}

export default AddExercise;
