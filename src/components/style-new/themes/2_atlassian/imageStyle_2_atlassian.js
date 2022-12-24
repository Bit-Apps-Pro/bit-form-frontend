/* eslint-disable camelcase */
export default function imageStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]:
        { height: '100%', width: '100%' },
      [`.${fk}-img`]: {
        width: '100%',
        height: '100% !important',
      },
    }
  }
  return {}
}
