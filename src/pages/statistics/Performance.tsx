import SearchExerciseCard from "@/components/reusable/SearchExerciseCard";
import SearchExercises from "../templates/reusable/search/SearchExercises";
import Chart from "../../components/reusable/chart/Chart";
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";
import { gridStyle, chartColors } from "../../../chartStyles";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { LegendStyled } from "@/components/reusable/chart/LegendStyled";
import { XAxisStyled } from "@/components/reusable/chart/XAxisStyled";
import { YAxisStyled } from "@/components/reusable/chart/YAxisStyled";
import { ChartPageLayout } from "@/components/reusable/chart/ChartPageLayout";

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
    <ChartPageLayout
      title="Performance"
      description="See how your strength evolves week by week with 1RM estimates and exercise trends."
    >
      <div className="max-w-sm">
        <SearchExercises
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="w-full max-w-sm space-y-2 mt-[-16px]">
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
        <>
          <div>
            <h2 className="text-lg font-semibold">
              Trends for: {selected.name}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
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
                  <LegendStyled />
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
                  <LegendStyled />
                </LineChart>
              </ResponsiveContainer>
            </Chart>
          </div>
        </>
      )}
    </ChartPageLayout>
  );
}

export default Performance;
