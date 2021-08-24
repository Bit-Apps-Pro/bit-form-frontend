const primaryColor = 'hsl(265, 100%, 50%)'
const secondaryColor = 'hsl(0, 0%, 50%)'
const transition = '0.2s ease-out'
const baseHeight = 200
const fontSize = `${baseHeight / 7.1}px`

const lblTopStyle = {
  left: '0',
  top: '0',
  transform: 'translateY(-50%) scale(0.9) !important',
}

const mtinput = {
  'material-outlined': {
    position: 'relative',
    fontSize,
    width: `${baseHeight * 3}px`,
  },

  'material-outlined__input': {
    fontSize,
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    border: `1px solid ${secondaryColor}`,
    borderRadius: '5px',
    padding: `${baseHeight / 6.25}px ${baseHeight / 2.75}px`,
    color: secondaryColor,
    transition,

    ':focus': {
      borderColor: primaryColor,

      '& + label': { ...lblTopStyle, color: primaryColor },
      '& ~ span': { color: primaryColor },
    },

    ':not(:placeholder-shown) ~ label': lblTopStyle,
    ':not(:focus)::placeholder': { opacity: '0' },
  },

  'material-outlined__label': {
    fontSize,
    position: 'absolute',
    left: `${baseHeight / 4.15}px`,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    color: secondaryColor,
    padding: `0 ${baseHeight / 20}px`,
    margin: `0 ${baseHeight / 12.5}px`,
    transition,
    transformOrigin: 'left top',
    pointerEvents: 'none',
  },

  'material-outlined__icon': {
    position: 'absolute',
    display: 'block',
    top: '50%',
    transform: 'translateY(-50%)',
    color: secondaryColor,
    transition,

    '& svg': {
      height: `${baseHeight / 4.15}px`,
      width: `${baseHeight / 4.15}px`,
    },

  },
  'material-outlined__icon--leading': { left: `${baseHeight / 12.5}px` },
  'material-outlined__icon--trailing': { right: `${baseHeight / 12.5}px` },
}

export default mtinput
