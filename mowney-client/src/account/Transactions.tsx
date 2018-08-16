import React, { SFC } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface ITransactionTableProps {
  transactions: GQL.ITransactionWithBalance[];
}

const TransactionTable: SFC<
  ITransactionTableProps & ITablePaginationActionsProps
> = ({
  transactions,
  onChangePage,
  onChangeRowsPerPage,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  page,
  rowsPerPage,
  count,
}) => {
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
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.category ? t.category!.name : ""}</TableCell>
                <TableCell numeric>
                  {t.amount && t.amount < 0 ? -t.amount : ""}
                </TableCell>
                <TableCell numeric>
                  {t.amount && t.amount >= 0 ? t.amount : ""}
                </TableCell>
                <TableCell numeric>{t.balance}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={3}>
              <TablePaginationActions
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                onFirst={onFirst}
                onLast={onLast}
                onPrevious={onPrevious}
                onNext={onNext}
                page={page}
                rowsPerPage={rowsPerPage}
                count={count}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

interface ITablePaginationActionsProps {
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  page: number;
  count: number;
  rowsPerPage: number;
}

class TablePaginationActions extends React.Component<
  ITablePaginationActionsProps
> {
  public render() {
    const {
      count,
      page,
      rowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
    } = this.props;
    const numberOfPages = Math.ceil(count / rowsPerPage) - 1;

    return (
      <>
        <span style={{ marginRight: 20 }}>
          Page {page + 1} of {numberOfPages + 1}
        </span>
        <Select
          value={rowsPerPage}
          onChange={value => {
            onChangePage(0);
            onChangeRowsPerPage(+value.target.value);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={99999999}>All</MenuItem>
        </Select>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= numberOfPages}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= numberOfPages}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </>
    );
  }

  private handleFirstPageButtonClick = () => {
    this.props.onChangePage(0);
  };

  private handleBackButtonClick = () => {
    this.props.onChangePage(this.props.page - 1);
  };

  private handleNextButtonClick = () => {
    this.props.onChangePage(this.props.page + 1);
  };

  private handleLastPageButtonClick = () => {
    this.props.onChangePage(
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };
}

export default TransactionTable;
