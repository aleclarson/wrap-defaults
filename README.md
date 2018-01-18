
# wrap-defaults v0.0.1

Generate a function that checks an object for missing properties and fills it
with the given default values. The generated function returns the filled object.

Here are some performance comparisons:
- +1000x faster than object spreads in Chrome
- +1000x faster than `Object.assign` in Chrome
- +150x faster than `for...in` loop in Chrome

Check out the [jsperf](https://jsperf.com/3vv4lk4688/1) to run the tests yourself.

```js
const wrapDefaults = require('wrap-defaults')

const defaults = wrapDefaults({
  a: 1,
  b: 2,
  c: 3,
  d: 4,
})

defaults({
  a: 2,
  d: undefined,
  e: 3,
}) 
// => {a: 2, b: 2, c: 3, d: 4, e: 3}
```

The `defaults` function above is identical to:
```js
var defaults = {}
function(props) {
  if (props.a === undefined) props.a = defaults.a
  if (props.b === undefined) props.b = defaults.b
  if (props.c === undefined) props.c = defaults.c
  if (props.d === undefined) props.d = defaults.d
}
```

You can achieve huge performance gains when applying default values
in that way. You should avoid using `wrapDefaults` if it's not much
of a hassle to do the inlining on your own.

### Custom checks

Provide a function as the 2nd argument for custom value checking.

```js
// Use the default value if property equals null or undefined.
let defaults = wrapDefaults({}, (prop) => prop + ' == null')

// Perform different checks based on property key.
defaults = wrapDefaults({}, (prop, key) => {
  // Avoid checking internal properties.
  if (key[0] == '_') return false
  return `typeof ${prop} == 'undefined'`
})
```
