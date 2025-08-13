import React, { MouseEventHandler } from "react";
import { Link } from "react-router";

interface TemplateButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

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
