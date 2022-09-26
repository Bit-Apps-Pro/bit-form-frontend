import { useFela } from 'react-fela'

export default function IntegLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.titl)} loader`} />
      <div className={`${css(cs.t_wrp)} flx`}>
        {Array(4).fill(0).map((_, i) => (
          <div key={`tb-${i + 3}`} className={`${css(cs.mnu)} loader`} />
        ))}
      </div>
    </div>
  )
}
const cs = {
  wrp: {
    mx: 10,
    my: 10,
  },
  titl: {
    w: 170,
    h: 28,
    brs: 6,
  },
  t_wrp: { my: 20 },
  mnu: {
    h: 145,
    w: 240,
    brs: 8,
    mr: 10,
  },
}
