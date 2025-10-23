import { YAxis, Label } from "recharts";
import { tickStyleYAxis, labelStyle } from "../../..//chartStyles";

interface YAxisStyledProps {
  label: string;
  unit?: string;
  width?: number;
  tickFormatter?: (value: number) => string;
}

export function YAxisStyled({
  label,
  unit,
  width = 36,
  tickFormatter,
}: YAxisStyledProps) {
  return (
    <YAxis
      width={width}
      tickMargin={5}
      tickSize={0}
      tick={tickStyleYAxis}
      tickFormatter={tickFormatter}
    >
      {label && (
        <Label
          {...labelStyle}
          value={unit ? `${label} (${unit})` : label}
          position="insideLeft"
          angle={-90}
          offset={-5}
        />
      )}
    </YAxis>
  );
}
