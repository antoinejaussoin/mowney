declare const mocks: {
    String: () => string;
    Query: () => {
        accountById: (root: any, args: any) => {
            id: any;
        };
    };
    Account: () => {
        name: () => string;
        loaderType: () => any;
        isActive: () => boolean;
        isStatEnabled: () => boolean;
    };
    Transaction: () => {
        amount: () => number;
        date: () => (format?: string) => string;
        description: () => string;
        categorisedDate: () => (format?: string) => string;
    };
    User: () => {
        firstName: () => string;
        lastName: () => string;
        email: () => string;
        password: () => string;
        isAdministrator: () => boolean;
    };
    Currency: () => {
        isoCode: () => string;
    };
};
export default mocks;
