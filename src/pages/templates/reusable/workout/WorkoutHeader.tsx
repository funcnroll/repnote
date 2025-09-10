import ChevronBack from "@/components/reusable/ChevronBack";
import H1 from "@/components/reusable/H1";

interface WorkoutHeaderProps {
  workoutName: string;
}

function WorkoutHeader({ workoutName }: WorkoutHeaderProps) {
  return (
    <>
      <ChevronBack />
      <H1 variant="medium">Recent Workout</H1>
      <H1 variant="medium">{workoutName}</H1>
    </>
  );
}

export default WorkoutHeader;