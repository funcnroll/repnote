import Chart from "../../components/reusable/chart/Chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import {
  chartColors,
  tickStyleXAxis,
  legendStyle,
  gridStyle,
  barStyle,
} from "../../../chartStyles";
import { useVolumeData } from "@/hooks/useVolumeData";

import { LegendStyled } from "@/components/reusable/chart/LegendStyled";
import { XAxisStyled } from "@/components/reusable/chart/XAxisStyled";
import { YAxisStyled } from "@/components/reusable/chart/YAxisStyled";
import { ChartPageLayout } from "@/components/reusable/chart/ChartPageLayout";

function Volume() {
  const { weeklySetsData, weeklyRepsData, weeklyWeightData, radarData } =
    useVolumeData();

  return (
    <ChartPageLayout
      title="Training volume"
      description="Total work performed each week, measured by sets, reps, and weight lifted."
    >
      <Chart>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RadarChart
            data={radarData}
            outerRadius="75%"
          >
            <PolarGrid {...gridStyle} />
            <PolarAngleAxis
              dataKey="category"
              tick={{
                ...tickStyleXAxis,
                fontSize: 13,
                fontWeight: 500,
              }}
            />
            <Radar
              dataKey="sets"
              stroke={chartColors.blue}
              fill={chartColors.blue}
              fillOpacity={0.4}
              strokeWidth={2}
            />
            <Legend
              content={() => (
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: 4,
                    color: "var(--color-textSecondary)",
                    fontSize: legendStyle.fontSize,
                    fontFamily: legendStyle.fontFamily,
                  }}
                >
                  Total work (sets, all weeks) distributed across major muscle
                  groups
                </div>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Chart>

      <Chart>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={weeklySetsData}
            margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
            barCategoryGap="40%"
            barGap={1.5}
            barSize={7}
          >
            <CartesianGrid {...gridStyle} />
            <XAxisStyled label="Week" />
            <YAxisStyled label="Sets" />

            <Bar
              dataKey="completedSets"
              fill={chartColors.blue}
              name="Completed Sets"
              {...barStyle}
            />
            <LegendStyled />
          </BarChart>
        </ResponsiveContainer>
      </Chart>

      <Chart>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={weeklyRepsData}
            margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
          >
            <CartesianGrid {...gridStyle} />
            <XAxisStyled label="Week" />

            <YAxisStyled label="Reps" />

            <Line
              dataKey="completedReps"
              dot={false}
              type="monotone"
              name="Completed Reps"
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
            data={weeklyWeightData}
            margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
          >
            <CartesianGrid {...gridStyle} />
            <XAxisStyled label="Week" />

            <YAxisStyled
              label="Weight"
              unit="kg"
              width={48}
              tickFormatter={(v) => `${v / 1000}k`}
            />

            <Line
              dataKey="completedWeight"
              dot={false}
              type="monotone"
              name="Completed Weight"
            />
            <LegendStyled />
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </ChartPageLayout>
  );
}

export default Volume;
