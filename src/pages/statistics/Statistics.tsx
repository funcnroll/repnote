function Statistics() {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-24 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-cardColor p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            Progress Statistics
          </h2>

          <div className="space-y-4">
            <div className="text-center py-8 text-gray-400">
              <p>Progress statistics coming soon!</p>
              <p className="text-sm mt-2">
                Track your fitness journey and visualize your progress over
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
