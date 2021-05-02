export const sortLayoutByXY = (layoutArr) => layoutArr.sort((first, second) => {
  const n = first.y - second.y
  if (n !== 0) {
    return n
  }
  return first.x - second.x
})
