/* eslint-disable camelcase */
export default function advancedFileUp_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'var(--fld-wrp-dis, block)',
      'flex-direction': 'var(--fld-wrp-fdir, row)',
      'background-color': 'var(--fld-wrp-bg, transparent)',
      width: '100%',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
      'box-shadow': 'var(--fld-wrp-sh, none)',
      'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
      border: 'var(--fld-wrp-bdr, medium none)',
      'border-width': 'var(--fld-wrp-bdr-width, 0)',
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
    [`.${fk}-lbl-wrp`]: {
      width: 'var(--lbl-wrp-width, auto)',
      'align-self': 'var(--lbl-wrp-sa, auto)',
      margin: 'var(--lbl-wrp-m, 0)',
      padding: 'var(--lbl-wrp-p, 0)',
      'background-color': 'var(--lbl-wrp-bg, none)',
    },
    [`.${fk}-lbl`]: {
      'background-color': 'var(--fld-lbl-bg, none)',
      color: 'var(--fld-lbl-c, inherit)',
      'font-size': 'var(--fld-lbl-fs)',
      display: 'flex',
      'align-items': 'center',
      'text-align': 'var(--lbl-al, initial)',
      margin: 'var(--fld-lbl-m, 0)',
      padding: 'var(--fld-lbl-p, 0)',
      'box-shadow': 'var(--fld-lbl-sh, none)',
      'border-radius': 'var(--fld-lbl-bdr-rad, 0)',
      border: 'var(--fld-lbl-bdr, medium none)',
      'border-width': 'var(--fld-lbl-bdr-width, 0)',
      width: '100%',
      'font-weight': 'var(--lbl-font-w)',
      'font-style': 'var(--lbl-font-style)',
    },
    [`.${fk}-lbl-pre-i`]: {
      width: 'var(--lbl-pre-i-w)',
      height: 'var(--lbl-pre-i-h)',
      margin: 'var(--lbl-pre-i-m)',
      padding: 'var(--lbl-pre-i-p)',
      'box-shadow': 'var(--lbl-pre-i-sh, none)',
      border: 'var(--lbl-pre-i-bdr, medium none)',
      'border-width': 'var(--lbl-pre-i-bdr-width, 0)',
      'border-radius': 'var(--lbl-pre-i-bdr-rad, 0)',
      filter: 'var(--lbl-pre-i-fltr)',
    },
    [`.${fk}-lbl-suf-i`]: {
      width: 'var(--lbl-suf-i-w)',
      height: 'var(--lbl-suf-i-h)',
      margin: 'var(--lbl-suf-i-m)',
      padding: 'var(--lbl-suf-i-p)',
      'box-shadow': 'var(--lbl-suf-i-sh, none)',
      border: 'var(--lbl-suf-i-bdr, medium none)',
      'border-width': 'var(--lbl-suf-i-bdr-width, 0)',
      'border-radius': 'var(--lbl-suf-i-bdr-rad, 0)',
      filter: 'var(--lbl-suf-i-fltr)',
    },
    [`.${fk}-err-msg`]: {
      'background-color': 'var(--err-bg, none)',
      color: 'var(--err-c, inherit)',
      'font-size': 'var(--err-txt-fs)',
      display: 'flex',
      'align-items': 'center',
      'text-align': 'var(--err-txt-al, init)',
      padding: 'var(--err-p, 0)',
      margin: 'var(--err-m, 0)',
      'box-shadow': 'var(--err-sh, none)',
      'border-radius': 'var(--err-bdr-rad, 0)',
      border: 'var(--err-bdr, medium none)',
      'border-width': 'var(--err-bdr-width, 0)',
      'font-weight': 'var(--err-txt-font-w)',
      'font-style': 'var(--err-txt-font-style)',
    },
    [`.${fk}-err-txt-pre-i`]: {
      width: 'var(--err-txt-pre-i-w)',
      height: 'var(--err-txt-pre-i-h)',
      margin: 'var(--err-txt-pre-i-m)',
      padding: 'var(--err-txt-pre-i-p)',
      'box-shadow': 'var(--err-txt-pre-i-sh, none)',
      border: 'var(--err-txt-pre-i-bdr, medium none)',
      'border-width': 'var(--err-txt-pre-i-bdr-width, 0)',
      'border-radius': 'var(--err-txt-pre-i-bdr-rad, 0)',
      filter: 'var(--err-txt-pre-i-fltr)',
    },
    [`.${fk}-err-txt-suf-i`]: {
      width: 'var(--err-txt-suf-i-w)',
      height: 'var(--err-txt-suf-i-h)',
      margin: 'var(--err-txt-suf-i-m)',
      padding: 'var(--err-txt-suf-i-p)',
      'box-shadow': 'var(--err-txt-suf-i-sh, none)',
      border: 'var(--err-txt-suf-i-bdr, medium none)',
      'border-width': 'var(--err-txt-suf-i-bdr-width, 0)',
      'border-radius': 'var(--err-txt-suf-i-bdr-rad, 0)',
      filter: 'var(--err-txt-suf-i-fltr)',
    },
    [`.${fk}-inp-fld-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },

    /* filepond-root */
    [`.${fk}-fld-wrp .filepond--root`]: { margin: '0px 0px 40px 0px !important' },

    /* the text color of the drop label */
    [`.${fk}-fld-wrp .filepond--drop-label`]: {
      'min-height': '40px !important',
      color: '#555',
      cursor: 'pointer',
    },

    /* underline color for "Browse" button */
    [`.${fk}-fld-wrp .filepond--label-action`]: { 'text-decoration-color': '#aaa' },

    /* use a hand cursor intead of arrow for the action buttons */
    [`.${fk}-fld-wrp .filepond--file-action-button`]: {
      cursor: 'pointer',
      'background-color': 'rgba(0, 0, 0, 0.5)',
      color: 'white',
    },

    /* the color of the focus ring */
    [`.${fk}-fld-wrp .filepond--file-action-button:hover`]: { 'box-shadow': '0 0 0 0.125em rgba(255, 255, 255, 0.9)' },
    [`.${fk}-fld-wrp .filepond--file-action-button:focus`]: { 'box-shadow': '0 0 0 0.125em rgba(255, 255, 255, 0.9)' },

    /* the background color of the filepond drop area */
    [`.${fk}-fld-wrp .filepond--panel-root`]: { 'background-color': '#eee' },

    /* the border radius of the file item */
    [`.${fk}-fld-wrp .filepond--item-panel`]: {
      'border-radius': '0.5em',
      'background-color': '#555',
    },

    /* error state color */
    [`.${fk}-fld-wrp  [data-filepond-item-state*='error'] .filepond--item-panel`]: { 'background-color': 'red' },
    [`.${fk}-fld-wrp  [data-filepond-item-state*='invalid'] .filepond--item-panel`]: { 'background-color': 'red' },

    /* complete state color */
    [`.${fk}-fld-wrp  [data-filepond-item-state='processing-complete'] .filepond--item-panel`]: { 'background-color': 'green' },

    /* the background color of the drop circle */
    [`.${fk}-fld-wrp .filepond--drip-blob`]: { 'background-color': '#999' },

    /* the text color of the file status and info labels */
    [`.${fk}-fld-wrp .filepond--file`]: { color: 'white' },

  }
}
