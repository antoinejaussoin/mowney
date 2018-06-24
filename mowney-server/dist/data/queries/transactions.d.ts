import { IUser } from '../models/user';
import { ITransactions } from '../models/transactions';
export interface TransactionWithBalance extends ITransactions {
    balance: number;
}
declare const _default: (user: IUser, accountId: number, limit?: number) => Promise<TransactionWithBalance[]>;
export default _default;
