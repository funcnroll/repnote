import { ReactNode } from "react";

function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-6xl  break-words whitespace-normal w-full">
      {children}
    </h1>
  );
}

export default H1;
