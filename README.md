<h1 align="center">Apollo Prophecy</h1>

<div align="center">
🙏📟🙏
</div>

<div align="center">
  Command tool to generate errors files for your Appolo Server and Client 
</div>

<div align="center">
  <!-- NPM version -->
  <a href="https://npmjs.org/package/apollo-prophecy">
    <img src="https://img.shields.io/npm/v/apollo-prophecy.svg?style=flat-square"
      alt="NPM version" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.com/theGlenn/apollo-prophecy">
    <img src="https://travis-ci.com/theGlenn/apollo-prophecy.svg?branch=master&style=flat-square"
      alt="Build Status" />
  </a>
</div>



## 📟 Features
* Generate **throwable** Apollo errors for your server from a json file
* Expose spec compliant graphql errors through your api documentation

## Install
First, install `apollo-prophecy` globaly

```sh
npm install -g apollo-prophecy
```

## Usage

```
Usage: apollo-prophecy [command]

Commands:
  apollo-prophecy generate [--file] [--out]
  apollo-prophecy ask-errors <graphql endpoint> [--query]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Display version number                                [boolean]
```

### Server
#### `generate`
This command creates the `Error.ts` file from a `Json` definition file, using `--out` param you can change the name and location.

```sh
apollo-prophecy generate errors.json
```

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
export class AuthenticationRequiredError extends ProphecyError {
  constructor(properties?: Record<string, any>) {
    super("AuthenticationRequiredError", "You must be logged in to do this","AUTH_REQUIRED", properties);
  }
}
  
export class UserNotFoundError extends ProphecyError {
  constructor(properties?: Record<string, any>) {
    super("UserNotFoundError", "No user found", "USER_NOT_FOUND", properties);
  }
}
```

Now you can use it the following way `throw new UserNotFoundError()`

`apollo-errorgen` also exposes a `definitions` and a graphql type named `ProphecyError` so that you can expose all your errors descriptions through resolvers, [go see Client](###client).

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
  type ProphecyError {
    message: String
    code: String
  }
`;
...
```

### Client
*TODO*

## TODO
* See [#1][i1]: Client `apollo-errorgen ask` command
* See [#2][i2]: Add support for third party libraries errors like [apollo-errors](https://github.com/thebigredgeek/apollo-errors)
* See [#3][i3]: Use [Yargs](https://github.com/yargs/yargs) for arguments parsing

[i1]: https://github.com/theGlenn/apollo-prophecy/issues/1
[i2]: https://github.com/theGlenn/apollo-prophecy/issues/2
[i3]: https://github.com/theGlenn/apollo-prophecy/issues/3

## Contribute
Take an issue fork `/develop` -> work -> test -> pull request -> 💥

## Run tests
```sh
npm test
```

```sh
yarn test
```