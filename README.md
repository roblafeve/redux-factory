# Redux Factory

[![codecov](https://codecov.io/gh/roblafeve/redux-factory/branch/master/graph/badge.svg)](https://codecov.io/gh/roblafeve/redux-factory)
[![Build Status](https://travis-ci.org/roblafeve/redux-factory.svg?branch=master)](https://travis-ci.org/roblafeve/redux-factory)

Redux Factory is a functional approach to creating your Redux actions and reducers. Since it is curried, you can supply an initial state and define your actions, but omit the prefix argument that is required to finally generate your actionCreator and reducer functions. Doing this allows you to export a base configuration to be used in any number of distinct portions of your state tree.

Beyond this, Redux Factory provides a `compose` function that allows you to combine any number of un-prefixed factories in order to maximize flexibility and code reuse.

> Note: composeV is non-curried (compose isn't typically). Be sure to reference [ramda](http://ramdajs.com/0.21.0/index.html) or a comparable library to make sure there isn't a better fit out there for your particular use-case.

## Install

```
$ npm install --save redux-factory
```

## Usage

```js
const reduxFactory = require('redux-factory').default
// OR import reduxFactory from 'redux-factory'

```

## License

MIT © [Rob LaFeve](https://twitter.com/roblafeve)
