import PropTypes from 'prop-types';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, legend = 'Amount' }) => (
  <ResponsiveContainer height={400}>
    <BarChart data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="value" fill="#81c784" name={legend}>
        {
          data.map((entry) => (
            <Cell fill={entry.value >= 0 ? '#81c784' : '#e57373'} />
          ))
        }
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

CustomBarChart.propTypes = {
  data: PropTypes.array,
  legend: PropTypes.string
};

export default CustomBarChart;
