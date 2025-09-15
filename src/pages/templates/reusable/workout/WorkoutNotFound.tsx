import ChevronBack from "@/components/reusable/ChevronBack";
import H1 from "@/components/reusable/H1";

function WorkoutNotFound() {
  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack />
      <H1 variant="medium">No workout found</H1>
    </div>
  );
}

export default WorkoutNotFound;