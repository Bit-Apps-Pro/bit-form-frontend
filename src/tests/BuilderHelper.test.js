import { checkFieldsExtraAttr, convertLayout, delAllPrevKeys, getEmptyXPos, isRestYhasBlockX, sortLayoutByXY } from '../Utils/FormBuilderHelper'

describe('▶ check get Empty X Position form given arr', () => {
  const maxCol = 6
  const spaceNeed = 1
  const blocked = [0, 2, 2, 6]
  const blocked2 = [0, 2, 2, 4]
  const blocked3 = [0, 2, 4, 6]
  test('test 1', () => {
    expect(getEmptyXPos(maxCol, spaceNeed, blocked)).toBe(-1)
  })
  test('test 2', () => {
    expect(getEmptyXPos(maxCol, spaceNeed, blocked2)).toBe(4)
  })
  test('test 3', () => {
    expect(getEmptyXPos(maxCol, 2, blocked3)).toBe(2)
  })
  test('test 4', () => {
    expect(getEmptyXPos(maxCol, 6, [])).toBe(0)
  })
})

describe('▶ check rest of y has any x axis block by after given key', () => {
  const obj1 = { 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] }
  const obj2 = { 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] }
  const obj3 = { 1: [0, 6], 4: [1, 3], 5: [0, 6], 6: [3, 4] }
  test('test 1', () => {
    expect(isRestYhasBlockX(1, 1, obj1, 6)).toBe(true)
  })
  test('test 2', () => {
    expect(isRestYhasBlockX(2, 1, obj2, 6)).toBe(false)
  })
  test('test 3', () => {
    expect(isRestYhasBlockX(4, 1, obj3, 6)).toBe(true)
  })
})

describe('▶ delete all previous key of an object by specific key', () => {
  const obj1 = { 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] }
  const obj2 = { 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] }
  const obj3 = { 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] }
  test('test 1', () => {
    expect(delAllPrevKeys(obj1, 6)).toEqual({ 6: [3, 4] })
  })
  test('test 2', () => {
    expect(delAllPrevKeys(obj2, 5)).toEqual({ 5: [0, 1], 6: [3, 4] })
  })
  test('test 3', () => {
    expect(delAllPrevKeys(obj3, 1)).toEqual({ 1: [0, 6], 4: [1, 3], 5: [0, 1], 6: [3, 4] })
  })
})

describe('▶ check layout converted successfully by targeted col', () => {
  const layout = [
    { w: 2, h: 4, x: 0, y: 0, i: 'a' },
    { w: 3, h: 4, x: 2, y: 0, i: 'b' },
    { w: 4, h: 3, x: 0, y: 4, i: 'c' },
    { w: 2, h: 3, x: 4, y: 4, i: 'e' },
    { w: 4, h: 6, x: 0, y: 7, i: 'f' },
    { w: 1, h: 6, x: 4, y: 7, i: 'g' },
    { w: 2, h: 6, x: 0, y: 13, i: 'h' },
    { w: 3, h: 2, x: 2, y: 13, i: 'i' },
    { w: 2, h: 4, x: 2, y: 15, i: 'j' },
    { w: 6, h: 5, x: 0, y: 19, i: 'k' },
    { w: 1, h: 2, x: 0, y: 24, i: 'l' },
    { w: 2, h: 2, x: 1, y: 24, i: 'm' },
  ]

  const layout2 = [
    { w: 44, h: 2, x: 0, y: 0, i: '0' },
    { w: 29, h: 3, x: 44, y: 0, i: '1' },
    { w: 48, h: 4, x: 0, y: 3, i: '2' },
    { w: 71, h: 3, x: 0, y: 7, i: '3' },
    { w: 22, h: 3, x: 0, y: 10, i: '4' },
    { w: 57, h: 3, x: 22, y: 10, i: '5' },
    { w: 40, h: 3, x: 0, y: 13, i: '6' },
    { w: 20, h: 3, x: 40, y: 13, i: '7' },
    { w: 21, h: 3, x: 0, y: 16, i: '8' },
  ]

  test('test 1', () => {
    expect(convertLayout(layout, 6, 1)).toEqual(layout)
  })
  test('test 2', () => {
    expect(convertLayout(layout2, 80, 1)).toEqual(layout2)
  })
})

describe('▶ check layout sorting by xy', () => {
  const lay1 = [
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 4, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 3 },
    { x: 6, y: 3 },
    { x: 5, y: 2 },
  ]
  const expectLay1 = [
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 1, y: 1 },
    { x: 5, y: 2 },
    { x: 0, y: 3 },
    { x: 6, y: 3 },
  ]
  const lay2 = [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 5, y: 1 },
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 3, y: 2 },
    { x: 7, y: 1 },
    { x: 4, y: 0 },
    { x: 0, y: 3 },
    { x: 6, y: 3 },
  ]
  const expectLay2 = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
    { x: 6, y: 3 },
  ]

  test('test 1', () => {
    expect(sortLayoutByXY(lay1)).toEqual(expectLay1)
  })

  test('test 2', () => {
    expect(sortLayoutByXY(lay2)).toEqual(expectLay2)
  })
})

// eslint-disable-next-line no-underscore-dangle
const __ = str => str

describe('▶ check fields extra attribute in grid layout', () => {
  const bits1 = { isPro: 0 }
  const bits2 = { isPro: 1 }
  const field1 = { lbl: 'Select Country' }
  const field2 = { typ: 'razorpay' }
  const field3 = { typ: 'paypal' }
  const field4 = { typ: 'recaptcha' }
  const allFields = {
    'bf1-1': { typ: 'select', lbl: 'Select country' },
    'bf2-2': { typ: 'recaptcha' },
    'bf3-3': { typ: 'razorpay' },
  }
  const additional = { enabled: { reCaptchav3: 0 } }
  test('test 1', () => {
    expect(checkFieldsExtraAttr(field1, allFields, [], {}, bits1, __)).toStrictEqual({ msg: 'Country Field available in Pro version of Bit Form.', validType: 'pro' })
  })
  test('test 2', () => {
    expect(checkFieldsExtraAttr(field2, allFields, [], {}, bits2, __)).toStrictEqual({ msg: 'You cannot add more than one razorpay field in the same form.', validType: 'onlyOne' })
  })
  test('test 3', () => {
    expect(checkFieldsExtraAttr(field3, allFields, [], {}, bits2, __)).toStrictEqual({})
  })
  test('test 4', () => {
    expect(checkFieldsExtraAttr(field4, allFields, [], additional, bits2, __)).toStrictEqual({ msg: 'You cannot add more than one recaptcha field in the same form.', validType: 'onlyOne' })
  })
})
