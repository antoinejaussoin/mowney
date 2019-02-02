import React, { SFC } from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@material-ui/core";
import AddProfitLoss from "./AddProfitLoss";

const format = "0,0.00";

interface ITableProps {
  summary: GQL.IAccountSummary[];
  total: number;
}

const AccountsTable: SFC<ITableProps> = ({ summary, total }) => (
  <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th">Account</TableCell>
          <TableCell component="th">Currency</TableCell>
          <TableCell component="th">Balance (in currency)</TableCell>
          <TableCell component="th">Balance (in GBP)</TableCell>
          <TableCell component="th">Profit/Loss</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {summary.map((line, i) => (
          <TableRow key={line.id!}>
            <TableCell component="th">
              <Link to={`/account/${line.id}`}>{line.name}</Link>
            </TableCell>
            <TableCell>{line.currency}</TableCell>
            <TableCell>{numeral(line.balance).format(format)}</TableCell>
            <TableCell>
              {numeral(line.balanceInCurrency).format(format)}
            </TableCell>
            <TableCell>
              <AddProfitLoss accountId={line.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableCell component="th">Total</TableCell>
        <TableCell component="th">&nbsp;</TableCell>
        <TableCell component="th">&nbsp;</TableCell>
        <TableCell component="th">{numeral(total).format(format)}</TableCell>
      </TableFooter>
    </Table>
  </>
);

export default AccountsTable;
