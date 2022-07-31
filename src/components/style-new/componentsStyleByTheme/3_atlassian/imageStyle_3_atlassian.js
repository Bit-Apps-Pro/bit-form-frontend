/* eslint-disable camelcase */
export default function imageStyle_3_atlassian({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      height: '100%',
      width: '100%',
    },

    [`.${fk}-img`]: {
      width: '100%',
      height: '100%',
    },
  }
}
