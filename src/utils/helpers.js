export function curry() {
  const keys = Object.keys(arguments);
  keys.sort();
  const funcs = keys.map(key => arguments[key]);
  return (initial) => {
    if (funcs.length === 0) return initial;

    return funcs.reduce((acc, func) => func(acc), initial);
  };
}
