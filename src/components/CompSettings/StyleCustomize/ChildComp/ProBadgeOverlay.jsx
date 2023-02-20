import { useFela } from 'react-fela'
import ProBadge from '../../../Utilities/ProBadge'

export default function ProBadgeOverlay({ badgeWidth = '18' }) {
  const { css } = useFela()
  return (
    <>
      <div className={css(style.overlay)} />
      <ProBadge className={css(style.badge)} width={badgeWidth} />
    </>
  )
}

const style = {
  overlay: {
    bd: 'hsl(215deg 1% 77% / 22%)',
    brs: 8,
    pn: 'absolute',
    lp: 0,
    zx: 2,
    w: '100%',
    h: '100%',
    bpf: 'blur(0.5px)',
  },
  badge: {
    zx: 3,
  },
}
