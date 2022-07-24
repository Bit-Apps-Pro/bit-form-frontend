import { expect, describe, it } from 'vitest'
import combineSelectors from './combineSelectors'

describe('test combine same type of selector by comma', () => {
  it('should combine all same type of selector', () => {
    const Classes = {
      '.cn.readonly': {
        cursor: 'not-allowed',
        color: 'red',
        'background-color': '#f0f0f04d!important',
        'border-color': '#7575754d!important',
      },
      '.co:disabled': {
        'pointer-events': 'none',
        color: 'blue',
        'background-color': '#f0f0f04d!important',
        'border-color': '#7575754d!important',
      },
    }

    const expectedObj = {
      '.cn.readonly': {
        cursor: 'not-allowed',
        color: 'red',
      },
      '.cn.readonly,.co:disabled': {
        'background-color': '#f0f0f04d!important',
        'border-color': '#7575754d!important',
      },
      '.co:disabled': {
        'pointer-events': 'none',
        color: 'blue',
      },
    }

    expect(combineSelectors(Classes)).toStrictEqual(expectedObj)
  })
})
