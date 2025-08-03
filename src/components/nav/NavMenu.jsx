import { BarChart2, FileText, History, Home } from "lucide-react";
import { NavLink } from "react-router";

const links = [
  { to: "/", title: "Home", icon: <Home size={24} /> },
  { to: "/templates", title: "Templates", icon: <FileText size={24} /> },
  { to: "/history", title: "History", icon: <History size={24} /> },
  { to: "/tracking", title: "Tracking", icon: <BarChart2 size={24} /> },
];

function NavMenu() {
  return (
    <nav className="bg-[#0F172A] border-t border-[#1E293B] flex justify-around py-2">
      {links.map((link) => {
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={(nav) => {
              const isActive = nav.isActive;
              return `flex flex-col items-center text-xs transition-colors duration-150 ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              }`;
            }}
          >
            {link.icon}
            <span className="mt-1">{link.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavMenu;
