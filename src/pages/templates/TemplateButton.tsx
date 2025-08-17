import { TemplateButtonProps } from "@/types/templateButton";
import { MouseEventHandler } from "react";
import { Link } from "react-router";

function TemplateButton({ children, to, onClick }: TemplateButtonProps) {
  const className =
    "w-full py-3 rounded-lg bg-primaryColor text-white font-medium hover:bg-secondaryColor transition flex items-center justify-center";

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

  return (
    <button
      className={className}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}

export default TemplateButton;
