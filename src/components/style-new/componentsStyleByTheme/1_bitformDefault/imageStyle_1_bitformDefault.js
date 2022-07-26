/* eslint-disable camelcase */
export default function imageStyle_1_bitformDefault({ fk }) {
  return {
    [`.${fk}-fld-wrp`]:
      { height: '100%', width: '100%' },
    [`.${fk}-img`]: {
      width: '100%',
      height: '100%',
    },
  }
}
