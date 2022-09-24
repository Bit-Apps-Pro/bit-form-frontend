import { useFela } from 'react-fela'

export default function StyleCustomizeLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.lnk)} loader`} />
      <div className={`${css(cs.titl)} loader`} />
      {Array(12).fill(0).map((_, i) => (
        <div key={`tb-${i + 3}`} className={`${css(cs.t_wrp)} flx`}>
          <div className={`${css(cs.txt)} loader`} />
          <div className={`${css(cs.icn)} loader`} />
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
  lnk: {
    w: 140,
    h: 10,
    brs: 4,
  },
  titl: {
    w: 220,
    h: 22,
    brs: 5,
    my: 10,
  },
  t_wrp: {
    ml: 10,
    my: 10,
    flx: 'between',
    w: '98%',
  },
  icn: {
    w: 132,
    h: 30,
    brs: 10,
  },
  txt: {
    h: 15,
    w: 90,
    brs: 6,
  },
}
