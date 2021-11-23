import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'

export default function ThemeStylePropertyBlock({ label, className, children }) {
  const { css } = useFela()
  return (
    <div className={`${css(ut.flxcb)} ${className}`}>
      <span className={css(ut.fw500)}>{label}</span>
      <div>{children}</div>
    </div>
  )
}
