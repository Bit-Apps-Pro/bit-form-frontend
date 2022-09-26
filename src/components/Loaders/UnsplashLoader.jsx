import { useFela } from 'react-fela'

export default function UnsplashLoader() {
  const { css } = useFela()
  return (
    <div className={css(cs.wrp)}>
      <div className={`${css(cs.src)} loader`} />
      <div className={`${css(cs.t_wrp)} flx`}>
        <div className={`${css(cs.img, { w: 150 })} loader`} />
        <div className={`${css(cs.img, { w: 80 })} loader`} />
        <div className={`${css(cs.img, { w: 170 })} loader`} />
        <div className={`${css(cs.img, { w: 140 })} loader`} />
        <div className={`${css(cs.img, { w: 180 })} loader`} />
        <div className={`${css(cs.img, { w: 90 })} loader`} />
        <div className={`${css(cs.img, { w: 220 })} loader`} />
        <div className={`${css(cs.img, { w: 70 })} loader`} />
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
    w: '90%',
    mx: 'auto',
    h: 38,
    brs: 20,
  },
  t_wrp: {
    mt: 15,
    flxc: 1,
    flxp: 1,
    jc: 'center',
  },
  img: {
    h: 200,
    m: 5,
    brs: 8,
  },
}
