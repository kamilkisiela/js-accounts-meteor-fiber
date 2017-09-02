import { authenticated } from '@accounts/graphql-api';

import AccountsServer from './accounts-server';
import { Messages } from './messages';

export default {
  User: {
    messages: () => Messages.find().fetch(),
  },
  Message: {
    id: (r) => r._id,
    text: (r) => r.text
  },
  Query: {
    hello: () => Messages.findOne()
  },
  Mutation: {
    sayHello: (r, a) => Messages.findOne(a.id),
  },
};
