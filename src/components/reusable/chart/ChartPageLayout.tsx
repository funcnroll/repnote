import ChevronBack from "@/components/reusable/ChevronBack";

interface ChartPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ChartPageLayout({
  title,
  description,
  children,
}: ChartPageLayoutProps) {
  return (
    <div className="h-screen px-6 py-8 pb-24 overflow-y-auto bg-backgroundColor text-textPrimary">
      <ChevronBack />

      <div className="max-w-4xl mx-auto mt-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-textSecondary">{description}</p>
        </header>

        <div className="flex flex-wrap justify-center gap-4">{children}</div>
      </div>
    </div>
  );
}
