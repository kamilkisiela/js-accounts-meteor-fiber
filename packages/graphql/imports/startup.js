import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Messages } from './messages';
import user from './user';

Meteor.startup(() => {
  Messages.remove({});
  Messages.insert({
    text: 'Hello World'
  });

  Meteor.users.remove({});
  Accounts.createUser(user);
});
