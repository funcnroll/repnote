import { Link } from "react-router";

function TemplateButton({ children, to }) {
  return (
    <Link
      to={to}
      className="w-full py-3 rounded-lg bg-primaryColor text-white font-medium hover:bg-secondaryColor transition flex items-center justify-center"
    >
      {children}
    </Link>
  );
}

export default TemplateButton;
