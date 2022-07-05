/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      height: '100%',
      // 'justify-content': 'center', // unused css
      // width: '100%', // unused css
      // padding: '10px 0px', // unused css
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
      // border: '',
      'border-bottom': 'var(--global-fld-bdr)',
      'border-color': 'var(--global-fld-bdr-clr)',
      'border-width': '1px !important',
      // 'border-color': 'hsla(0, 0%, 62%, 100%)',
    },
  }
}
