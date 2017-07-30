import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const account = new schema.Entity('accounts', {
  user
});
export const summary = new schema.Entity('summaries');

