import { ReactNode } from "react";

interface WorkoutPageLayoutProps {
  children: ReactNode;
}

function WorkoutPageLayout({ children }: WorkoutPageLayoutProps) {
  return (
    <div className="bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      {children}
    </div>
  );
}

export default WorkoutPageLayout;