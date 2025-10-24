import ChevronBack from "@/components/reusable/ChevronBack";

import Chart from "./Chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import { chartColors, gridStyle, legendStyle } from "../../../chartStyles";
import { XAxisStyled } from "@/components/reusable/XAxisStyled";
import { YAxisStyled } from "@/components/reusable/YAxisStyled";
import { useConsistencyData } from "@/hooks/useConsistencyData";

function Consistency() {
  const { weeklySetComparisonData, weeklyDuration, weeklyAdherence } =
    useConsistencyData();

  return (
    <div className="h-screen px-6 py-8 pb-24 overflow-y-auto bg-backgroundColor text-textPrimary">
      <ChevronBack />

      <div className="max-w-4xl mx-auto mt-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Consistency</h1>
          <p className="text-sm text-textSecondary">
            Track how consistently you’ve been training over time.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="text-sm text-textSecondary">
            <Chart>
              <div className="flex items-center justify-center w-full h-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={weeklySetComparisonData}
                    margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                    barCategoryGap="40%"
                    barGap={1.5}
                    barSize={7}
                  >
                    <CartesianGrid
                      stroke="#374151"
                      strokeDasharray="0"
                      vertical={false}
                    />
                    <XAxisStyled label="Week" />

                    <YAxisStyled label="Sets" />

                    <Bar
                      dataKey="completedSets"
                      fill={chartColors.blue}
                      name="Completed Sets"
                      stackId={1}
                    />
                    <Bar
                      dataKey="missedSets"
                      fill={chartColors.red}
                      name="Missed Sets"
                      stackId={1}
                    />

                    <Legend
                      height={48}
                      verticalAlign="top"
                      align="center"
                      iconType="circle"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Chart>

            <Chart>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyDuration}
                  margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                >
                  <CartesianGrid {...gridStyle} />
                  <XAxisStyled label="Week" />
                  <YAxisStyled label="Minutes" />

                  <Line
                    dataKey="totalMinutes"
                    dot={false}
                    type="monotone"
                    name="Total Minutes"
                    stroke={chartColors.blue}
                    connectNulls
                  />
                  <Line
                    dataKey="averageMinutes"
                    dot={false}
                    type="monotone"
                    name="Average Minutes"
                    stroke={chartColors.green}
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
                <BarChart
                  data={weeklyAdherence}
                  margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                  barCategoryGap="40%"
                  barGap={1.5}
                  barSize={7}
                >
                  <CartesianGrid {...gridStyle} />
                  <XAxisStyled label="Week" />
                  <YAxisStyled
                    label="Adherence"
                    unit="%"
                    width={48}
                  />

                  <Bar
                    dataKey="adherence"
                    fill={chartColors.blue}
                    name="Sets  Completed %"
                  />

                  <Legend
                    height={48}
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                    wrapperStyle={legendStyle}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consistency;
