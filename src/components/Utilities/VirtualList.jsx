import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'

export default function VirtualList({ virtualizerRef, itemCount, itemSizes, overScanCount = 3, renderItem, scrollToIndex, scrollToAlignment, className, style }) {
  if (!virtualizerRef) {
    // eslint-disable-next-line no-param-reassign
    virtualizerRef = useRef(null)
  }
  const [virtualRowParentRef, setVirtualRowParentRef] = useState(null)
  // eslint-disable-next-line no-param-reassign
  virtualizerRef.current = useVirtualizer({
    count: itemCount,
    getScrollElement: () => virtualRowParentRef,
    estimateSize: Array.isArray(itemSizes) ? (i) => itemSizes[i] : () => itemSizes,
    overscan: overScanCount,
    enableSmoothScroll: true,
  })

  useEffect(() => {
    virtualizerRef?.current?.scrollToIndex(scrollToIndex, { align: scrollToAlignment || 'auto' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToIndex, scrollToAlignment])

  return (
    <div
      ref={setVirtualRowParentRef}
      className={className}
      style={{ ...style, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${virtualizerRef.current.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {virtualizerRef.current.getVirtualItems().map(({ index, size, start }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${size}px`,
              transform: `translateY(${start}px)`,
            }}
          >
            {renderItem(index)}
          </div>
        ))}
      </div>
    </div>
  )
}
