export default function tickPosition(position) {
  const tikPos = {
    /* tick position top left */
    'top-left': {
      top: '10px',
      left: '10px',
    },
    /* tick position top center half element */
    /* top: -15px,
    left: 50%,
    transform: translateX(-50%), */

    /* tick position top right */
    /*
    right: 10px,
    top: 10px,
    */
    'top-right': {
      top: '10px',
      right: '10px',
    },

    /* tick position bottom left */
    /* bottom: 10px,
  left: 10px, */
    'bottom-left': {
      bottom: '10px',
      left: '10px',
    },

    /* tick position bottom right */
    /* bottom: 10px,
  right: 10px, */
    'bottom-right': {
      bottom: '10px',
      right: '10px',
    },

    /* tick position center */
    /* top: 50%,
  left: 50%,
  transform: translate(-50%, -50%), */
    center: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    /* tick position top center */
    /* top: 10px,
  left: 50%,
  transform: translateX(-50%), */
    'top-center': {
      top: '10px',
      left: '50%',
    },

    /* tick position bottom center */
    /* bottom: 10px,
    left: 50%,
    transform: translateX(-50%), */
    'bottom-center': {
      bottom: '10px',
      left: '50%',
    },
  }
  return tikPos[position]
}
