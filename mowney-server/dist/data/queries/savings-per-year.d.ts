import { IUser } from '../models/user';
export interface SavingPerYear {
    date: string;
    amount: number;
}
declare const _default: (user: IUser, currency: string) => Promise<SavingPerYear[]>;
export default _default;
