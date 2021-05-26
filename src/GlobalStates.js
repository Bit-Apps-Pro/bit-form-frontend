/* eslint-disable no-underscore-dangle */
import { atom, selector } from 'recoil'
import { getNewId, makeFieldsArrByLabel } from './Utils/Helpers'

// atoms
export const _fields = atom({ key: '_fields', default: [], dangerouslyAllowMutability: true })
export const _fieldLabels = atom({ key: '_fieldLabels', default: [], dangerouslyAllowMutability: true })

// selectors
export const _fieldsArr = selector({ key: '_fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get(_fieldLabels)), dangerouslyAllowMutability: true })
export const _uniqueFieldKey = selector({
  key: '_uniqueFieldKey',
  get: ({ get }) => {
    const newId = getNewId(get(_fields))
    return newId
  },
})
