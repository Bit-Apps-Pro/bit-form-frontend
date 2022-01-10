import { useEffect, useRef } from 'react'
import { useFela } from 'react-fela'
import FieldStyle from '../../../styles/FieldStyle.style'

const AutoResizeInput = ({ name, className, ariaLabel, placeholder, changeAction, value, rows = 1, maxRow = 3 }) => {
  const { css } = useFela()
  const textInput = useRef(null)

  const heightReset = () => {
    while (textInput.current.getAttribute('rows') < maxRow && textInput.current.offsetHeight < textInput.current.scrollHeight) {
      console.log( "loop 1= ", textInput.current.getAttribute('rows'), textInput.current.offsetHeight, textInput.current.scrollHeight)
      textInput.current.setAttribute('rows', Number(textInput.current.getAttribute('rows')) + 1)
    }
  }
  useEffect(() => {
    heightReset()
  }, [])

  const keyAction = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      textInput.current.style.height = `${textInput.current.offsetHeight - 1 }px`
      while (textInput.current.offsetHeight >= textInput.current.scrollHeight) {
        console.log("loop 2= ", textInput.current.getAttribute('rows'), textInput.current.offsetHeight, textInput.current.scrollHeight)
        textInput.current.setAttribute('rows', Number(textInput.current.getAttribute('rows')) - 1)
        textInput.current.style.height = 'unset'
        textInput.current.style.height = `${textInput.current.offsetHeight - 1 }px`
      }
      textInput.current.style.height = 'unset'
    }
    heightReset(e)
  }
  return (
    <textarea
      aria-label={ariaLabel}
      ref={textInput}
      name={name}
      className={`${css(FieldStyle.input, { ow: 'auto', re: 'height' })} ${className}`}
      placeholder={placeholder}
      value={value}
      rows={rows}
      onKeyUp={keyAction}
      onChange={changeAction}
    />
  )
}

export default AutoResizeInput
