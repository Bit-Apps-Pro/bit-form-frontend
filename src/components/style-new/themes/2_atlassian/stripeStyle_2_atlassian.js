/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import stripeStyle_1_BitformDefault from '../1_bitformDefault/stripeStyle_1_BitformDefault'

/* eslint-disable camelcase */
export default function stripeStyle_2_atlassian({
  fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
}) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      stripeStyle_1_BitformDefault({
        fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
      }),
      {
        [`.${fk}-stripe-btn`]: {
          transition: '',
        },
        [`.${fk}-stripe-btn:active`]: {
          transform: '',
        },
      },
    )
  }
  return {}
}
