import * as moment from "moment";

export default function getToday() {
  return moment().startOf("day");
}
