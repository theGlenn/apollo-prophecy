# Apollo Errors Generator

This is a simple utility to generate *throwable* Apollo errors for your server while also being able to expose through your API as documentation.


## Usage
First thing you should install `apollo-errorgen` globaly

```sh
npm i -g apollo-errorgen
```

### Server
#### `generate`

The purpose of this command is to create a JSON introspection dump file for a given graphql schema. The input schema can be fetched from a remote graphql server or from a local file. The resulting JSON introspection dump file is needed as input to the [generate](#generate) command.

To download a GraphQL schema by sending an introspection query to a server:

This command creates the `Error.ts` file, using `--output` param you can change the name and location.

```sh
apollo-errorgen generate errors.json
````

For example given the following `errors.json`:

```json
{
  "AuthenticationRequiredError": {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
  "UserNotFoundError": {
    "message": "No user found",
    "code": "USER_NOT_FOUND"
  },
}
```

Apollo Errorgen will generate the following `Errors.ts`

```ts
export class AuthenticationRequiredError extends PythianError {
  constructor(properties?: Record<string, any>) {
    super("AuthenticationRequiredError", "You must be logged in to do this","AUTH_REQUIRED", properties);
  }
}
  
export class UserNotFoundError extends PythianError {
  constructor(properties?: Record<string, any>) {
    super("UserNotFoundError", "No user found", "USER_NOT_FOUND", properties);
  }
}
```

Now you can use it the following way `throw new UserNotFoundError()`

`apollo-errorgen` also exposes a `definitions` and a graphql type named `PythianError` so that you can expose all your errors descriptions through resolvers, [go see Client](###client).

```ts
...
export const definitions = {
  "AuthenticationRequiredError": {
    "message": "You must be logged in to do this",
    "code": "AUTH_REQUIRED"
  },
  "UserNotFoundError": {
    "message": "No user found",
    "code": "USER_NOT_FOUND"
  }
};

export const errorType = `
  type PythianError {
    message: String
    code: String
  }
`;
...
```

### Client
*TODO*

## TODO
* Client `apollo-errorgen ask` command see