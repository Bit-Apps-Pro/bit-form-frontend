/* eslint-disable camelcase */
export default function dividerStyle_3_atlassian({ fk }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'flex',
      height: '100%',
      // 'justify-content': 'center', // unused css
      // width: '100%', // unused css
      // padding: '10px 0px', // unused css
      'align-items': 'center',
    },
    [`.${fk}-divider`]: {
      margin: '0px 10px 0px 10px',
      width: '100%',
      // border: '',
      'border-bottom': 'var(--global-fld-bdr)',
      'border-width': '1px !important',
      // 'border-color': 'hsla(0, 0%, 62%, 100%)',
    },
  }
}
