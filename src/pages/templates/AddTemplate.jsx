import { Link } from "react-router";

function AddTemplate() {
  return (
    <div className="n-full bg-[#0f172a] text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">New Template</h1>

      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Template name
        </label>
        <input
          type="text"
          placeholder="Leg Day"
          className="w-full px-4 py-3 rounded-lg bg-[#1e293b] placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Link
          to="/add-exercise"
          className="w-full py-3 rounded-lg bg-[#1e293b] text-white font-medium hover:bg-[#2c3a54] transition flex items-center justify-center"
        >
          + Add Exercise
        </Link>
        <button className="w-full py-3 rounded-lg bg-[#1e293b] text-white font-medium hover:bg-[#2c3a54] transition">
          + Add Template
        </button>
      </div>
    </div>
  );
}

export default AddTemplate;
