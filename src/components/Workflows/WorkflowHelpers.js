/* eslint-disable import/prefer-default-export */
export const accessToNested = (obj, path = '') => {
  if (path === '') return obj
  const paths = path.split('.')
  const lastIndex = paths.length - 1
  const restPath = paths.slice(0, lastIndex)
  restPath.forEach(p => { obj = obj[p] })
  return paths.length ? obj[paths[lastIndex]] : obj
}
