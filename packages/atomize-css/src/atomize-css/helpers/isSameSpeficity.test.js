import { describe, it, expect } from 'vitest'
import isSameSpeficity from './isSameSpeficity'

describe('compare css speficity between 2 selector', () => {
  it('should return true or false is 2 selectors have same speficity', () => {
    expect(isSameSpeficity('.asd:hover', '.ddd:hover')).toBe(true)
    expect(isSameSpeficity('.class:hover', '.cls:hover')).toBe(true)
    expect(isSameSpeficity('.asd', '.ddd')).toBe(true)
    expect(isSameSpeficity('.asd::active', '.ddd::active')).toBe(true)
    expect(isSameSpeficity('.asd::before', '.ddd::active')).toBe(false)
    expect(isSameSpeficity('.asd[data-attr]', '.ddd[data-attr]')).toBe(true)
    expect(isSameSpeficity('.asd[data-attr]', '.ddd[data-attr]')).toBe(true)
    expect(isSameSpeficity('.asd [data-attr] .class', '.ddd [data-attr] .class')).toBe(true)
    expect(isSameSpeficity('.asd:checked~.class .class', '.ddd:checked~.class .class')).toBe(true)
    expect(isSameSpeficity('.asd:checked~.class .class', '.ddd:checked~.otherClass .otherClass')).toBe(false)
    expect(isSameSpeficity('.asd.class', '.ddd.class')).toBe(true)
    expect(isSameSpeficity('.asd.class', '.ddd.otherClass')).toBe(false)
    expect(isSameSpeficity('.asd .class', '.ddd .otherClass')).toBe(false)
    expect(isSameSpeficity('.asd .class', '.ddd .class')).toBe(true)
  })
})

// .class, .bclass
//
