<p align="center"><img src="https://imgur.com/AuFdzQQ.png" width="100" /></p>
<h1 align="center">Apollo Prophecy</h1>

<div align="center">
👁📟👁
<br/><strong>You shall fail... successfully</strong>
</div>

<div align="center">
  Command tool to generate errors files for your Appolo Server and Client 
</div>

<div align="center">
  <!-- NPM version -->
  <a href="https://npmjs.org/package/apollo-prophecy">
    <img src="https://img.shields.io/npm/v/apollo-prophecy.svg"
      alt="NPM version" />
  </a>
  
  <!-- Build Status -->
  <a href="https://travis-ci.com/theGlenn/apollo-prophecy">
    <img src="https://travis-ci.com/theGlenn/apollo-prophecy.svg?branch=master"
      alt="Build Status" />
  </a>

  <!-- Coverage Status -->
  <a href="https://coveralls.io/github/theGlenn/apollo-prophecy?branch=master">
    <img src="https://coveralls.io/repos/github/theGlenn/apollo-prophecy/badge.svg?branch=master"
      alt="Coverage Status" />
  </a>

  <!-- License -->
  <a href="https://github.com/theGlenn/apollo-prophecy/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg"
      alt="License" />
  </a>

  <!-- Contribute -->
  <a href="https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github">
    <img src="https://img.shields.io/badge/contributions-friendly-b44ac1.svg"
      alt="Contribute" />
  </a>

  <!-- GitHub good first issue -->
  <a href="https://github.com/theGlenn/apollo-prophecy/labels/good%20first%20issue">
    <img src="https://img.shields.io/github/issues/theGlenn/apollo-prophecy/good%20first%20issue.svg"
      alt="GitHub good first issue" />
  </a>
</div>
<div align="center">
  <a href="https://twitter.com/intent/follow?screen_name=glennsonna">
    <img src="https://img.shields.io/twitter/follow/glennsonna.svg?style=social&logo=twitter" alt="follow on Twitter"></a>
</div>

## 📟 Features

* Generate **Server-side** **throwable** errors in your resolvers like `throw new NotAProphetError()`
* Expose **machine readable** graphql errors through your api documentation
* Generate **Client-side** Apollo errors **consumable** like `thisError(error).isNotAProphetError ?`

# 📋 Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
    * [Server Side](#server)
    * [Client Side](#client)
  * [Contributing](#contributing)
    * [TODO](#todo)
    * [Test and Miscellaneous](#run-tests)

## Installation

Install with npm:

```sh
npm install -g apollo-prophecy
```

Install with yarn:

```sh
yarn global add apollo-prophecy
```

## Usage

```
Usage: apollo-prophecy [command]

Commands:
  apollo-prophecy generate <json file> [--out]
  apollo-prophecy ask <graphql endpoint> [--type] [--out]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Display version number                                [boolean]
```

### Server
> ⚠️ This Project is *Only* compatible with Apollo-Server v2

#### `generate` command

Creates `Error.ts` from a `JSON` input file. Using `--out` param you can change the name and location.

```sh
apollo-prophecy generate errors.json
```

Input file entries should at least contains the keys `message` and `code`.

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
...
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
...
```

Now you can use it the following way `throw new UserNotFoundError()` in your resolvers.

`apollo-prophecy` also exposes a `definitions` object and a graphql type definition named `PropheticError` so that you can expose all your errors descriptions through a resolver, [see Client](###client).

```ts
...
export const definitions = [{
    "name": "AuthenticationRequiredError"
    "message": "You must be logged in to do this",
    "extensions": {
      "code": "AUTH_REQUIRED"
    }
  }, {
    "name": "UserNotFoundError"
    "message": "No user found",
    "extensions": {
      "code": "USER_NOT_FOUND"
    }
  }
}];

export const errorType = `
  type PropheticErrorExtensions {
    code: String
  }

  type PropheticError {
    message: String?
    extensions: PropheticErrorExtensions
  }
`;
...
```

### Client

#### `ask` command

Queries the `errors` field on the specified graphql endpoint and creates an `Errors.ts` file containing helpers with **check methods** ([see Helpers](#helpers)) for all the errors exposed through the server api documentation.

```sh
apollo-prophecy ask http://localhost:3000/graphql
```

#### Helpers

In order to easily handle erros with **Apollo-Client**, the generated `Errors.ts` exposes two helpers methods `thisError` and `isThis`, both methods takes one paramater of type `ApolloError` or `GraphQLError`.

##### `thisError()` function

`thisError` returns an object that has a **property** named after each errors.
You can perform a simple `boolean` check on the `error` argument by calling the approiate *key*.

```ts
import { thisError } from `./_generated/Errors.ts`;

...(error) => {
  if(thisError(error).isUserNotFoundError){
    // Do something
  } else if(thisError(error).isNotAProphetError){
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
  </p>
}
```

## Contributing 
[![Build status](https://travis-ci.com/theGlenn/apollo-prophecy.svg?branch=master&style=flat-square)](https://travis-ci.com/theGlenn/apollo-prophecy)

<div>
  <table >
    <tr><td>✊</td><td align="center">Grab an issue</td> <td>⏬</td></tr>
    <tr><td>🍴</td><td align="center">fork <strong>develop</strong></td> <td>⏬</td></tr>
    <tr><td>👨‍💻</td><td align="center">Code</td> <td>⏬</td></tr>
    <tr><td>🛠</td><td align="center">Test</td> <td>⏬</td></tr>
    <tr><td>📩</td><td align="center">Pull Request</td> <td>⏬</td></tr>
  </table>
  <p>💥💥💥</p>
</div>

### TODO

* See [#2][i2]: Add support for third-party errors libraries like [apollo-errors](https://github.com/thebigredgeek/apollo-errors) <a class="d-inline-block IssueLabel v-align-text-top labelstyle-7057ff linked-labelstyle-7057ff tooltipped tooltipped-s" style="background-color: #7057ff; color: #ffffff">good first issue</a>
* See [#12][i12]: Add `errors.json` file as ask command argument <a class="d-inline-block IssueLabel v-align-text-top labelstyle-7057ff linked-labelstyle-7057ff tooltipped tooltipped-s" style="background-color: #7057ff; color: #ffffff">good first issue</a>
* See [#16][i16]: Add language specific code generation [Java/Kotlin][i13]/[Swift][i14]/[Javascript][i15]
  * See [#13][i13]: Java/Kotlin  <a class="d-inline-block IssueLabel v-align-text-top labelstyle-7057ff linked-labelstyle-7057ff tooltipped tooltipped-s" style="background-color: #7057ff; color: #ffffff">good first issue</a>
  * See [#14][i14]: Swift <a class="d-inline-block IssueLabel v-align-text-top labelstyle-7057ff linked-labelstyle-7057ff tooltipped tooltipped-s" style="background-color: #7057ff; color: #ffffff">good first issue</a>
  * See [#15][i15]: Javascript <a class="d-inline-block IssueLabel v-align-text-top labelstyle-7057ff linked-labelstyle-7057ff tooltipped tooltipped-s" style="background-color: #7057ff; color: #ffffff">good first issue</a>


[i2]: https://github.com/theGlenn/apollo-prophecy/issues/2
[i12]: https://github.com/theGlenn/apollo-prophecy/issues/12

[i13]: https://github.com/theGlenn/apollo-prophecy/issues/13
[i14]: https://github.com/theGlenn/apollo-prophecy/issues/14
[i15]: https://github.com/theGlenn/apollo-prophecy/issues/15

[i16]: https://github.com/theGlenn/apollo-prophecy/issues/16

### Run tests

```sh
npm test
```

```sh
yarn test
```