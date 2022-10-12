/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil'

export const $staticStylesState = atom({
  key: '$staticStylesState',
  default: {
    styleMergeWithAtomicClasses: {
      lgLightStyles: {},
      mdLightStyles: {},
      smLightStyles: {},
    },
    staticStyles: { '.d-none': { display: 'none' } },
  },
})
