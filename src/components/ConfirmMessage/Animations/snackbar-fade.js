export default function snackbarFade(position) {
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
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    activeMsgContainer: { opacity: 1 },
    deactiveMsgContainer: {
      opacity: 0,
      transition: 'opacity 0.4s, visibility 0s ease-out 0.4s',
    },
  }
}
