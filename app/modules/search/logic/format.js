import moment from 'moment';
import { toAmount } from 'utils/format';

export default (transaction) => ({
  ...transaction,
  date: moment(transaction.date).format('DD/MM/YYYY'),
  dateMoment: moment(transaction.date),
  debit: transaction.amountInCurrency < 0 ? toAmount(-transaction.amountInCurrency) : null,
  credit: transaction.amountInCurrency >= 0 ? toAmount(transaction.amountInCurrency) : null,
  accountName: transaction.accountId.name,
  categoryName: transaction.categoryId ? transaction.categoryId.name : ''
});
