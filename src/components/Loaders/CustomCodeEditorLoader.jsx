import { useFela } from 'react-fela'

const widths = [30, 50, 70, 100, 120, 140, 160, 180, 200, 220]
export default function CustomCodeEditorLoader() {
  const { css } = useFela()
  const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)

  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.src)} loader`} />
      <div className={`${css(cs.t_wrp)} flx`}>
        {Array(40).fill(0).map((_, i) => (
          <div key={`cdl-${i + 2}`} className={`${css(cs.img, { w: widths[randomNumber(1, 10)] })} loader`} />
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
  src: {
    w: 250,
    mx: 'auto',
    h: 32,
    brs: 8,
  },
  t_wrp: {
    bd: 'var(--white-0-97)',
    mt: 15,
    flxc: 1,
    flxp: 1,
    p: 10,
    brs: 8,
  },
  img: {
    h: 13,
    m: 5,
    brs: 8,
  },
}
