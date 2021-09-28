import { useFela } from 'react-fela'

export default function BorderBottomLeftRadiusIcn({ size = 12, color = 'var(--white-0-50)' }) {
  const { css } = useFela()
  const style = {
    container: { flx: 'center', w: size + 8 },
    radius: {
      w: size,
      h: size,
      bb: `2px solid ${color}`,
      bl: `2px solid ${color}`,
      'border-bottom-left-radius': '5px',
    },
  }
  return (
    <div className={css(style.container)}>
      <div className={css(style.radius)} />
    </div>
  )
}
