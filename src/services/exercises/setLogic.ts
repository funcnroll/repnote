import { Set } from "@/types/Set";

export function addLocalSet(
  localSets: Set[],
  setLocalSets: (sets: Set[]) => void
): void {
  const newSet: Set = {
    id: localSets.length,
    reps: null,
    weight: null,
    actualReps: null,
    completed: false,
  };
  setLocalSets([...localSets, newSet]);
}

export function updateLocalSet(
  localSets: Set[],
  setLocalSets: (sets: Set[]) => void,
  index: number,
  updatedSet: Partial<Set>
): void {
  setLocalSets(
    localSets.map((set, i) => (i === index ? { ...set, ...updatedSet } : set))
  );
}

export function removeLocalSet(
  localSets: Set[],
  setLocalSets: (sets: Set[]) => void,
  index: number
): void {
  setLocalSets(localSets.filter((_, i) => i !== index));
}
