/* eslint-disable camelcase */
export default function titleStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      'flex-direction': 'column',
      'align-items': 'flex-start',
      'background-image': '',
    },
    [`.${fk}-title`]: { margin: '0px' },
    [`.${fk}-sub-titl`]: { margin: '0px' },
    [`.${fk}-logo`]: {
      width: '50px',
      height: '50px',
    },
    [`.${fk}-title-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-title-suf-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-sub-titl-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-sub-titl-suf-i`]: {
      width: '20px',
      height: '20px',
    },
  }
}
