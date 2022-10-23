import { useSingleton } from '@tippyjs/react'
import { cloneElement, useId } from 'react'
import Tip from './Tip'

export default function TipGroup({ children, delay = 300, ...rest }) {
  const key = useId()
  const [sourceTip, siblingTip] = useSingleton()
  return (
    <>
      <Tip singleton={sourceTip} delay={delay} interactive={rest.interactive} />
      {children.map((child, i) => (child?.type?.name === 'Tip' ? cloneElement(child, { key: `tip-grp-${key + i * 2}`, singleton: siblingTip, ...rest }) : child))}
    </>
  )
}
