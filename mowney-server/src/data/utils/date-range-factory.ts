import * as moment from "moment";
import getToday from "./get-today";

export function getCurrentMonth() {
  return {
    from: getToday().startOf("month"),
    to: getToday(),
  };
}

export function getLastMonth() {
  return getXLastMonths(1);
}

export function getLast6Months() {
  return getXLastMonths(6);
}

export function getLastYear() {
  return getXLastMonths(12);
}

export function get3Years() {
  return getXLastMonths(36);
}

export function getSinceInception() {
  return {
    from: moment("1900-01-01"),
    to: getToday(),
  };
}

export function getXLastMonths(months) {
  return {
    from: getToday()
      .startOf("month")
      .subtract(months, "month"),
    to: getToday()
      .subtract(1, "month")
      .endOf("month"),
  };
}
