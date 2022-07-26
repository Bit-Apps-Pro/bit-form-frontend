export default function deepCopy(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  const isArray = Array.isArray(target)
  const cloneTarget = isArray ? [] : {}

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  if (isArray) {
    forEach(target, (value, index) => {
      cloneTarget[index] = deepCopy(value, map)
    })
  } else {
    forEach(Object.keys(target), key => {
      cloneTarget[key] = deepCopy(target[key], map)
    })
  }
  return cloneTarget
}

function forEach(array, iteratee) {
  let index = -1
  const { length } = array
  // eslint-disable-next-line no-plusplus
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}