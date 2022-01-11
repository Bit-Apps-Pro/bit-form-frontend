export default function modalSlide(position, slideType) {
  return {
    msgContent: {
      opacity: 0,
      ...position === 'top-center' && {
        position: 'absolute',
        ...slideType === 'down' && {
          top: '-15%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12), opacity 0.3s',
        },
      },
      ...position === 'center-center' && {
        ...slideType === 'down' && { transform: 'translateY(-200%)' },
        ...slideType === 'up' && { transform: 'translateY(200%)' },
        transition: 'transform 0.3s cubic-bezier(0, 0.93, 1, 1.12), opacity 0.3s',
      },
      ...position === 'bottom-center' && {
        position: 'absolute',
        ...slideType === 'up' && {
          bottom: '-15%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12), opacity 0.3s',
        },
      },
    },
    activeMsgContent: {
      opacity: 1,
      ...position === 'top-center' && slideType === 'down' && { top: '5%' },
      ...position === 'bottom-center' && slideType === 'up' && { bottom: '5%' },
      ...position === 'center-center' && { transform: 'translateY(0%)' },
    },
    deactiveMsgContent: {
      opacity: 0,
      ...position === 'top-center' && slideType === 'down' && {
        top: '-15%',
        transition: 'top 150ms ease-out, opacity 150ms',
      },
      ...position === 'bottom-center' && slideType === 'up' && {
        bottom: '-15%',
        transition: 'bottom 150ms ease-out, opacity 150ms',
      },
      ...position === 'center-center' && {
        ...slideType === 'down' && { transform: 'translateY(-200%)' },
        ...slideType === 'up' && { transform: 'translateY(200%)' },
        transition: 'transform 150ms ease-out, opacity 150ms',
      },
    },
  }
}
