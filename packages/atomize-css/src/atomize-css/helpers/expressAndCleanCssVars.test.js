import { it, expect, describe } from 'vitest'
import expressAndCleanCssVariables from './expressAndCleanCssVars'

describe('test utils', () => {
  const cssVars = {
    '--white-h': 0,
    '--white-s': '100%',
    '--white-a': '100%  ',
    '--color': 'hsl( 200, 100%, 50% )',
    '--padding ': '5px 10px',
    '--margin': '5px  10px ',
    '--hsl-color-var': 'hsl( var(--white-h),  var(--white-s),  var(--white-l) )',
    '--white-l  ': '   100%  ',
    '--primary-color': 'var(--color)',
    '--border': ' 2px',
    '--border-right': 'var(--border, 4px)',
    '--btn-sh': '2px 2px 4px -2px hsla(0, 0%, 0%, 40%)',
    '--border-left': 'var(--bdr, 4px)',
  }

  const cleanCssVars = {
    '--white-h': '0',
    '--white-s': '100%',
    '--white-a': '100%',
    '--color': '#0af',
    '--padding': '5px 10px',
    '--margin': '5px 10px',
    '--hsl-color-var': '#fff',
    '--white-l': '100%',
    '--primary-color': '#0af',
    '--border': '2px',
    '--border-right': '2px',
    '--border-left': '4px',
    '--btn-sh': '2px 2px 4px -2px #0006',
  }

  it('express and clean css variaables', () => {
    expect(expressAndCleanCssVariables(cssVars)).toStrictEqual(cleanCssVars)
  })
})
