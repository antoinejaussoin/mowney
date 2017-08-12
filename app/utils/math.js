export const round = (number, digits = 8) => Math.round(number * (10 ** digits)) / (10 ** digits);
