import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import DragIcn from '../../Icons/DragIcn'

export const SortableList = SortableContainer(({ children }) => (<div>{children}</div>))

export const SortableItem = SortableElement(({ children }) => children)

export const DragHandle = SortableHandle(({ className, children }) => (
  <span className={`handle ${className}`} style={{ cursor: 'move' }}>{children || <DragIcn size={14} />}</span>
))
