import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function advancedFileUp_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
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
      [`.${fk}-inp-wrp .filepond--root`]: { margin: '0px 0px 40px 0px !important' },

      /* the text color of the drop label */
      [`.${fk}-inp-wrp .filepond--drop-label`]: {
        'min-height': '40px !important',
        color: '#555',
        cursor: 'pointer',
      },

      /* underline color for "Browse" button */
      [`.${fk}-inp-wrp .filepond--label-action`]: { 'text-decoration-color': '#aaa' },

      /* use a hand cursor intead of arrow for the action buttons */
      [`.${fk}-inp-wrp .filepond--file-action-button`]: {
        cursor: 'pointer',
        'background-color': 'rgba(0, 0, 0, 0.5)',
        color: 'white',
      },

      /* the color of the focus ring */
      [`.${fk}-inp-wrp .filepond--file-action-button:hover`]: { 'box-shadow': '0 0 0 0.125em rgba(255, 255, 255, 0.9)' },
      [`.${fk}-inp-wrp .filepond--file-action-button:focus`]: { 'box-shadow': '0 0 0 0.125em rgba(255, 255, 255, 0.9)' },

      /* the background color of the filepond drop area */
      [`.${fk}-inp-wrp .filepond--panel-root`]: { 'background-color': '#eee' },

      /* the border radius of the file item */
      [`.${fk}-inp-wrp .filepond--item-panel`]: {
        'border-radius': '0.5em',
        'background-color': '#555',
      },

      /* error state color */
      [`.${fk}-inp-wrp [data-filepond-item-state*='error'] .filepond--item-panel`]: { 'background-color': 'red' },
      [`.${fk}-inp-wrp [data-filepond-item-state*='invalid'] .filepond--item-panel`]: { 'background-color': 'red' },

      /* complete state color */
      [`.${fk}-inp-wrp [data-filepond-item-state='processing-complete'] .filepond--item-panel`]: { 'background-color': 'green' },

      /* the background color of the drop circle */
      [`.${fk}-inp-wrp .filepond--drip-blob`]: { 'background-color': '#999' },

      /* the text color of the file status and info labels */
      [`.${fk}-inp-wrp .filepond--file`]: { color: 'white' },

    }
  }
  return {}
}
