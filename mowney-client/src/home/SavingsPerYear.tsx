import React, { Component } from "react";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ContainerDimensions from "react-container-dimensions";

interface ISavingsPerYearProps {
  savings: [GQL.ISavingPerYear];
}

class SavingsPerYear extends Component<ISavingsPerYearProps> {
  public render() {
    return (
      <ContainerDimensions>
        {({ width }: { width: number }) => (
          <BarChart
            data={this.props.savings}
            margin={{ top: 5, bottom: 5 }}
            height={600}
            width={width}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        )}
      </ContainerDimensions>
    );
  }
}

export default SavingsPerYear;
