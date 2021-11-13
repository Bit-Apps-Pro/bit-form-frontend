import produce from 'immer'
import { select } from '../../Utils/globalHelpers'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal, { component, width = 250, subtitle, action, value }) => {
  const settingsMenu = select('#settings-menu')
  const offset = { top: 55 }
  const x = Math.round((window.innerWidth - settingsMenu.getBoundingClientRect().width) - width)
  const y = e.target.getBoundingClientRect().top - offset.top
  setDraggableModal({ show: true, component, position: { x, y }, width, subtitle, action, value })
}

export const json2CssStr = (jsonValue) => {
  let cssStr = '{'
  for (const property in jsonValue) {
    if (Object.hasOwnProperty.call(jsonValue, property)) {
      cssStr += `${property}:${jsonValue[property]};`
    }
  }
  cssStr += '}'
  return cssStr
}

export const changeFormDir = (style, dir) => produce(style, drft => {
  if (drft.theme === 'bitformDefault') {
    for (const fieldKey in drft.fields) {
      if (Object.hasOwnProperty.call(drft.fields, fieldKey)) {
        if (drft.fields[fieldKey].overrideGlobalTheme === false) {
          switch (drft.fields[fieldKey].fieldType) {
            case 'check':
            case 'radio':
              if (dir === 'rtl') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
              } else if (dir === 'ltr') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
              }
              break
          }
        }
      }
    }
  }
})

export const unitConverterHelper = (unit, value, preUnit) => {
  if (preUnit === unit) return value

  if (preUnit === 'px' && unit === 'em') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === 'rem') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === '%') return Number(value * 6.25)

  if (preUnit === 'em' && unit === 'px') return Number(value * 16)
  if (preUnit === 'em' && unit === 'rem') return Number(value)
  if (preUnit === 'em' && unit === '%') return Number(value * 100)

  if (preUnit === 'rem' && unit === 'em') return Number(value)
  if (preUnit === 'rem' && unit === 'px') return Number(value * 16)
  if (preUnit === 'rem' && unit === '%') return Number(value * 100)

  if (preUnit === '%' && unit === 'px') return Number(value * 0.16)
  if (preUnit === '%' && unit === 'rem') return Number(value * 0.01)
  if (preUnit === '%' && unit === 'em') return Number(value * 0.01)
}

export const getNumFromStr = (str = '') => str.match(/[-]?([0-9]*[.])?[0-9]+/gi)?.[0]
export const getStrFromStr = (str = '') => str.match(/([A-z]|%)+/gi)?.[0]
