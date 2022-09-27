import { Fragment } from 'react'
import { useFela } from 'react-fela'

export default function FieldSettingsLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.lnk)} loader`} />
      <div className={`${css(cs.titl)} loader`} />
      <div className={`${css(cs.sub)} loader`} />
      {Array(10).fill(0).map((_, i) => (
        <Fragment key={`tb-${i + 3}`}>
          <div className={`${css(cs.t_wrp)} flx`}>
            <div className={`${css(cs.txt)} loader`} />
            <div className={`${css(cs.icn)} loader`} />
          </div>
          <div className={`${css(cs.fld)} loader`} />
        </Fragment>
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
    w: 130,
    h: 10,
    brs: 4,
  },
  titl: {
    w: 120,
    h: 20,
    brs: 5,
    my: 10,
  },
  sub: {
    w: 40,
    h: 10,
    brs: 3,
    my: 10,
  },
  t_wrp: {
    ml: 10,
    my: 10,
    flx: 'between',
    w: '95%',
  },
  icn: {
    w: 50,
    h: 25,
    brs: 6,
  },
  txt: {
    h: 23,
    w: 90,
    brs: 6,
  },
  fld: {
    h: 40,
    w: '90%',
    brs: 8,
    mx: 18,
  },
}
