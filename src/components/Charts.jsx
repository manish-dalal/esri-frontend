import React from "react";
import { PieChart, Pie, Legend, Cell, Label, Tooltip } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

const colors = scaleOrdinal(schemeCategory10).range();

const renderLabelContent = props => {
  const { percent, x, y, midAngle } = props;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      textAnchor={midAngle < -90 || midAngle >= 90 ? "end" : "start"}
    >
      <text x={0} y={0}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function Charts(props) {
  const groupByDate = groupBy(props.items, "Date");
  const graphData = [];
  Object.keys(groupByDate).map(key => {
    const transactionAmt = sumBy(groupByDate[key], row => {
      return row["Deposit AMT"].replace(/[,]/g, "")
        ? parseFloat(row["Deposit AMT"].replace(/[,]/g, ""))
        : 0 + row["Withdrawal AMT"].replace(/[,]/g, "")
        ? parseFloat(row["Withdrawal AMT"].replace(/[,]/g, ""))
        : 0;
    });
    return graphData.push({ name: key, value: transactionAmt });
  });

  return (
    <div className="pie-charts">
      <div className="pie-chart-wrapper">
        <PieChart width={500} height={350}>
          <Legend paylodUniqBy />
          <Pie
            data={graphData}
            dataKey="value"
            cx={250}
            cy={160}
            startAngle={180}
            endAngle={-180}
            innerRadius={50}
            outerRadius={100}
            label={renderLabelContent}
            paddingAngle={1}
          >
            {graphData.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={colors[index % 10]} />
            ))}
            <Label width={50} position="center">
              Date-wise total transaction
            </Label>
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
