export default function snackbarScale(position) {
  return {
    msgContainer: {
      ...position === 'top-left' && {
        left: '30px',
        top: '30px',
      },
      ...position === 'top-center' && {
        left: '50%',
        'margin-left': '-200px',
        top: '30px',
      },
      ...position === 'top-right' && {
        right: '30px',
        top: '30px',
      },
      ...position === 'bottom-left' && {
        left: '30px',
        bottom: '30px',
      },
      ...position === 'bottom-center' && {
        left: '50%',
        'margin-left': '-200px',
        bottom: '30px',
      },
      ...position === 'bottom-right' && {
        right: '30px',
        bottom: '30px',
      },
      transform: 'scale(0)',
      transition: 'transform 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
    },
    activeMsgContainer: { transform: 'scale(1)' },
    deactiveMsgContainer: {
      transform: 'scale(0)',
      transition: 'transform 150ms cubic-bezier(0.01, -0.01, 1, -0.42), visibility 0s ease-out 0.4s, opacity 0.4s',
    },
  }
}
