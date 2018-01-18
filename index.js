
// Not all keys can use dot notation.
const dotNotationRE = /^[a-z_][a-z0-9_]*$/i

// Perform strict equality against undefined, by default.
const defaultCheck = (prop) => prop + ' === undefined'

module.exports =
function wrapDefaults(defaults, check = defaultCheck) {
  const setters = Object.keys(defaults).map(key => {
    const access = dotNotationRE.test(key) ? '.' + key : `['${key}']`
    const missing = check('props' + access, key)
    if (!missing) return ''
    return `\n  if (${missing}) props${access} = defaults${access}`
  }).join('')
  return new Function('defaults', `return function(props) {${setters}\n  return props\n}`)(defaults)
}
