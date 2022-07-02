/* eslint-disable camelcase */
export default function imageStyle_1_bitformDefault({ fk }) {
  return {
    [`.${fk}-fld-wrp`]:
      { height: '100%', width: '100%' },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      // width: '100%', // unused css
      // height: '100%', // unused css
      'background-color': 'hsla(0, 0%, 0%, 20%)',
    },
    [`.${fk}-img`]: {
      width: '100%',
      height: '100%',
    },
  }
}
