import { getDefaultStore } from 'jotai'

const bitStore = getDefaultStore()
export const getAtom = bitStore.get
export const setAtom = bitStore.set
