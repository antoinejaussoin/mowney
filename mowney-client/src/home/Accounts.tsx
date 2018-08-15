import React, { SFC } from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";

const format = "0,0.00";

interface ITableProps {
  summary: GQL.IAccountSummary[];
  total: number;
}

const Table: SFC<ITableProps> = ({ summary, total }) => (
  <table>
    <thead>
      <tr>
        <th>Account</th>
        <th>Currency</th>
        <th>Balance (in currency)</th>
        <th>Balance (in GBP)</th>
      </tr>
    </thead>
    <tbody>
      {summary.map((line, i) => (
        <Line line={line} isEven={i % 2 === 0} key={line.id!} />
      ))}
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

interface ILineProps {
  line: GQL.IAccountSummary;
  isEven: boolean;
}

const Line: SFC<ILineProps> = ({ line, isEven }) => (
  <tr>
    <td>
      <Link to={`/account/${line.id}`}>{line.name}</Link>
    </td>
    <td>{line.currency}</td>
    <td>{numeral(line.balance).format(format)}</td>
    <td>{numeral(line.balanceInCurrency).format(format)}</td>
  </tr>
);

export default Table;
