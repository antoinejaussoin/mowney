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
    accountById: IAccount;
    allAccounts: Array<IAccount>;
    summaries: ISummaries;
    savingsPerYear: Array<ISavingPerYear>;
    savingsPerRange: ISavingPerRange;
    savingsAllRanges: Array<ISavingPerRange>;
    transactions: Array<ITransactionWithBalance>;
  }

  interface IAccountByIdOnQueryArguments {
    id?: string;
  }

  interface ISummariesOnQueryArguments {
    currency?: string;
  }

  interface ISavingsPerYearOnQueryArguments {
    currency?: string;
  }

  interface ISavingsPerRangeOnQueryArguments {
    currency?: string;
    range?: Range;
  }

  interface ISavingsAllRangesOnQueryArguments {
    currency?: string;
  }

  interface ITransactionsOnQueryArguments {
    accountId?: string;
    offset?: number;
    limit?: number;
  }

  interface IAccount {
    __typename: "Account";
    id: string;
    name: string;
    loaderType: string;
    isActive: boolean;
    isStatEnabled: boolean;
    transactions: Array<ITransaction>;
    currency: ICurrency;
    owner: IUser;
  }

  interface ITransaction {
    __typename: "Transaction";
    id: string;
    amount: number;
    date: string;
    description: string;
    categorisedDate: string;
    account: IAccount;
    category: ICategory;
    import: IImport;
    categoryClue: ICategoryClue;
  }

  interface ICategory {
    __typename: "Category";
    name: string;
    description: string;
    parent: ICategory;
    children: Array<ICategory>;
  }

  interface IImport {
    __typename: "Import";
    date: string;
    fileName: string;
    isManual: boolean;
  }

  interface ICategoryClue {
    __typename: "CategoryClue";
    type: string;
    mustBeCredit: boolean;
    mustBeDebit: boolean;
    validFrom: string;
    validTo: string;
    exactString: string;
    regex: string;
    category: ICategory;
    user: IUser;
    restrictToAccount: IAccount;
  }

  interface IUser {
    __typename: "User";
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdministrator: boolean;
    currency: ICurrency;
  }

  interface ICurrency {
    __typename: "Currency";
    isoCode: string;
    name: string;
    isMain: boolean;
    symbol: string;
    format: string;
  }

  interface ISummaries {
    __typename: "Summaries";
    summaries: Array<IAccountSummary>;
    total: number;
  }

  interface IAccountSummary {
    __typename: "AccountSummary";
    id: string;
    name: string;
    currency: string;
    balance: number;
    balanceInCurrency: number;
    rateToUsd: number;
    rateToCurrency: number;
  }

  interface ISavingPerYear {
    __typename: "SavingPerYear";
    date: string;
    amount: number;
  }

  const enum Range {
    currentMonth = "currentMonth",
    lastMonth = "lastMonth",
    sixMonth = "sixMonth",
    oneYear = "oneYear",
    threeYears = "threeYears",
    inception = "inception",
  }

  interface ISavingPerRange {
    __typename: "SavingPerRange";
    from: string;
    to: string;
    range: Range;
    amount: number;
    months: number;
    amountPerMonth: number;
  }

  interface ITransactionWithBalance {
    __typename: "TransactionWithBalance";
    id: string;
    amount: number;
    date: string;
    description: string;
    categorisedDate: string;
    account: IAccount;
    category: ICategory;
    import: IImport;
    categoryClue: ICategoryClue;
    balance: number;
  }

  interface IExchangeRate {
    __typename: "ExchangeRate";
    date: string;
    rate: number;
    currency: ICurrency;
  }
}

// tslint:enable
