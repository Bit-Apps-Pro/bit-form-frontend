import { useFela } from 'react-fela'
import logo from '../../logo.svg'

export default function DocNSupport() {
  const { css } = useFela()
  return (
    <>
      <img className={css(style.logo)} src={logo} alt="logo" />
      {/* <h2 className={css(style.title)}>Feedback</h2>
      <FeedBack className={css(style.container)} /> */}
    </>
  )
}
const style = {
  logo: {
    w: 50,
    h: 50,
    ml: 10,
    mt: 10,
  },
  title: {
    fs: 20,
    fw: 600,
    m: 10,
  },
  container: {
    w: 400,
    b: '1px solid var(--b-79-96)',
    p: 10,
    m: 10,
    brs: 5,
    bs: '0 2px 4px -2px hsla(0, 0%, 0%, 40%)',
  },
}
