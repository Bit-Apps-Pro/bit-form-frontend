import multiStepStyle_1_bitformDefault from '../1_bitformDefault/multiStepStyle_1_bitformDefaullt'

// eslint-disable-next-line camelcase
export default function multiStepeStyle_2_atlassian({ formId, breakpoint, direction, colorScheme }) {
  console.log('multiStepeStyle_2_atlassian', colorScheme, breakpoint)
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return multiStepStyle_1_bitformDefault({ formId, breakpoint, direction, colorScheme })
  }
  return {}
}
