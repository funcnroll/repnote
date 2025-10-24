import { XAxis, Label } from "recharts";
import { tickStyleXAxis, labelStyle } from "../../../..//chartStyles";

interface XAxisStyledProps {
  label: string;
  width?: number;
  tickFormatter?: (value: number) => string;
}

export function XAxisStyled({ label, width, tickFormatter }: XAxisStyledProps) {
  return (
    <XAxis
      dataKey="week"
      tickMargin={8}
      padding={{ left: 12, right: 12 }}
      tickFormatter={tickFormatter ?? ((v) => (v % 2 === 0 ? v : ""))}
      tick={tickStyleXAxis}
      width={width}
    >
      {label && (
        <Label
          {...labelStyle}
          value={label}
          position="insideBottom"
          offset={-15}
        />
      )}
    </XAxis>
  );
}
