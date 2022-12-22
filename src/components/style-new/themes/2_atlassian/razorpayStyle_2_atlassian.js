/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import razorpayStyle_1_BitformDefault from '../1_bitformDefault/razorpayStyle_1_BitformDefault'

export default function razorpayStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      razorpayStyle_1_BitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
