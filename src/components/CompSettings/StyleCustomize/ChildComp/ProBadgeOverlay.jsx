import { useFela } from 'react-fela'
import { useSetAtom } from 'recoil'
import { $proModal } from '../../../../GlobalStates/GlobalStates'
import proHelperData from '../../../../Utils/StaticData/proHelperData'
import ProBadge from '../../../Utilities/ProBadge'

export default function ProBadgeOverlay({ badgeWidth = '18', proProperty }) {
  const setProModal = useSetAtom($proModal)
  const { css } = useFela()
  const showProModal = () => setProModal({ show: true, ...proHelperData[proProperty] })
  return (
    <>
      <span aria-label="premium-overlay" className={css(style.overlay)} role="button" onClick={showProModal} onKeyUp={showProModal} tabIndex="0" />
      <ProBadge className={css(style.badge)} width={badgeWidth} proProperty={proProperty} />
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
