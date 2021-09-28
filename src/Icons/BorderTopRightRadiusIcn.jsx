import { useFela } from 'react-fela'

export default function BorderTopRightRadiusIcn({ size = 12, color = 'var(--white-0-50)' }) {
  const { css } = useFela()
  const style = {
    container: { flx: 'center', w: size + 8 },
    radius: {
      w: size,
      h: size,
      bt: `2px solid ${color}`,
      br: `2px solid ${color}`,
      'border-top-right-radius': '5px',
    },
  }
  return (
    <div className={css(style.container)}>
      <div className={css(style.radius)} />
    </div>
  )
}
