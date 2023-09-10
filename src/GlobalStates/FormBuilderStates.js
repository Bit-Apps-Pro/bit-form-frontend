import { atomWithReset } from 'jotai/utils'

export const $isDraggable = atomWithReset(true)
export const $activeBuilderStep = atomWithReset(0) // index
