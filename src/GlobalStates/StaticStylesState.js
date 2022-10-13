/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil'

export const $staticStylesState = atom({
  key: '$staticStylesState',
  default: {
    styleMergeWithAtomicClasses: {
      lgLightStyles: { form: {} },
      mdLightStyles: { form: {} },
      smLightStyles: { form: {} },
    },
    staticStyles: { '.d-none': { display: 'none' } },
  },
})
