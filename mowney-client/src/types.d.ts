// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
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
    me: IUser;
    accountById: IAccount;
    allAccounts: Array<IAccount>;
    summaries: ISummaries;
    savingsPerYear: Array<ISavingPerYear>;
    savingsPerRange: ISavingPerRange;
    savingsAllRanges: Array<ISavingPerRange>;
    transactions: Array<ITransactionWithBalance>;
  }

  interface IAccountByIdOnQueryArguments {
    id: string;
  }

  interface ISummariesOnQueryArguments {
    currency: string;
  }

  interface ISavingsPerYearOnQueryArguments {
    currency: string;
  }

  interface ISavingsPerRangeOnQueryArguments {
    currency: string;
    range?: Range | null;
  }

  interface ISavingsAllRangesOnQueryArguments {
    currency: string;
  }

  interface ITransactionsOnQueryArguments {
    accountId: string;
    offset: number;
    limit: number;
  }

  interface IUser {
    __typename: "User";
    id: string;
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
    categorisedDate: string | null;
    account: IAccount;
    category: ICategory | null;
    import: IImport | null;
    categoryClue: ICategoryClue | null;
  }

  interface ICategory {
    __typename: "Category";
    name: string;
    description: string;
    parent: ICategory | null;
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
    exactString: string | null;
    regex: string | null;
    category: ICategory;
    user: IUser;
    restrictToAccount: IAccount | null;
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
    rateToUsd: number | null;
    rateToCurrency: number | null;
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
    amount: number | null;
    months: number;
    amountPerMonth: number | null;
  }

  interface ITransactionWithBalance {
    __typename: "TransactionWithBalance";
    id: string;
    amount: number;
    date: string;
    description: string;
    categorisedDate: string | null;
    account: IAccount;
    category: ICategory | null;
    import: IImport | null;
    categoryClue: ICategoryClue | null;
    balance: number;
  }

  interface IMutation {
    __typename: "Mutation";
    login: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IExchangeRate {
    __typename: "ExchangeRate";
    date: string;
    rate: number;
    currency: ICurrency;
  }

  interface ITransactions {
    __typename: "Transactions";
    count: number;
    transactions: Array<ITransactionWithBalance>;
  }
}

// tslint:enable
