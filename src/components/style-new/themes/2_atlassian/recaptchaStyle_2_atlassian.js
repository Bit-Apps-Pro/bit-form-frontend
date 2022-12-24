/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import recaptchaStyle_1_bitformDefault from '../1_bitformDefault/recaptchaStyle_1_bitformDefault'

export default function recaptchaStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      recaptchaStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
