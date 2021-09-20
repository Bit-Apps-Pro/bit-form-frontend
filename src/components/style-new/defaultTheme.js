export default function defaultTheme(fk, type) {
  switch (type) {
    case 'text':
    case 'number':
    case 'password':
    case 'username':
    case 'email':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':
    case 'textarea':
      return {
        [`${fk}-fw`]: {
          background: 'Red',
          height: '100%',
          'text-align': 'start',
          width: '100%',
          padding: '10px',
        },
        [`${fk}-lbl`]: {
          display: 'block',
          overflow: 'hidden',
          margin: 0,
          'font-weight': 500,
          'font-size': '16px',
          color: 'rgba(42, 49, 99, 1)!important',
          'line-height': '1.4!important',
        },
        [`${fk}-iw`]: { position: 'relative' },
        [`${fk}-fld`]: {
          display: ' inline-block !important',
          direction: 'inherit !important',
          'max-width': '100% !important',
          'font-family': 'sans-serif',
          width: '100% !important',
          outline: 'none !important',
          'background-color': 'rgba(0, 0, 0, 0)!important',
          'border-color': 'rgba(199, 212, 221, 1)!important',
          'border-radius': '6px 6px 6px 6px!important',
          'border-style': 'solid!important',
          'border-width': '1px 1px 1px 1px!important',
          'font-size': '15px!important',
          color: 'rgba(0, 0, 0, 1)!important',
          padding: '10px 8px 10px 8px!important',
          'line-height': '1.4 !important',
          height: type === 'textarea' ? 'calc(100% - 30px)' : '40px',
          ...type === 'textarea' && { resize: 'vertical' },
        },
        [`${fk}-fld:focus`]: {
          'box-shadow': '0px 0px 0px 3px rgba(151, 203, 252, 0.38) !important',
          'border-color': 'rgba(29, 158, 249, 1)!important',
        },
        [`${fk}-fld:hover`]: { 'border-color': 'rgba(29, 158, 249, 1)!important' },
        [`${fk}-fld::placeholder`]: { color: 'rgba(213, 212, 221, 1)!important' },
      }
    case 'check':
    case 'radio':
      return {
        [`${fk}-fw`]: {
          height: '100%',
          'text-align': 'start',
          width: '100%',
          padding: '10px',
        },
        [`${fk}-lbl`]: {
          display: 'block',
          overflow: 'hidden',
          margin: 0,
          'font-weight': 500,
          'font-size': '16px',
          color: 'rgba(42, 49, 99, 1)!important',
          'line-height': '1.4!important',
        },
        // checkbox container
        [`${fk}-cc`]: {
          display: 'flex',
          'flex-wrap': 'wrap',
          'margin-top': '8px',
        },
        // checkbox wrapper
        [`${fk}-cw`]: { 'margin-right': '10px' },
        // checkbox label
        [`${fk}-cl`]: {
          cursor: 'pointer',
          display: 'flex',
          'align-items': 'center',
        },
        // checkbox input
        [`${fk}-ci`]: {
          position: 'absolute',
          opacity: '0!important',
        },
        [`${fk}-ci:checked ~ .${fk}-cl .${fk}-bx`]: {
          background: 'blue',
          'border-color': 'blue',
        },
        [`${fk}-ci:focus ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 3px rgb(185, 213, 255)' },
        [`${fk}-ci:active ~ .${fk}-cl .${fk}-bx`]: { transform: 'scale(0.9)' },
        [`${fk}-ci:disabled ~ .${fk}-cl`]: {
          opacity: 0.6,
          'pointer-events': 'none',
          cursor: 'not-allowed',
        },
        [`${fk}-ci:disabled ~ .${fk}-cl .${fk}-bx`]: {
          background: 'rgb(230, 230, 230)',
          'border-color': 'rgb(209, 209, 209)',
        },
        [`${fk}-cw:hover .box`]: { 'border-color': 'blue' },
        [`${fk}-bx`]: {
          position: 'relative',
          height: '20px',
          width: '20px',
          border: '2px solid gray',
          display: 'inline-flex',
          'margin-right': '10px',
          'aspect-ratio': '1 / 1',
          transition: 'all 0.2s',
        },
        [`${fk}-bx::before`]: {
          content: '""',
          position: 'absolute',
          left: '50%',
          height: 0,
          width: 0,
        },
        ...type === 'check' && {
          [`${fk}-ck`]: { 'border-radius': '5px' },
          [`${fk}-ck::before`]: {
            top: '40%',
            border: 'solid white',
            'border-width': 0,
            transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.59, 1.82)',
            filter: 'drop-shadow(1px 1px 1px gray)',
            transform: 'translate(-50%, -50%) rotate(45deg)',
          },
          [`${fk}-ci:checked ~ .${fk}-cl .${fk}-ck::before`]: {
            width: '3px',
            height: '8px',
            'border-width': '0 3px 3px 0',
          },
        },

        ...type === 'radio' && {
          [`${fk}-rdo`]: { 'border-radius': '50%' },
          [`${fk}-rdo::before`]: {
            'border-radius': '50%',
            transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.59, 1.82)',
            top: '50%',
            background: 'white',
            'box-shadow': '0 1px 3px 0px grey',
            transform: 'translate(-50%, -50%)',
          },
          [`${fk}-ci:checked ~ .${fk}-cl .${fk}-rdo::before`]: {
            width: '50%',
            height: '50%',
          },
        },

      }
    default:
      return {}
  }
}
