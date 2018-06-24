// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
accountById: IAccount | null;
allAccounts: Array<IAccount> | null;
savingsPerYear: Array<ISavingPerYear> | null;
transactions: Array<ITransactionWithBalance> | null;
}

interface IAccountByIdOnQueryArguments {
id?: string | null;
}

interface ISavingsPerYearOnQueryArguments {
currency?: string | null;
}

interface ITransactionsOnQueryArguments {
accountId?: string | null;
limit?: number | null;
}

interface IAccount {
__typename: "Account";
id: string | null;
name: string | null;
loaderType: string | null;
isActive: boolean | null;
isStatEnabled: boolean | null;
transactions: Array<ITransaction> | null;
currency: ICurrency | null;
owner: IUser | null;
}

interface ITransaction {
__typename: "Transaction";
id: string | null;
amount: number | null;
date: string | null;
description: string | null;
categorisedDate: string | null;
account: IAccount | null;
category: ICategory | null;
import: IImport | null;
categoryClue: ICategoryClue | null;
}

interface ICategory {
__typename: "Category";
id: string | null;
name: string | null;
description: string | null;
parent: ICategory | null;
children: Array<ICategory> | null;
}

interface IImport {
__typename: "Import";
id: string | null;
date: string | null;
fileName: string | null;
isManual: boolean | null;
}

interface ICategoryClue {
__typename: "CategoryClue";
id: string | null;
type: string | null;
mustBeCredit: boolean | null;
mustBeDebit: boolean | null;
validFrom: string | null;
validTo: string | null;
exactString: string | null;
regex: string | null;
category: ICategory | null;
user: IUser | null;
restrictToAccount: IAccount | null;
}

interface IUser {
__typename: "User";
id: string | null;
firstName: string | null;
lastName: string | null;
email: string | null;
password: string | null;
isAdministrator: boolean | null;
currency: ICurrency | null;
}

interface ICurrency {
__typename: "Currency";
id: string | null;
isoCode: string | null;
name: string | null;
isMain: boolean | null;
symbol: string | null;
format: string | null;
}

interface ISavingPerYear {
__typename: "SavingPerYear";
date: string | null;
amount: number | null;
}

interface ITransactionWithBalance {
__typename: "TransactionWithBalance";
id: string | null;
amount: number | null;
date: string | null;
description: string | null;
categorisedDate: string | null;
account: IAccount | null;
category: ICategory | null;
import: IImport | null;
categoryClue: ICategoryClue | null;
}

interface IExchangeRate {
__typename: "ExchangeRate";
id: string | null;
date: string | null;
rate: number | null;
currency: ICurrency | null;
}
}

// tslint:enable
