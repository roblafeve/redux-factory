# composeV

[![codecov](https://codecov.io/gh/roblafeve/redux-factory/branch/master/graph/badge.svg)](https://codecov.io/gh/roblafeve/redux-factory)
[![Build Status](https://travis-ci.org/roblafeve/redux-factory.svg?branch=master)](https://travis-ci.org/roblafeve/redux-factory)

Composes variadic functions (_n_-ary). **composeV** handles unary functions the same as compose `((x) -> (x) -> (x)) -> (x)`, but can also handle miss-matched arities `((x, y), (x), (x, y, z), ...) -> (x, y, z, ...)`. Composed functions are nested in `parameters[0]` while the remaining arguments are passed to `parameters[1...]`. This can be useful when you need to compose functions while still being able to pass the same arguments into each successive function unchanged.

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
