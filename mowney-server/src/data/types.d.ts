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
    me: IUser | null;
    accountById: IAccount | null;
    allAccounts: Array<IAccount | null> | null;
    summaries: ISummaries | null;
    savingsPerYear: Array<ISavingPerYear | null> | null;
    savingsPerRange: ISavingPerRange | null;
    savingsAllRanges: Array<ISavingPerRange | null> | null;
    primarySavingsAllRanges: Array<ISavingPerRange | null> | null;
    transactions: Array<ITransactionWithBalance | null> | null;
  }

  interface IAccountByIdOnQueryArguments {
    id?: string | null;
  }

  interface ISummariesOnQueryArguments {
    currency?: string | null;
  }

  interface ISavingsPerYearOnQueryArguments {
    currency?: string | null;
  }

  interface ISavingsPerRangeOnQueryArguments {
    currency?: string | null;
    range?: Range | null;
  }

  interface ISavingsAllRangesOnQueryArguments {
    currency?: string | null;
  }

  interface IPrimarySavingsAllRangesOnQueryArguments {
    currency?: string | null;
  }

  interface ITransactionsOnQueryArguments {
    accountId?: string | null;
    offset?: number | null;
    limit?: number | null;
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
    isoCode: string | null;
    name: string | null;
    isMain: boolean | null;
    symbol: string | null;
    format: string | null;
  }

  interface IAccount {
    __typename: "Account";
    id: string | null;
    name: string | null;
    loaderType: string | null;
    isActive: boolean | null;
    isStatEnabled: boolean | null;
    transactions: Array<ITransaction | null> | null;
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
    name: string | null;
    description: string | null;
    parent: ICategory | null;
    children: Array<ICategory | null> | null;
  }

  interface IImport {
    __typename: "Import";
    date: string | null;
    fileName: string | null;
    isManual: boolean | null;
  }

  interface ICategoryClue {
    __typename: "CategoryClue";
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

  interface ISummaries {
    __typename: "Summaries";
    summaries: Array<IAccountSummary | null> | null;
    total: number | null;
  }

  interface IAccountSummary {
    __typename: "AccountSummary";
    id: string | null;
    name: string | null;
    currency: string | null;
    balance: number | null;
    balanceInCurrency: number | null;
    rateToUsd: number | null;
    rateToCurrency: number | null;
  }

  interface ISavingPerYear {
    __typename: "SavingPerYear";
    date: string | null;
    amount: number | null;
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
    from: string | null;
    to: string | null;
    range: Range | null;
    amount: number | null;
    months: number | null;
    amountPerMonth: number | null;
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
    balance: number | null;
  }

  interface IMutation {
    __typename: "Mutation";
    login: string | null;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IExchangeRate {
    __typename: "ExchangeRate";
    date: string | null;
    rate: number | null;
    currency: ICurrency | null;
  }
}

// tslint:enable
