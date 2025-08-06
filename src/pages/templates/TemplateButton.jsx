import { Link } from "react-router";

function TemplateButton({ children, to, onClick = () => {} }) {
  return (
    <Link
      to={to}
      className="w-full py-3 rounded-lg bg-primaryColor text-white font-medium hover:bg-secondaryColor transition flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default TemplateButton;
