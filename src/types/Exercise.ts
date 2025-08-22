export interface Exercise {
  id: string;
  name: string;
  force: "push" | "pull" | "static" | null;
  level: "beginner" | "intermediate" | "expert";
  mechanic: "compound" | "isolation" | null;
  equipment: string; // more flexible
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string; // flexible
  images: string[];
}
