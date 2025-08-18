import { ReactNode } from "react";

interface H1Props {
  children: ReactNode;
  variant?: "large" | "medium" | "small";
  centered?: boolean;
  className?: string;
}

function H1({ children, variant = "large", centered = false, className = "" }: H1Props) {
  const baseStyles = "break-words whitespace-normal w-full";
  
  const variantStyles = {
    large: "text-6xl mb-8",
    medium: "text-2xl font-semibold mb-8", 
    small: "text-lg font-semibold mb-6"
  };
  
  const centerStyle = centered ? "text-center" : "";
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${centerStyle} ${className}`.trim();
  
  return (
    <h1 className={combinedClassName}>
      {children}
    </h1>
  );
}

export default H1;
