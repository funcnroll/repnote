import { MouseEventHandler } from "react";
import { Link } from "react-router";
import { TemplateButtonProps as ToActiveButtonProps } from "../../types/templateButton";

function ToActiveButton({ children, to, onClick }: ToActiveButtonProps) {
  const className =
    " text-blue-400 font-medium  transition duration-300 flex items-center justify-center hover:text-blue-500";

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }
}

export default ToActiveButton;
