import { useFela } from 'react-fela'

export default function ToolbarLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.srch)} loader`} />
      {Array(20).fill(0).map((_, i) => (
        <div key={`tb-${i + 3}`} className={`${css(cs.t_wrp)} flx`}>
          <div className={`${css(cs.icn)} loader`} />
          <div className={`${css(cs.txt)} loader`} />
        </div>
      ))}
    </div>
  )
}
const cs = {
  wrp: {
    mx: 10,
    my: 10,
  },
  srch: {
    w: 120,
    h: 28,
    brs: 6,
  },
  t_wrp: {
    ml: 10,
    my: 10,
  },
  icn: {
    se: 28,
    brs: 8,
  },
  txt: {
    ml: 10,
    h: 20,
    w: 90,
    brs: 5,
  },
}
