/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil'
import { addToSessionStorage, generateSessionKey } from '../Utils/FormBuilderHelper'

export const $staticStylesState = atom({
  key: '$staticStylesState',
  default: {
    styleMergeWithAtomicClasses: {
      lgLightStyles: { form: {} },
      mdLightStyles: { form: {} },
      smLightStyles: { form: {} },
    },
    staticStyles: {
      '.d-none': { display: 'none' },
      '.form-msg': {
        background: '#ffe8c3',
        'border-radius': '6px',
        margin: '6px 0px',
        padding: '5px 14px',
        color: '#776f63',
        height: '0',
        opacity: '0',
        transition: 'all 0.5s ease-out',
      },
      '.form-msg.success': {
        background: '#c5f7dd',
      },
      '.form-msg.error': {
        background: '#ffd0cb',
      },
      '.form-msg.warning': {
        background: '#ffe8c3',
      },
      '.form-msg.active': {
        height: 'auto',
        opacity: '1',
        transition: 'all 1s ease-out',
      },
      '.btcd-fld-itm': {
        transition: 'all 0.2s ease',
      },
      '.fld-hide': {
        'min-height': '0px',
        height: 0,
        overflow: 'hidden',
      },
    },
  },
  effects: [({ onSet }) => {
    onSet((newStaticStyles) => {
      addToSessionStorage(generateSessionKey('staticStyles'), newStaticStyles, { strType: 'json' })
    })
  }],
})
