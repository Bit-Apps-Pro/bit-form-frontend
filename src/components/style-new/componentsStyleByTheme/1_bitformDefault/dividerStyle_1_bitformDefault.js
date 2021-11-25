/* eslint-disable camelcase */
export default function dividerStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      height: '100%',
      width: '100%',
      'align-items': 'center',
    },
    [`.${fk}-divider`]: {
      'border-bottom': '3px solid black',
      width: '100%',
      'border-width': 2,
      'border-style': 'ridge',
    },
  }
}
