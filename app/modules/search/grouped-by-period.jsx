import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'components/Table';
import { BarChart } from 'components/Chart';

const GroupByModel = {
  date: { type: Date, title: 'Period' },
  formattedValue: { type: String, title: 'Total' }
};

const GroupByPeriod = ({ transactions }) => (
  <div>
    <BarChart data={transactions} />
    <Table
      model={GroupByModel}
      source={transactions}
      selectable={false}
    />
  </div>
);

GroupByPeriod.propTypes = {
  transactions: PropTypes.array
};

const mapStateToProps = (state, { selector }) => ({
  transactions: selector(state)
});

export default connect(mapStateToProps)(GroupByPeriod);
