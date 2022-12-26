/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import buttonStyle_1_bitformDefault from '../1_bitformDefault/buttonStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function buttonStyle_2_atlassian({
  fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
}) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      buttonStyle_1_bitformDefault({
        fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
      }),
      {},
    )
  }
  return {}
}
