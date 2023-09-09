import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import multiStepStyle_1_bitformDefault from '../1_bitformDefault/multiStepStyle_1_bitformDefaullt'

// eslint-disable-next-line camelcase
export default function multiStepStyle_0_noStyle({ formId, breakpoint = 'lg', direction, colorScheme = 'light' }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      multiStepStyle_1_bitformDefault({ formId, breakpoint, direction, colorScheme }),
    )
  }
  return {}
}
