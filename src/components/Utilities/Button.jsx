import { useFela } from 'react-fela'
import app from '../../styles/app.style'

function Button({ className, type, onClick, icn, disabled, children, style }) {
  const { css } = useFela()
  return (
    <button
      data-testid={`${id}-cmp-btn`}
      style={style}
      className={`${icn ? 'icn-btn' : css(app.btn)}  ${className}`}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      onClick={onClick}
      aria-label="btcd-button"
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
