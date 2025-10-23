import ChevronBack from "@/components/reusable/ChevronBack";
import SearchExerciseCard from "@/components/reusable/SearchExerciseCard";
import SearchExercises from "../templates/reusable/search/SearchExercises";
import Chart from "./Chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { legendStyle, gridStyle, chartColors } from "../../../chartStyles";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { YAxisStyled } from "@/components/reusable/YAxisStyled";
import { XAxisStyled } from "@/components/reusable/XAxisStyled";

function Performance() {
  const {
    search,
    results,
    selected,
    exerciseToSelect,
    weeklyOneRMEstimates,
    setSearch,
    weeklyVolumeLoad,
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
                <XAxisStyled label="Week" />
                <YAxisStyled
                  label="Weight"
                  unit="kg"
                  width={36}
                />

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
          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={weeklyVolumeLoad}
                margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
              >
                <CartesianGrid {...gridStyle} />
                <XAxisStyled label="Week" />
                <YAxisStyled
                  label="Volume Load"
                  unit="kg"
                  width={48}
                />

                <Line
                  connectNulls
                  dataKey="volume"
                  dot={false}
                  type="monotone"
                  name="Volume Load"
                  stroke={chartColors.blue}
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
