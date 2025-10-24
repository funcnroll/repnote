import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

function ChevronBack({ label = "" }: { label?: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed z-50 flex items-center space-x-1 transition-colors cursor-pointer top-4 left-4 sm:absolute text-textPrimary hover:text-textSecondary"
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
