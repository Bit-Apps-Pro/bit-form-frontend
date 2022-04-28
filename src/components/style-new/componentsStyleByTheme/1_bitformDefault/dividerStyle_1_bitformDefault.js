/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      height: '100%',
      width: '100%',
      padding: '10px 0px',
      'align-items': 'center',
    },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'hsla(0, 0%, 0%, 20%)',
    },
    [`.${fk}-divider`]: {
      margin: '0px 10px 0px 10px',
      width: '100%',
      border: '',
      'border-bottom': 'var(--global-fld-bdr)',
      'border-width': '1',
      // 'border-color': 'hsla(0, 0%, 62%, 100%)',
    },
  }
}
