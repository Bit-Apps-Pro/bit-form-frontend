/* eslint-disable camelcase */
export default function titleStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-wrp`]: {
      display: 'flex',
      'justify-content': 'center',
      'flex-direction': 'column',
      'align-items': 'flex-start',
      'background-image': '',
    },
    [`.${fk}-main`]: { },
    [`.${fk}-title`]: { 'margin-top': 0, 'margin-bottom': '3px' },
  }
}
