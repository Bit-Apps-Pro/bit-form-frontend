import { useFela } from 'react-fela'

export default function FSettingsLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.titl)} loader`} />
      {Array(7).fill(0).map((_, i) => (
        <div key={`tb-${i + 3}`} className={`${css(cs.t_wrp)} flx`}>
          <div className={`${css(cs.mnu)} loader`} />
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
  titl: {
    w: 170,
    h: 28,
    brs: 6,
  },
  t_wrp: {
    my: 10,
  },
  mnu: {
    h: 50,
    w: '70%',
    brs: 8,
  },
}
