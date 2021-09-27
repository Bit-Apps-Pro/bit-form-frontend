import { useFela } from 'react-fela'

export default function BorderBottomRightRadiusIcn({ size = 19, color = 'var(--white-0-50)' }) {
  const { css } = useFela()
  const style = {
    container: { flx: 'center', w: size + 8 },
    radius: {
      w: size,
      h: size,
      bb: `2px solid ${color}`,
      br: `2px solid ${color}`,
      'border-bottom-right-radius': '5px',
    },
  }
  return (
    <div className={css(style.container)}>
      <div className={css(style.radius)} />
    </div>
  )
}
