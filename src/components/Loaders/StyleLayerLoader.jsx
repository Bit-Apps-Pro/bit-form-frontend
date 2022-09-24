import { useFela } from 'react-fela'

export default function StyleLayerLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.titl)} loader`} />
      <div className={`${css(cs.div)} loader`} />
      <div className={`${css(cs.st)} loader`} />
      <div className={`${css(cs.t_wrp)} flx`}>
        <div className={`${css(cs.icn)} loader`} />
        <div className={`${css(cs.txt)} loader`} />
      </div>
      {Array(5).fill(0).map((_, i) => (
        <div key={`s1-${i + 3}`} className={`${css(cs.mnu)} loader`} />
      ))}

      <div className={`${css(cs.t_wrp)} flx`}>
        <div className={`${css(cs.icn)} loader`} />
        <div className={`${css(cs.txt)} loader`} />
      </div>
      {Array(5).fill(0).map((_, i) => (
        <div key={`s2-${i + 1}`} className={`${css(cs.mnu)} loader`} />
      ))}

      <div className={`${css(cs.t_wrp)} flx`}>
        <div className={`${css(cs.icn)} loader`} />
        <div className={`${css(cs.txt)} loader`} />
      </div>
      {Array(5).fill(0).map((_, i) => (
        <div key={`s3-${i + 5}`} className={`${css(cs.mnu)} loader`} />
      ))}
    </div>
  )
}
const cs = {
  wrp: {
    mx: 10,
    my: 10,
  },
  titl: {
    w: 140,
    h: 20,
    brs: 5,
    mt: 7,
    mb: 10,
  },
  div: {
    w: '100%',
    h: 1,
    my: 7,
  },
  st: {
    h: 16,
    brs: 3,
    w: 120,
    my: 8,
  },
  t_wrp: {
    ml: 2,
    my: 15,
  },
  icn: {
    se: 15,
    brs: 2,
  },
  txt: {
    ml: 10,
    h: 13,
    w: 90,
    brs: 3,
  },
  mnu: {
    w: 100,
    h: 12,
    brs: 2,
    my: 12,
    ml: 27,
  },
}
