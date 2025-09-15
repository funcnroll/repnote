import FormInput from "@/components/reusable/FormInput";
import { Search } from "lucide-react";

function SearchExercises({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <div className="relative">
        <FormInput
          placeholder="Search for an exercise.."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}

export default SearchExercises;
