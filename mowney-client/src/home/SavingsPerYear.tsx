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
import SavingsPerYearFetcher from "../fetchers/SavingsPerYearFetcher";

class SavingsPerYear extends Component {
  public render() {
    return (
      <SavingsPerYearFetcher>
        {data => (
          <ContainerDimensions>
            {({ width }: { width: number }) => (
              <BarChart
                data={data}
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
        )}
      </SavingsPerYearFetcher>
    );
  }
}

export default SavingsPerYear;
