import { createRenderer } from 'fela'
import PropTypes from 'prop-types'
import React from 'react'
// import './material-input.css'
import { RendererProvider, useFela } from 'react-fela'

const renderer = createRenderer({})
/**
 * Primary UI component for user interaction
 */
const MtInput = ({ size }) => {
  const { css } = useFela()
  const primaryColor = 'hsl(265, 100%, 50%)'
  const secondaryColor = 'hsl(0, 0%, 50%)'
  const transition = '0.2s ease-out'
  const baseHeight = size
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

  return (
    <div className={css(mtinput['material-outlined'])}>
      <input id="exampleField1" className={css(mtinput['material-outlined__input'])} placeholder=" " type="text" />
      <label htmlFor="exampleField1" className={css(mtinput['material-outlined__label'])}>Text Field</label>
      <span className={css(mtinput['material-outlined__icon'], mtinput['material-outlined__icon--leading'])}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </span>
      <span className={css(mtinput['material-outlined__icon'], mtinput['material-outlined__icon--trailing'])}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
    </div>
  )
}

// eslint-disable-next-line import/prefer-default-export
export const MaterialInput = ({ backgroundColor, size }) => (
  <RendererProvider renderer={renderer}>
    <MtInput size={size} />
  </RendererProvider>
)

MaterialInput.propTypes = {
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.number,
}

MaterialInput.defaultProps = {
  backgroundColor: null,
  size: 100,
}
