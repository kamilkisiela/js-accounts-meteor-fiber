import { MongoInternals } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import AccountsServer from '@accounts/server';
import MongoAdapter from '@accounts/mongo';

Meteor.startup(() => {
	Meteor.users.remove({});
	
	const mongodb = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
	const mongoAdapter = new MongoAdapter(mongodb, {
		convertUserIdToMongoObjectId: false
	});

	AccountsServer.config({
		tokenConfigs: {
			accessToken: {
				expiresIn: '3d'
			},
			refreshToken: {
				expiresIn: '30d'
			}
		},
		passwordHashAlgorithm: 'sha256'
	}, mongoAdapter);

	const user = {
		username: 'mys',
		email: 'mys@niepodam.pl',
		password: 'admin1'
	};
	
	Accounts.createUser(user);
});

export default AccountsServer;
