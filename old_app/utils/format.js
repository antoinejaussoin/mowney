import numeral from 'numeral';

const amountFormat = '0,0.00';

export const toAmount = (value) => numeral(value).format(amountFormat);
