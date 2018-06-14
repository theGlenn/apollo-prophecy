<p align="center"><img src="https://imgur.com/AuFdzQQ.png" width="100" /></p>
<h1 align="center">Apollo Prophecy</h1>

<div align="center">
🙏📟🙏
<br/><strong>You shall fail... successfully</strong>
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
* Generate **Server-side** **throwable** errors in your resolvers like `throw new NotAProphetError()`
* Expose **machine readable** graphql errors through your api documentation
* Generate **Client-side** Apollo errors **consumable** like `errorHere(error).isNotAProphetError ?`

### Table of Contents
**[Installation](#installation)**<br>
**[Usage](#usage)**
* **[Server](#server)**
* **[Client](#client)**<br>

**[TODO](#todo)**<br>
**[Contribute](#contribute)**<br>
**[Test and Miscellaneous](#run-tests)**<br>

## Installation
First, install `apollo-prophecy` globaly

```sh
npm install -g apollo-prophecy
```

## Usage

```
Usage: apollo-prophecy [command]

Commands:
  apollo-prophecy generate <json file> [--file] [--out]
  apollo-prophecy ask <graphql endpoint> [--type]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Display version number                                [boolean]
```

### Server
#### `generate` command
This command creates the `Error.ts` file from a `JSON` input file, using `--out` param you can change the name and location.
Input file should at least contains the keys `message` and `code`

```sh
apollo-prophecy generate errors.json
```

For example given the following `errors.json` as input:

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

Apollo Prophecy will generate the following `Errors.ts`

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

Now you can use it the following way `throw new UserNotFoundError()` in your resolvers.

`apollo-prophecy` also exposes a `definitions` object and a graphql type definition named `PropheticError` so that you can expose all your errors descriptions through resolvers, [go see Client](###client).

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
  type PropheticErrorExtensions {
    code: String
  }

  type PropheticError {
    message: String
    extensions: PropheticErrorExtensions
  }
`;
...
```

### Client
#### `ask` command
This command queries the `errors` field on a graphql endpoint and creates an `Errors.ts` file containing **helpers** for all the errors exposed through the server api documentation.

```sh
apollo-prophecy ask http://localhost:3000/graphql
```

#### Usage
In order to easily handle erros with **Apollo-Client**, the generated `Errors.ts` exposes two methods `errorHere` and `isThis`, both takes one paramater of type `ApolloError` or `GraphQLError`.

##### `errorHere()` function

`errorHere` returns an object that has a **property** for each errors.
You can perform a simple `boolean` check on the `error` argument by calling the approiate *key*.

```ts
import { errorHere } from `./_generated/Errors.ts`;

...(error) => {
  if(errorHere(error).isUserNotFoundError){
    // Do something
  } else if(errorHere(error).isNotAProphetError){
    // Do something else
  }
}
```

##### `isThis()` function
`isThis` returns an object that has a **handler** method for each errors.
It perfoms a simple check on the `error` argument, if the it succeed the corresponding handler is called otherwise nothing happens.

Note: Handlers can return a values.

```ts
import { isThis } from `./_generated/Errors.ts`;

...(error) => {
  isThis(error)
  .UserNotFoundError(() => ...)
  .NotAProphetError(() => ...)
  .handle()
}
```

React example:

```tsx
import { isThis } from `./_generated/Errors.ts`;

...(error) => {
  return <p style={{color: '#FF495C'}}>
    {
      isThis(error)
      .UserNotFoundError(() => <span>Could not find a user with tha name</span>)
      .NotAProphetError(() => <span>Only Prophets can perfom this kind of actions...</span>)
      .handle();
    }
  <p style={{color: '#FF495C'}}>
}
```

## TODO
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