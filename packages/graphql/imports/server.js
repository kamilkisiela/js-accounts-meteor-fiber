import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { JSAccountsContext, createJSAccountsGraphQL } from '@accounts/graphql-api';
import { execute, subscribe } from 'graphql';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';

import AccountsServer from './accounts-server';

import './startup';

const accountsGraphQL = createJSAccountsGraphQL(AccountsServer);

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, accountsGraphQL.schema],
  resolvers: accountsGraphQL.extendWithResolvers(resolvers),
});

// the Meteor GraphQL server is an Express server
const graphQLServer = express();

graphQLServer.use(cors());
graphQLServer.use(bodyParser.urlencoded({ extended: true }));

graphQLServer.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress(request => {
		const context = JSAccountsContext(request);

		context.authToken = 1234;
		
		return {
			schema,
			context,
			formatError: e => ({
				message: e.message,
				locations: e.locations,
				path: e.path
			}),
			debug: Meteor.isDevelopment
		};
	})
);

graphQLServer.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql'
}));

// this binds the specified paths to the Express server running Apollo + GraphiQL
WebApp.connectHandlers.use(graphQLServer);
