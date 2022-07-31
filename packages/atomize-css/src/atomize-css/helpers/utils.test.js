import { describe, it, expect } from 'vitest'
import { expressAndCompressColors,
  isCssColor,
  expressCalcFunc,
  expressCssVar,
  isSameUnit,
  expressMultipleCalcFuncWithExt,
  matchByBracketPair,
  optimizeQuadValue,
  normalizeSelector,
  isValidPropAndValue } from './utils'

describe('test tiny functions', () => {
  it('will check is that same unit value or not', () => {
    expect(isSameUnit('10%', '10%')).toEqual(true)
    expect(isSameUnit(10, 10)).toEqual(true)
    expect(isSameUnit('10px ', '120px')).toEqual(true)
    expect(isSameUnit(' 2.55rem ', '1.25rem')).toEqual(true)
    expect(isSameUnit(' 2.55em ', '1.25rem')).toEqual(false)
    expect(isSameUnit(' 2.55em ', '1.25rem')).toEqual(false)
  })

  it('will deefine css calc() from css var ', () => {
    const cssVars = {
      '--radius': '10px',
      ' --padding  ': '  2%',
      '--p-r': '5px',
      '--m': '',
    }
    expect(expressCalcFunc('')).toEqual('0')
    expect(expressCalcFunc(undefined)).toEqual('0')
    expect(expressCalcFunc('calc(var(--padding) + 10%)', cssVars)).toEqual('12%')
    expect(expressCalcFunc('calc(5px + var(--p-r))', cssVars)).toEqual('10px')
    expect(expressCalcFunc('calc(5px + var(--m))', cssVars)).toEqual('5px')
    expect(expressCalcFunc('calc(10px + 10px)')).toEqual('20px')
    expect(expressCalcFunc('calc(10px/2px)')).toEqual('5px')
    expect(expressCalcFunc(' calc(1.225rem + 2.225rem)')).toEqual('3.45rem')
    expect(expressCalcFunc('calc(10% + 10px )')).toEqual('calc(10% + 10px)')
    expect(expressCalcFunc('calc(var(--radius) + 10%  )', cssVars)).toEqual('calc(10px + 10%)')
    expect(expressCalcFunc('calc(var(--radius)+10%)', cssVars)).toEqual('calc(10px + 10%)')
    expect(expressCalcFunc('  calc(  5%   +   var(--radius)  )', cssVars)).toEqual('calc(5% + 10px)')
    expect(expressCalcFunc('calc(5% +   var(--unknown, 10%)  )', cssVars)).toEqual('15%')
    expect(expressCalcFunc('calc(5% +   var(--unknown, 10)  )', cssVars)).toEqual('calc(5% + 10)')
  })

  it('should express a css calc func and keep prefix and suffix', () => {
    const cssVars = {
      '--radius': '10px',
      ' --padding  ': '  2%',
      '--p-r': '5px',
      '--m': '',
      '--gfbg-l': '50%',
    }

    expect(expressMultipleCalcFuncWithExt('0pc 1pc calc(10% + 10%)')).toBe('0pc 1pc 20%')
    expect(expressMultipleCalcFuncWithExt('0pc 1pc calc(10% + 10%) #fafafa')).toBe('0pc 1pc 20% #fafafa')
    expect(expressMultipleCalcFuncWithExt('0pc 1pc calc(10% + 10%) #fafafa')).toBe('0pc 1pc 20% #fafafa')
    expect(expressMultipleCalcFuncWithExt('0pc 1pc 2px calc(5% +   var(--unknown, 10)  ) #fafafa')).toBe('0pc 1pc 2px calc(5% + 10) #fafafa')
    expect(expressMultipleCalcFuncWithExt(' hsla(var(--gfbg-h), var(--gfbg-s), calc(var(--gfbg-l) + 10%), var(--gfbg-a)) !important', cssVars)).toBe('hsla(var(--gfbg-h), var(--gfbg-s), 60%, var(--gfbg-a)) !important')
    expect(expressMultipleCalcFuncWithExt('   hsla(  var(--gfbg-h),  var(--gfbg-s), calc(var(--gfbg-l) + 10%), var(--gfbg-a)) !important', cssVars)).toBe('hsla( var(--gfbg-h), var(--gfbg-s), 60%, var(--gfbg-a)) !important')
    expect(expressMultipleCalcFuncWithExt('solid hsla(0, 0%, 87%, calc(100% + 10%))', cssVars)).toBe('solid hsla(0, 0%, 87%, 110%)')
    expect(expressMultipleCalcFuncWithExt('solid hsla(0, 0%, 87%, calc(100% + var(--radius)))', cssVars)).toBe('solid hsla(0, 0%, 87%, calc(100% + 10px))')
  })

  it('express css hsl color', () => {
    const cssVars = {
      '--white-h': 0,
      '--white-s': '100%',
      '--white-l': '100%',
      '--white-a': '100%',
    }
    expect(expressAndCompressColors('  hsl(100,100%,100%)  ', {})).toEqual('#fff')
    expect(expressAndCompressColors('  rgb(100,100,100)  ')).toEqual('#646464')
    expect(expressAndCompressColors('hsl(100, 100%,  100%  )')).toEqual('#fff')
    expect(expressAndCompressColors('solid hsla(100, 100%,  100%, 50%  )')).toEqual('solid #ffffff80')
    expect(expressAndCompressColors('hsla(100, 100%,  100%, 50%  )')).toEqual('#ffffff80')
    expect(expressAndCompressColors('hsl(var(--white-h),  var(--white-s),  var(--white-l))', cssVars)).toEqual('#fff')
    expect(expressAndCompressColors('rgb(var(--white-h),  var(--white-h),  var(--white-h))', cssVars)).toEqual('#000')
    expect(expressAndCompressColors('hsla(var(--white-h),  var(--white-s),  var(--white-l), var(--white-a)  )', cssVars)).toEqual('#fff')
    expect(expressAndCompressColors('rgba(var(--white-h),  var(--white-h),  var(--white-h), var(--white-h)  )', cssVars)).toEqual('#0000')
    expect(expressAndCompressColors('hsla(var(--white-h),  var(--white-s),  var(--white-l), var(--red-a)  )', cssVars)).toEqual('')
    expect(expressAndCompressColors('hsla(var(--white-h), var(--white-s), calc(var(--white-l) + 10%), var(--white-a)) !important', cssVars)).toEqual('#fff!important')
    expect(expressAndCompressColors('hsla(var(--white-h), var(--white-s), calc(var(--white-l) + 10), var(--white-a)) !important', cssVars)).toEqual('hsla(0,100%,calc(100% + 10),100%)!important')
    expect(expressAndCompressColors('hsla(calc(var(--white-h) - 50%), var(--white-s), calc(var(--white-l) + 10), var(--white-a)) !important', cssVars)).toEqual('hsla(calc(0 - 50%),100%,calc(100% + 10),100%)!important')
    expect(expressAndCompressColors('hsla(calc(var(--white-h) - 50%), calc(var(--white-s) - 50%), calc(var(--white-l) + 10), var(--white-a)) !important', cssVars)).toEqual('hsla(calc(0 - 50%),50%,calc(100% + 10),100%)!important')
    expect(expressAndCompressColors('0 0   0 2px hsl( 10, 20%,  30%), 0 0 0 4px hsla(10, 10%, 20%, 50%)', {}, true)).toBe('0 0 0 2px #5c423d,0 0 0 4px #38302e80')
    expect(expressAndCompressColors('0 0 0 2px hsl(10, 20%, 30%), 0 0 0  4px hsl(10, 10%, 20%  ) ')).toBe('0 0 0 2px #5c423d,0 0 0 4px #38302e')
    expect(expressAndCompressColors('0 0 0 2px hsl(10, calc(10% + 10%), 30%), 0 0 0  4px hsl(10, calc(10% + 10px), 20%  ) ')).toBe('0 0 0 2px #5c423d,0 0 0 4px hsl(10,calc(10% + 10px),20%)')
    expect(expressAndCompressColors('0 0 0 2px hsl(10, calc(var(--white-h) + 10%), calc(5 + 5)), 0 0 0  4px hsl(10, calc(10% + 10px), 20%  ) ', cssVars)).toBe('0 0 0 2px hsl(10,calc(0 + 10%),10),0 0 0 4px hsl(10,calc(10% + 10px),20%)')
  })

  it('will check is that css supported color', () => {
    expect(isCssColor('')).toBe(false)
    expect(isCssColor('hsl(1,2,3)')).toBe(true)
    expect(isCssColor('rgb(1,2,3)')).toBe(true)
    expect(isCssColor('hsla(1,2,3,1)')).toBe(true)
    expect(isCssColor('rgba(1,2,3,1)')).toBe(true)
    expect(isCssColor('hwb(1,2,3)')).toBe(false)
    expect(isCssColor('lch(1,2,3)')).toBe(false)
  })

  it('will express a css variable', () => {
    const cssVars = {
      '--radius': '10px',
      ' --padding  ': '  2%',
      '--p-r': '5px',
      '--m': '',
      '--white-h': 10,
      '--white-s': '10%',
      '--white-l': '10%',
    }
    expect(expressCssVar('var(--radius)', cssVars)).toStrictEqual({ value: '10px', isFallbackValue: false })
    expect(expressCssVar('var(--padding)', cssVars)).toStrictEqual({ value: '2%', isFallbackValue: false })
    expect(expressCssVar(' var( --padding  )', cssVars)).toStrictEqual({ value: '2%', isFallbackValue: false })
    expect(expressCssVar('var(--m)', cssVars)).toStrictEqual({ value: '', isFallbackValue: false })
    expect(expressCssVar('var(--m, 10px)', cssVars)).toStrictEqual({ value: '10px', isFallbackValue: true })
    expect(expressCssVar('var(var(--p-r), 10px)', cssVars)).toStrictEqual({ value: '5px', isFallbackValue: false })
    expect(expressCssVar('var(var(--p-r))', cssVars)).toStrictEqual({ value: '5px', isFallbackValue: false })
    expect(expressCssVar(' var(  --m  , 10px  )', cssVars)).toStrictEqual({ value: '10px', isFallbackValue: true })
    expect(expressCssVar('var(--wwm, none  )', cssVars)).toStrictEqual({ value: 'none', isFallbackValue: true })
    expect(expressCssVar(' var(--unknown, 10%)', cssVars)).toStrictEqual({ value: '10%', isFallbackValue: true })
    expect(expressCssVar(' var(--unknown)', cssVars)).toStrictEqual({ value: '', isFallbackValue: false })
    expect(expressCssVar('hsl(var(--unknown),var(--white-s),var(--white-l))', cssVars, true)).toStrictEqual({ value: 'hsl(,10%,10%)', isFallbackValue: false })
    expect(expressCssVar('hsl(100,100%,100%)', cssVars)).toStrictEqual({ value: 'hsl(100,100%,100%)', isFallbackValue: false })
    expect(expressCssVar('2px 5px', cssVars)).toStrictEqual({ value: '2px 5px', isFallbackValue: false })
    expect(expressCssVar(' var(--unknown, 10%) !important', cssVars)).toStrictEqual({ value: '10%!important', isFallbackValue: true })
  })
})

