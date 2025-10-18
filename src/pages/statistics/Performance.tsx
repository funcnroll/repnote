import ChevronBack from "@/components/reusable/ChevronBack";

function Performance() {
  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack />

      <div className="mx-auto mt-10 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Performance</h1>
          <p className="text-sm text-textSecondary">
            See how your strength evolves week by week with 1RM estimates and
            exercise trends.
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center justify-center w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
