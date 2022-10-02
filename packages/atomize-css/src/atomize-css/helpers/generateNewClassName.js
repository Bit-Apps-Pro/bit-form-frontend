function asciiArr2Str(asciiArr) {
  return asciiArr.map((asciiCode) => String.fromCharCode(asciiCode)).join('')
}
function isAll122inArr(arr) {
  return arr.every((i) => i === 122)
}
function increasePreviousAsciiValueAndGetPos(asciiArr) {
  const arr = asciiArr
  let foundPosition = false
  for (let i = 0; i < arr.length; i += 1) {
    if (foundPosition) {
      arr[i] = 64
    }
    if (arr[i] < 122 && !foundPosition) {
      if (arr[i] === 90) {
        arr[i] = 97
      } else {
        arr[i] += 1
      }
      foundPosition = true
    }
  }
  return arr
}

export default function* generateCssClassName() {
  let c = 0
  let asciiArr = [65]
  let pointer = 0

  for (let i = 0; i < 53; i += 1) {
    c += 1

    yield asciiArr2Str(asciiArr)
    // console.log(i, asciiArr2Str(asciiArr), asciiArr);

    if (isAll122inArr(asciiArr)) {
      asciiArr = Array(asciiArr.length + 1).fill(65)
      asciiArr[asciiArr.length - 1] = 64
      pointer = asciiArr.length - 1
      i = 0
    }

    if (asciiArr[pointer] === 122) {
      asciiArr = increasePreviousAsciiValueAndGetPos(asciiArr)
      pointer = asciiArr.length - 1
      i = 0
    }
    asciiArr[pointer] += 1

    if (asciiArr[pointer] == 91) {
      asciiArr[pointer] = 97
    }

    if (c === 200) {
      return
    }
  }
}
