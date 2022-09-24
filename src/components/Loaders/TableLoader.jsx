import { useFela } from 'react-fela'

export default function TableLoader() {
  const { css } = useFela()

  return (
    <div>
      {Array(20).fill(0).map((_, i) => (
        <div key={`tbl-${i + 32}`} className={css(s.t_wrp)}>
          <div className={`${css(s.ck)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.txt)} loader`} />
          <div className={`${css(s.icn)} loader`} />
        </div>
      ))}
    </div>
  )
}

const s = {
  wrp: {
    mx: 10,
    my: 10,
  },
  titl: {
    w: 170,
    h: 28,
    brs: 6,
  },
  t_wrp: {
    my: 10,
    dy: 'flex',
    ai: 'center',
    jc: 'space-around',
  },
  ck: {
    se: 23,
    brs: 5,
  },
  icn: {
    se: 26,
    brs: 20,
  },
  txt: {
    h: 15,
    w: 110,
    brs: 12,
    mx: 10,
  },
}
