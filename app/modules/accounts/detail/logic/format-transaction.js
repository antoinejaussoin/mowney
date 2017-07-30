import moment from 'moment';
import { toAmount } from 'utils/format';

export default (transaction) => ({
    ...transaction,
    date: moment(transaction.date).format('DD/MM/YYYY'),
    debit: transaction.amount < 0 ? toAmount(-transaction.amount) : null,
    credit: transaction.amount >= 0 ? toAmount(transaction.amount) : null
});
