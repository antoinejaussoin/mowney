import { schema } from 'normalizr';

export const accountModel = new schema.Entity('accounts', {
    // user
});

export const listOfAccountsModel = new schema.Array(accountModel);

export default accountModel;
