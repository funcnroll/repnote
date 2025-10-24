import { Legend } from "recharts";
import { legendStyle } from "../../../../chartStyles";

export function LegendStyled() {
  return (
    <Legend
      height={48}
      verticalAlign="top"
      align="center"
      iconType="circle"
      wrapperStyle={legendStyle}
    />
  );
}
