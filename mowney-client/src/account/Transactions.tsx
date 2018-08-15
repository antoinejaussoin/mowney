import React, { SFC } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface ITransactionTableProps {
  transactions: GQL.ITransactionWithBalance[];
}

const TransactionTable: SFC<ITransactionTableProps> = ({ transactions }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell numeric>Debit</TableCell>
            <TableCell numeric>Credit</TableCell>
            <TableCell numeric>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(t => {
            return (
              <TableRow key={t.id!}>
                <TableCell component="th" scope="row">
                  {t.date}
                </TableCell>
                <TableCell numeric>{t.description}</TableCell>
                <TableCell numeric>{t.category}</TableCell>
                <TableCell numeric>
                  {t.amount && t.amount < 0 ? t.amount : ""}
                </TableCell>
                <TableCell numeric>
                  {t.amount && t.amount >= 0 ? t.amount : ""}
                </TableCell>
                <TableCell numeric>{t.balance}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TransactionTable;
