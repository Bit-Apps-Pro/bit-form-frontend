/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      height: '100%',
      width: '100%',
      padding: '20px 0px',
      'align-items': 'center',
    },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'rgba(0, 0, 0, 0.2)',
    },
    [`.${fk}-divider`]: {
      margin: '0px 10px 0px 10px',
      width: '100%',
      border: '',
      'border-bottom': 'solid',
      'border-width': '1',
      'border-color': 'var(--global-accent-color)',
    },
  }
}
