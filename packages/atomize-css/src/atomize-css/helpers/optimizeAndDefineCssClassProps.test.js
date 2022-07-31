import { describe, expect, it } from 'vitest'
import optimizeAndDefineCssClassProps from './optimizeAndDefineCssClassProps'

describe('optimize selectors and define css values', () => {
  it('should return a new optimized selector object', () => {
    const cssVars = {
      '--radius': '10px',
      ' --padding  ': '  2%',
      '--p-r': '5px',
      '--m': '',
      '--white-h': 0,
      '--white-s': '100%',
      '--white-l': '100%',
      '--white-a': '100%',
      '--sh': '2px 2px 4px -2px hsla(0, 0%, 0%, 40%)',
    }

    const invalidPropValue = { 'font-size': '' }

    const ignoreWithFallbackValues = {
      margin: '0',
      'flex-direction': 'row',
      'text-align': 'init',
    }

    const classes = {
      '.class ': {
        'flex-direction': 'var(--not-defined, row)',
        'text-align': 'init',
        color: 'red',
        'font-size': '',
        background: '  hsl(var(--white-h),  var(--white-s),  var(--white-l)) ',
        'padding  ': '0px 1px 0px 1px',
        margin: 'var(--sdf, 10px) 10px 10px 10px',
        border: 'var(--fld-wrp-bdr, medium none)',
        transform: 'translateX(10px)',
        content: '""',
        'box-shadow': '0px 1.2px 2.2px hsla(0, 0%, 0%, 3.2%),\n        0px 2.9px 5.3px hsla(0, 0%, 0%, 4.5%),\n        0px 5.4px 10px hsla(0, 0%, 0%, 5.4%),\n        0px 9.6px 17.9px hsla(0, 0%, 0%, 6.2%),\n        0px 18px 33.4px hsla(0, 0%, 0%, 7.3%),\n        0px 43px 80px hsla(0, 0%, 0%, 10%)',
      },
      'input[type="color" i][list]::-webkit-color-swatch': { background: 'red' },
      '.b65-14-opt-search-input::-webkit-search-decoration, .b65-14-opt-search-input::-webkit-search-cancel-button, .b65-14-opt-search-input::-webkit-search-results-button, .b65-14-opt-search-input::-webkit-search-results-decoration': { background: 'red' },
      '.asd[data  ]': {},
      'div  ~ .asd': { background: 'red', 'box-shadow': 'var(--sh)' },
      '.a, .b': {
        background: 'hsla(calc(var(--white-h) - 50%), calc(var(--white-s) - 50%), calc(var(--white-l) + 10), var(--white-a)) !important',
        // hsla(calc(0 - 50%),50%,calc(100% + 10),100%)!important
      },

    }

    const cleanClassAndValues = {
      '.class': {
        'text-align': 'init',
        color: 'red',
        background: '#fff',
        padding: '0 1px',
        margin: '10px',
        border: 'medium none',
        transform: 'translateX(10px)',
        content: '""',
        'box-shadow': '0px 1.2px 2.2px rgba(0,0,0,.032),0px 2.9px 5.3px rgba(0,0,0,.045),0px 5.4px 10px rgba(0,0,0,.054),0px 9.6px 17.9px rgba(0,0,0,.062),0px 18px 33.4px rgba(0,0,0,.073),0px 43px 80px #0000001a',
      },
      'input[type="color" i][list]::-webkit-color-swatch': { background: 'red' },
      '.b65-14-opt-search-input::-webkit-search-decoration': { background: 'red' },
      '.b65-14-opt-search-input::-webkit-search-cancel-button': { background: 'red' },
      '.b65-14-opt-search-input::-webkit-search-results-button': { background: 'red' },
      '.b65-14-opt-search-input::-webkit-search-results-decoration': { background: 'red' },
      'div~.asd': { background: 'red', 'box-shadow': '2px 2px 4px -2px #0006' },
      '.a': { background: 'hsla(calc(0 - 50%),50%,calc(100% + 10),100%)!important' },
      '.b': { background: 'hsla(calc(0 - 50%),50%,calc(100% + 10),100%)!important' },
    }

    expect(optimizeAndDefineCssClassProps(classes, cssVars, {
      ignoreWithFallbackValues,
      invalidPropValue,
    })).toStrictEqual(cleanClassAndValues)
  })
})
