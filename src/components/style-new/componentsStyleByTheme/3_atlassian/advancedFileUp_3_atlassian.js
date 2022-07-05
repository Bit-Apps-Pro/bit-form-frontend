import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function advancedFileUp_3_atlassian({ fk }) {
  return {
    ...inputWrapperClasses(fk),
    [`.filepond-${fk}-container.readonly`]: {
      opacity: '.7',
      cursor: 'not-allowed',
      'pointer-events': 'none',
    },
    [`.filepond-${fk}-container.disabled`]: {
      opacity: '.5',
      cursor: 'not-allowed',
      'pointer-events': 'none',
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
    [`.${fk}-fld-wrp [data-filepond-item-state*='error'] .filepond--item-panel`]: { 'background-color': 'red' },
    [`.${fk}-fld-wrp [data-filepond-item-state*='invalid'] .filepond--item-panel`]: { 'background-color': 'red' },

    /* complete state color */
    [`.${fk}-fld-wrp [data-filepond-item-state='processing-complete'] .filepond--item-panel`]: { 'background-color': 'green' },

    /* the background color of the drop circle */
    [`.${fk}-fld-wrp .filepond--drip-blob`]: { 'background-color': '#999' },

    /* the text color of the file status and info labels */
    [`.${fk}-fld-wrp .filepond--file`]: { color: 'white' },

  }
}