describe('match string by bracket pair', () => {
  it('should match inside accurate bracket ending', () => {
    expect(matchByBracketPair('hsl(', 'sdf sdfas hsl(2,32,3)')).toEqual(['hsl(2,32,3)'])
    expect(matchByBracketPair('hsl(', 'sdf sdfas hsl(2,32,3) ')).toEqual(['hsl(2,32,3)'])
    expect(matchByBracketPair('hsla(', 'sdf sdfas hsl(2,32,3) ')).toEqual(null)
    expect(matchByBracketPair('hsl{', 'sdf sdfas hsl{2,32,3} hsl{32,34,4234} ')).toEqual(['hsl{2,32,3}', 'hsl{32,34,4234}'])
  })
})

describe('check quad value optimization', () => {
  it('should optimze quad valuese', () => {
    expect(optimizeQuadValue('0px')).toBe('0')
    expect(optimizeQuadValue('0px  2px   2px 4px  ')).toBe('0px 2px 2px 4px')
    expect(optimizeQuadValue('0px  2px   0px   ')).toBe('0 2px')
    expect(optimizeQuadValue('10px  2px   10px   ')).toBe('10px 2px')
    expect(optimizeQuadValue('10px  2px   10px   2px')).toBe('10px 2px')
    expect(optimizeQuadValue('1.256rem  1.256rem   1.256rem   1.256rem')).toBe('1.256rem')
    expect(optimizeQuadValue('0rem  0rem   0rem   0rem')).toBe('0')
    expect(optimizeQuadValue('0px  0px   0px   0px')).toBe('0')
    expect(optimizeQuadValue('10px  8px   10px   8px !important')).toBe('10px 8px!important')
  })
})

