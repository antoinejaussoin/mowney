import React, { PropTypes } from 'react';
import flow from 'lodash/flow';
import classNames from 'classnames';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { getSummary, getTotal } from '../selectors';
import style from './AccountTable.scss';

const format = '0,0.00';

const stateToProps = state => ({
    summary: getSummary(state),
    total: getTotal(state)
});

const actionsToProps = dispatch => ({
    dispatch
});

const Table = ({ summary, total }) => (
    <table className={style.table}>
        <thead>
            <tr>
                <th>Account</th>
                <th>Currency</th>
                <th>Balance (in currency)</th>
                <th>Balance (in GBP)</th>
            </tr>
        </thead>
        <tbody>
            { summary.lines.map((line, i) =>
                <Line line={line} isEven={i % 2 === 0} key={line.id} />) }
        </tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>{numeral(total).format(format)}</th>
            </tr>
        </tfoot>
    </table>
);

Table.propTypes = {
    summary: PropTypes.object,
    total: PropTypes.number
};

const Line = ({ line, isEven }) => (
    <tr className={classNames({ [style.even]: isEven })}>
        <td>{ line.name }</td>
        <td>{ line.currency }</td>
        <td className={style.right}>{ numeral(line.balance).format(format) }</td>
        <td className={style.right}>{ numeral(line.balanceInCurrency).format(format) }</td>
    </tr>
);

Line.propTypes = {
    line: PropTypes.object,
    isEven: PropTypes.bool
};

const decorators = flow([
    connect(stateToProps, actionsToProps)
]);

export default decorators(Table);
