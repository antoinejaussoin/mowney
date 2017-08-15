import groupBy from 'lodash/groupBy';
import partialRight from 'lodash/partialRight';
import toPairs from 'lodash/toPairs';
import sumBy from 'lodash/sumBy';
import sortBy from 'lodash/sortBy';
import { toAmount } from 'utils/format';
import { round } from 'utils/math';

const groupTransactions = (transactions, groupByFunction) => {
  if (!transactions) {
    return [];
  }
  const sorted = sortBy(transactions, t => t.dateMoment);
  const grouped = groupBy(sorted, groupByFunction);
  console.log('Grouped: ', grouped);

  const buckets = toPairs(grouped).map(pair => {
    const total = round(sumBy(pair[1], t => +t.amountInCurrency));
    return {
      date: pair[0] || '(none)',
      value: total,
      formattedValue: toAmount(total)
    };
  });

  console.log('buckets: ', buckets);
  return buckets;
};

export const groupByMonth = partialRight(groupTransactions, t => t.dateMoment.format('MM-YYYY'));
export const groupByYear = partialRight(groupTransactions, t => t.dateMoment.format('YYYY'));
export const groupByAccount = partialRight(groupTransactions, t => t.accountId.name);
export const groupByCategory = partialRight(groupTransactions, t => t.categoryId ? t.categoryId.name : '(none)');

export default groupTransactions;