describe('check css slector normalization', () => {
  it('should give valid css selector with trimmed whiteSpace', () => {
    expect(normalizeSelector('  .asd ')).toBe('.asd')
    expect(normalizeSelector(' .asd[ data  ]')).toBe('.asd[data]')
    expect(normalizeSelector(' .asd[ data  = "add"]')).toBe('.asd[data="add"]')
    expect(normalizeSelector(' .asd   .add')).toBe('.asd .add')
    expect(normalizeSelector(' .asd  ~ .add')).toBe('.asd~.add')
    expect(normalizeSelector(' .asd  + .add')).toBe('.asd+.add')
    expect(normalizeSelector(' .asd  , .add')).toBe('.asd,.add')
    expect(normalizeSelector('.asd :: after')).toBe('.asd::after')
    expect(normalizeSelector(' .asd :focus')).toBe('.asd:focus')
    expect(normalizeSelector(' .asd: hover')).toBe('.asd:hover')
    expect(normalizeSelector(' .asd  :  hover')).toBe('.asd:hover')
    expect(normalizeSelector(' .asd  \n .asd')).toBe('.asd .asd')
    expect(normalizeSelector(' .asd  \n ,.asd')).toBe('.asd,.asd')
  })
})

describe('check is invalid property according to given invalid prop object', () => {
  it('should return boolean if property either valid or invalid', () => {
    const invalidPropObj = {
      display: '0',
      border: '',
    }
    expect(isValidPropAndValue('display', '0', invalidPropObj)).toBe(false)
    expect(isValidPropAndValue('border', '', invalidPropObj)).toBe(false)
    expect(isValidPropAndValue('border', 'none', invalidPropObj)).toBe(true)
    expect(isValidPropAndValue('display', 'block', invalidPropObj)).toBe(true)
  })
})
