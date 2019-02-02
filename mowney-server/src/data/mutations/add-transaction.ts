import { Transaction } from "../models";
import * as moment from "moment";
import associate from "./associate";

function saveManualTransaction(
  accountId: number,
  date: string,
  description: string,
  amount: number,
) {
  return Promise.resolve(
    Transaction.create({
      date: moment(date).toDate(),
      description,
      amount,
    }),
  ).then(t => associate(t, "Account", "Account", accountId));
}

export default saveManualTransaction;
