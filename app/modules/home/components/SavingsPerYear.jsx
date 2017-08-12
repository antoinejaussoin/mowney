import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer } from 'recharts';
import { getSavingsPerYear } from '../selectors';

const stateToProps = state => ({
  data: getSavingsPerYear(state)
});

const SavingsPerYear = ({ data }) => (
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
      <Bar dataKey="amount" fill="#8884d8" label="Savings per Year">
        {
          data.map((entry) => (
            <Cell fill={entry.amount >= 0 ? '#81c784' : '#e57373'} />
          ))
        }
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

SavingsPerYear.propTypes = {
  data: PropTypes.array
};

export default connect(stateToProps)(SavingsPerYear);
