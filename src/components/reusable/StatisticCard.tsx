import { ChevronRight } from "lucide-react";

interface StatCardProps {
  title: string;
  subtitle: string;
  statistic: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function StatCard({
  title,
  subtitle,
  statistic,
  onClick,
  className,
}: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-lg bg-darkCard p-5 border border-borderDefault hover:border-borderHover cursor-pointer transition-colors duration-200 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-6 bg-blue rounded-full" />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-textPrimary group-hover:text-blue transition-colors duration-200">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-textSecondary">{subtitle}</p>}
        </div>

        {statistic && (
          <div className="shrink-0 w-16 h-8 flex items-center justify-center">
            {statistic}
          </div>
        )}

        <ChevronRight className="h-5 w-5 text-textMuted group-hover:text-blue group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
    </button>
  );
}
