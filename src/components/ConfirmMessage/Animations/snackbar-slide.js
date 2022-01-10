export default function snackbarSlide(position, slideType) {
  return {
    msgContainer: {
      opacity: 1,
      ...position === 'top-center' && {
        ...slideType === 'up' && {
          left: '50%',
          transform: 'translateX(-50%)',
          top: '100%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          left: '50%',
          transform: 'translateX(-50%)',
          top: '-15%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          right: '100%',
          top: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'right' && {
          left: '100%',
          top: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
      },
      ...position === 'top-left' && {
        ...slideType === 'up' && {
          left: '30px',
          top: '100%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          left: '30px',
          top: '-15%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          left: '0px',
          transform: 'translateX(-100%)',
          top: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
        ...slideType === 'right' && {
          left: '100%',
          top: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
      },
      ...position === 'top-right' && {
        ...slideType === 'up' && {
          right: '30px',
          top: '100%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          right: '30px',
          top: '-15%',
          transition: 'top 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          right: '100%',
          transform: 'translateX(-100%)',
          top: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
        ...slideType === 'right' && {
          right: '0px',
          transform: 'translateX(100%)',
          top: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
      },
      ...position === 'bottom-center' && {
        ...slideType === 'up' && {
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-15%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          right: '100%',
          bottom: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'right' && {
          left: '100%',
          bottom: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
      },
      ...position === 'bottom-left' && {
        ...slideType === 'up' && {
          left: '30px',
          bottom: '-15%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          left: '30px',
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          left: '0px',
          transform: 'translateX(-100%)',
          bottom: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
        ...slideType === 'right' && {
          left: '100%',
          bottom: '5%',
          transition: 'left 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
      },
      ...position === 'bottom-right' && {
        ...slideType === 'up' && {
          right: '30px',
          bottom: '-15%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'down' && {
          right: '30px',
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
        },
        ...slideType === 'left' && {
          right: '100%',
          transform: 'translateX(-100%)',
          bottom: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
        ...slideType === 'right' && {
          right: '0px',
          transform: 'translateX(100%)',
          bottom: '5%',
          transition: 'right 0.3s cubic-bezier(0, 0.93, 1, 1.12), transform 0.3s',
        },
      },
    },
    activeMsgContainer: {
      opacity: 1,
      ...position === 'top-center' && {
        ...slideType === 'up' && { top: '5%' },
        ...slideType === 'down' && { top: '5%' },
        ...slideType === 'left' && { right: '50%', transform: 'translateX(50%)' },
        ...slideType === 'right' && { left: '50%', transform: 'translateX(-50%)' },
      },
      ...position === 'top-left' && {
        ...slideType === 'up' && { top: '5%' },
        ...slideType === 'down' && { top: '5%' },
        ...slideType === 'left' && { left: '30px', transform: 'translateX(0%)' },
        ...slideType === 'right' && { left: '30px' },
      },
      ...position === 'top-right' && {
        ...slideType === 'up' && { top: '5%' },
        ...slideType === 'down' && { top: '5%' },
        ...slideType === 'left' && { right: '30px', transform: 'translateX(0%)' },
        ...slideType === 'right' && { right: '30px', transform: 'translateX(0%)' },
      },
      ...position === 'bottom-center' && {
        ...slideType === 'up' && { bottom: '5%' },
        ...slideType === 'down' && { bottom: '5%' },
        ...slideType === 'left' && { right: '50%', transform: 'translateX(50%)' },
        ...slideType === 'right' && { left: '50%', transform: 'translateX(-50%)' },
      },
      ...position === 'bottom-left' && {
        ...slideType === 'up' && { bottom: '5%' },
        ...slideType === 'down' && { bottom: '5%' },
        ...slideType === 'left' && { left: '30px', transform: 'translateX(0%)' },
        ...slideType === 'right' && { left: '30px' },
      },
      ...position === 'bottom-right' && {
        ...slideType === 'up' && { bottom: '5%' },
        ...slideType === 'down' && { bottom: '5%' },
        ...slideType === 'left' && { right: '30px', transform: 'translateX(0%)' },
        ...slideType === 'right' && { right: '30px', transform: 'translateX(0%)' },
      },

    },
    deactiveMsgContainer: {
      opacity: 1,
      visibility: 'hidden',
      ...position === 'top-center' && {
        ...slideType === 'down' && {
          top: '-15%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'up' && {
          top: '100%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          right: '100%',
          transition: 'right 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          left: '100%',
          transition: 'left 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
      },

      ...position === 'top-left' && {
        ...slideType === 'up' && {
          top: '100%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'down' && {
          top: '-15%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          left: '0px',
          transform: 'translateX(-100%)',
          transition: 'left 150ms ease-out, opacity 150ms, transform 0.3s, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          left: '100%',
          transition: 'left 150ms ease-out, opacity 150ms, transform 0.3s, visibility 0s ease-out 0.4s',
        },
      },

      ...position === 'top-right' && {
        ...slideType === 'up' && {
          top: '100%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'down' && {
          top: '-15%',
          transition: 'top 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          right: '100%',
          transform: 'translateX(-100%)',
          transition: 'right 150ms ease-out, transform 200ms, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          right: '0px',
          transform: 'translateX(100%)',
          transition: 'left 150ms ease-out, transform 200ms, opacity 150ms, visibility 0s ease-out 0.4s',
        },
      },

      ...position === 'bottom-center' && {
        ...slideType === 'up' && {
          bottom: '-15%',
          transition: 'bottom 150ms ease-in, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'down' && {
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12), visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          right: '100%',
          transition: 'right 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          left: '100%',
          transition: 'left 150ms ease-out, opacity 150ms, visibility 0s ease-out 0.4s',
        },
      },

      ...position === 'bottom-left' && {
        ...slideType === 'up' && {
          bottom: '-15%',
          transition: 'bottom 150ms ease-in, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'down' && {
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12), visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          left: '0px',
          transform: 'translateX(-100%)',
          transition: 'left 150ms ease-out, opacity 150ms, transform 0.3s, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          left: '100%',
          transition: 'left 150ms ease-out, opacity 150ms, transform 0.3s, visibility 0s ease-out 0.4s',
        },
      },

      ...position === 'bottom-right' && {
        ...slideType === 'up' && {
          bottom: '-15%',
          transition: 'bottom 150ms ease-in, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'down' && {
          bottom: '100%',
          transition: 'bottom 0.3s cubic-bezier(0, 0.93, 1, 1.12), visibility 0s ease-out 0.4s',
        },
        ...slideType === 'left' && {
          right: '100%',
          transform: 'translateX(-100%)',
          transition: 'right 150ms ease-out, transform 200ms, opacity 150ms, visibility 0s ease-out 0.4s',
        },
        ...slideType === 'right' && {
          right: '0px',
          transform: 'translateX(100%)',
          transition: 'left 150ms ease-out, transform 200ms, opacity 150ms, visibility 0s ease-out 0.4s',
        },
      },
    },
  }
}
