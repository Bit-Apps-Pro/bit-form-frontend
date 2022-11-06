function strToAsciiArr(str) {
  return str
    .trim()
    .split('')
    .map((char) => char.charCodeAt())
}

function asciiArr2Str(asciiArr) {
  return asciiArr.map((asciiCode) => String.fromCharCode(asciiCode)).join('')
}

function isAll122inArr(arr) {
  return arr.every((i) => i === 122)
}

function increasePreviousAsciiValue(asciiArr) {
  const arr = asciiArr
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] < 122) {
      if (arr[i] === 90) {
        arr[i] = 97
        arr[arr.length - 1] = 65
        return arr
      }
      arr[i] += 1
      arr[arr.length - 1] = 65
      return arr
    }
  }
}

export default function* generateCssClassName({ start = 'A', prefix = '', suffix = '' } = {}) {
  let asciiArr = strToAsciiArr(start)

  while (true) {
    yield `${prefix}${asciiArr2Str(asciiArr)}${suffix}`

    const arrLastIndex = asciiArr.length - 1

    if (isAll122inArr(asciiArr)) {
      asciiArr = Array(asciiArr.length + 1).fill(65)
      continue
    }

    if (asciiArr.at(-1) === 122) {
      asciiArr = increasePreviousAsciiValue(asciiArr)
      continue
    }

    asciiArr[arrLastIndex] += 1
    if (asciiArr[arrLastIndex] === 91) {
      asciiArr[arrLastIndex] = 97
    }
  }
}

// const classGen = generateCssClassName();

// console.clear();
// // generateCssClassName();

// for (let i = 0; i < 300; i++) {
//   const v = classGen.next().value;
//   // if (i > limit) {
//   console.log(v);
//   // }
// }

// // console.clear();
// // console.log(increasePreviousAsciiValue([66,122]))
