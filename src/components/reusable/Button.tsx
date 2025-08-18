import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";

type ButtonVariant = "primary" | "secondary" | "text" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primaryColor text-white hover:bg-secondaryColor",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  text: "text-blue-400 hover:text-blue-500 bg-transparent",
  outline:
    "border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-medium transition duration-300 flex items-center justify-center cursor-pointer";
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClassName =
    `${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${disabledStyle} ${className}`.trim();

  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={combinedClassName}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
