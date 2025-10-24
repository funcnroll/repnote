import Chart from "../../components/reusable/chart/Chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import { chartColors, gridStyle } from "../../../chartStyles";

import { useConsistencyData } from "@/hooks/useConsistencyData";
import { LegendStyled } from "@/components/reusable/chart/LegendStyled";
import { XAxisStyled } from "@/components/reusable/chart/XAxisStyled";
import { YAxisStyled } from "@/components/reusable/chart/YAxisStyled";
import { ChartPageLayout } from "@/components/reusable/chart/ChartPageLayout";

function Consistency() {
  const { weeklySetComparisonData, weeklyDuration, weeklyAdherence } =
    useConsistencyData();

  return (
    <ChartPageLayout
      title="Consistency"
      description="Track how consistently you’ve been training over time."
    >
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

            <LegendStyled />
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

            <LegendStyled />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </ChartPageLayout>
  );
}

export default Consistency;
