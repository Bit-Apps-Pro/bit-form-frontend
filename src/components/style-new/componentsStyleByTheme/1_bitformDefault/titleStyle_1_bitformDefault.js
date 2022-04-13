/* eslint-disable camelcase */
export default function titleStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      'flex-direction': 'row',
      'align-items': 'center',
    },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      'background-color': 'hsla(0, 0%, 0%, 20%)',
    },
    [`.${fk}-titl-wrp`]: { padding: '0px 5px' },
    [`.${fk}-title`]: {
      margin: '5px',
      'text-align': 'center',
      'word-break': 'break-all',
      display: 'flex',
      'align-items': 'center',
    },
    [`.${fk}-sub-titl`]: {
      margin: '5px',
      'text-align': 'center',
      'word-break': 'break-all',
      display: 'flex',
      'align-items': 'center',
    },
    [`.${fk}-logo`]: {
      margin: '5px',
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
