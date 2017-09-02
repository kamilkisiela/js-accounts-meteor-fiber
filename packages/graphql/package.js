Package.describe({
	name: 'graphql',
	version: '0.0.1',
	summary: 'GraphQL API',
	git: ''
});

Package.onUse(function(api) {
	api.use([
    'webapp',
    'ecmascript',
    'mongo'
	]);

  api.mainModule('imports/server.js', 'server');
  api.mainModule('imports/client.js', 'client');
});

Npm.depends({
  "@accounts/graphql-api": "0.1.1",
  "@accounts/mongo": "0.0.12",
  "@accounts/server": "0.0.18",
  "apollo-server-express": "1.1.2",
  "body-parser": "1.17.2",
  "cors": "2.8.4",
  "express": "4.15.4",
  "graphql": "0.10.1",
  "graphql-tools": "1.2.2"
});
