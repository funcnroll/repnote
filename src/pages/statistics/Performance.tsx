import ChevronBack from "@/components/reusable/ChevronBack";
import SearchExerciseCard from "@/components/reusable/SearchExerciseCard";
import SearchExercises from "../templates/reusable/search/SearchExercises";
import Chart from "./Chart";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  labelStyle,
  tickStyleXAxis,
  tickStyleYAxis,
  legendStyle,
  gridStyle,
} from "../../../chartStyles";
import { usePerformanceData } from "@/hooks/usePerformanceData";

function Performance() {
  const {
    search,
    results,
    selected,
    exerciseToSelect,
    weeklyOneRMEstimates,
    setSearch,
  } = usePerformanceData();

  return (
    <div className="h-screen px-6 py-8 pb-24 overflow-y-auto bg-backgroundColor text-textPrimary">
      <ChevronBack />

      <div className="max-w-4xl mx-auto mt-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Performance</h1>
          <p className="text-sm text-textSecondary">
            See how your strength evolves week by week with 1RM estimates and
            exercise trends.
          </p>
        </header>

        <div className="max-w-sm">
          <SearchExercises
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="mt-4 space-y-2">
          {search.length > 0 &&
            results.map((e) => (
              <SearchExerciseCard
                key={e.id}
                e={e}
                func={exerciseToSelect}
              />
            ))}
        </div>

        {selected && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">
              Trends for: {selected.name}
            </h2>
          </div>
        )}
      </div>

      {selected && (
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={weeklyOneRMEstimates}
                margin={{ top: 16, right: 20, left: 20, bottom: 32 }}
              >
                <CartesianGrid {...gridStyle} />
                <XAxis
                  dataKey="week"
                  tickMargin={8}
                  padding={{ left: 12, right: 12 }}
                  tickFormatter={(v) => (v % 2 === 0 ? v : "")}
                  tick={tickStyleXAxis}
                >
                  <Label
                    {...labelStyle}
                    value="Weeks"
                    position="insideBottom"
                    offset={-15}
                  />
                </XAxis>
                <YAxis
                  width={36}
                  tickMargin={6}
                  tickSize={0}
                  tick={tickStyleYAxis}
                >
                  <Label
                    {...labelStyle}
                    value="kg"
                    position="insideLeft"
                    angle={-90}
                    offset={-5}
                  />
                </YAxis>
                <Line
                  dataKey="estimated1RM"
                  dot={false}
                  type="monotone"
                  name="Estimated 1RM"
                  connectNulls
                />
                <Legend
                  height={48}
                  verticalAlign="top"
                  align="center"
                  iconType="circle"
                  wrapperStyle={legendStyle}
                />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      )}
    </div>
  );
}

export default Performance;
