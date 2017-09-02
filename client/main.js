import { user } from 'meteor/graphql';
import { HTTP } from 'meteor/http';

const operationName = 'login';

const query = `
  mutation ${operationName}($user: UserInput!, $password: String!) {
    loginWithPassword(user: $user, password: $password) {
      tokens {
        accessToken
        refreshToken
      }
      user {
        username
        messages {
          id
          text
        }
      }
    }
  }
`;

const variables = {
  password: user.password,
  user: {
    username: user.username
  }
};

HTTP.call('POST', 'http://localhost:3000/graphql', {
  data: {
    query,
    variables,
    operationName
  }
}, (error, response) => {
  if (!error) {
    document.write(response.data.data.loginWithPassword.user.messages ? 'SUCCESS' : 'FAILURE');
  } else {
    document.write('ERROR');
  }
});
