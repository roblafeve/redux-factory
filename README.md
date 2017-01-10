# Redux Factory

[![codecov](https://codecov.io/gh/roblafeve/redux-factory/branch/master/graph/badge.svg)](https://codecov.io/gh/roblafeve/redux-factory)
[![Build Status](https://travis-ci.org/roblafeve/redux-factory.svg?branch=master)](https://travis-ci.org/roblafeve/redux-factory)

Composable, curried factory for creating Redux reducers and actions. Being curried, you can supply an initial state and define your actions, but omit the prefix argument that is required to finally generate your `actionCreator` and `reducer` functions. Doing this allows you to export a base configuration to be used in any number of distinct portions of your state tree.

Beyond this, Redux Factory provides a `compose` function that allows you to combine any number of un-prefixed factories in order to maximize flexibility and code reuse.

> Note: This library embraces some basic ideas from functional programing (curry, compose). While I believe these are powerful tools, this may not be your _'cup of tea'_ ☕. If not, you may consider using [redux-act](https://github.com/pauldijou/redux-act).

## Install

```
$ npm install --save redux-factory
```

## Usage

### Basic
```js
import factory from 'redux-factory'
import { merge } from 'ramda' // or bring your own object merge

const prefix = 'users' // `String` or `false`

const initialState = { // required by Redux
  list: [],
  activity: false,
  location: {}
}

const actions = {
  add: (state, payload) => merge(state, {list: [...state, payload]}),
  setActivity: (state, payload) => merge(state, {activity: payload}),
  'UPDATE_LOCATION': {
    transform: (state, payload) => merge(state, {location: payload}),
    prefix: false, // Action type will be 'as-is' regardless of prefix passed to factory
    meta: {} // Some middleware utilizes this
  }
}

export default factory(initialState, actions, prefix) // factory :: (Object, Object, String|False) -> Object
// The above code exports an object for use in your app:
// {
//   add: [Function],
//   setActivity: [Function],
//   UPDATE_LOCATION: [Function],
//   reducer: [Function]
// }
```
> Notes:
- The case of your prefix and action keys _DO_ matter (this is the main breaking change with `3.0.0`—as they were always normalized). This allows you to format your action keys as you see fit. Also, with the addition of the alternate action config syntax (see above) which allows you to set the prefix to `false` on a per-action basis, it is now possible to handle a third-party action in any piece of your state (e.g. users could handle `UPDATE_LOCATION` from `redux-simple-router`).
- Why the prefix? Namespace is all that distinguishes your action types. Unless your state is extremely simple they are very handy. Nevertheless, you may pass `false` as a third argument if you don't want it.

### Curried and composed
```js
import factory, { compose } from 'redux-factory'
import { merge } from 'ramda' // or bring your own object merge

const listInitialState = { // required by Redux
  list: [],
  activity: false
}

const listActions = {
  add: (state, payload) => merge(state, {list: [...state, payload]}),
  setActivity: (state, payload) => merge(state, {activity: payload})
}

const list = factory(listInitialState, listActions) // factory :: (Object, Object) -> Function

const prefix = 'dogs'

const dogsInitialState = {
  barking: false,
  pooping: false,
  running: false
}

const dogsActions = {
  barking: (x, y) => merge(x, { barking: y }),
  pooping: (x, y) => merge(x, { pooping: y }),
  running: (x, y) => merge(x, { running: y })
}

const dogs = factory(dogsInitialState, dogsActions) // factory :: (Object, Object) -> Function

export default compose(list, dogs, prefix) // compose :: (Function, ..., String) -> Object
// The above code exports an object for use in your app:
// {
//   add: [Function],
//   setActivity: [Function],
//   barking: [Function],
//   pooping: [Function],
//   running: [Function],
//   reducer: [Function]
// }
```
> Notes:
- Compose will take any number of unprefixed factory functions
- Compose itself is curried which means you can supply it with a complex set of factories for composition, then apply any number of prefixes later.
- Compose can take other unprefixed compositions along with additional unprefixed factories and combine them into a single object. The sky is the limit.

## API

### Factory
- Type Signature ([Guide to Type Signatures](https://github.com/ramda/ramda/wiki/Type-Signatures)):
```js
//  Factory :: InitialState → {k: Transform} → Prefix → {k: ActionCreator, reducer: Reducer}
//          :: InitialState → {k: Config} → Prefix → {k: ActionCreator, reducer: Reducer}
//          Action        = {type: String, payload: Payload, error: Bool, meta: a }
//          ActionCreator = Payload → Action
//          Config        = {transform: Transform, prefix: Bool, meta: a}
//          InitialState  = a
//          Payload       = a
//          Prefix        = String
//          Reducer       = (State, Action) → State
//          State         = a
//          Transform     = (State, Payload) → State
```
- Curried: `true` (all arguments may be partially applied)
- Parameters:
  - **initialState**: object required by redux
  - **actions**: object of action methods (e.g. `{ actionName: (state, payload) => Object.assign({}, state, {name: payload}) }`)
    - `state` current state
    - `payload` action payload
  - **prefix**: string used to create unique actions and reducers
- Returns `Object` with action method(s) and a reducer method to export and use in your app:

```js
{
  add: [Function],
  setActivity: [Function],
  barking: [Function],
  pooping: [Function],
  running: [Function],
  reducer: [Function]
}
```

### Compose
- Signature: `(Function: unprefixed Factory || unprefixed Compose, ..., String: prefix) -> Object`
- Curried: `true` (if a string prefix is not applied as final argument)
- Parameters:
  - **All but last**: unprefixed Factory or Compose functions
  - **Last**: prefix string used to create unique actions and reducers

## Tips
1. Use a helper to merge old and new state (e.g. Ramda's [merge](http://ramdajs.com/0.21.0/docs/#merge)). Originally, `redux-factory` automatically merged old/new state, but this proved unintuitive.

```js
import { merge } from 'ramda'
// Much better!
const actions = {
  myAction: (x, y) => merge(x, {name: y})
}
```

## License

MIT © [Rob LaFeve](https://twitter.com/roblafeve)
