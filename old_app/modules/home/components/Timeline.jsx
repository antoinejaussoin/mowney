import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,
  ResponsiveContainer } from 'recharts';
import { getTimeline } from '../selectors';

const stateToProps = state => ({
  data: getTimeline(state)
});

const Timeline = ({ data }) => (
  <ResponsiveContainer height={400}>
    <LineChart data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" tickFormatter={v => moment(v).format('MMM-YYYY')} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="balance" stroke="#8884d8" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

Timeline.propTypes = {
  data: PropTypes.array
};

export default connect(stateToProps)(Timeline);
