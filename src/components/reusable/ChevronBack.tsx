import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

function ChevronBack({ label = "Back" }: { label?: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 flex items-center space-x-1 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
    >
      <ChevronLeft
        size={24}
        strokeWidth={2.5}
      />
      <span className="text-base">{label}</span>
    </button>
  );
}

export default ChevronBack;
