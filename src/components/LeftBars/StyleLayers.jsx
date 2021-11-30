import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'

export default function StyleLayers() {
  const { css } = useFela()
  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Layers & asdasd</h4>
      <div className={css(ut.divider)} />

      
    </div>
  )
}

const s = {
  con: {
    ff: 'Roboto, sans-serif',
    mxw: 250,
    h: '100%',
    bs: '0 0 0 1px var(--b-44-87)',
    ow: 'hidden',
    p: 10,
  },
  title: {
    ff: '"Montserrat", sans-serif',
    m: 0,
    bs: 'none',
  },
}
