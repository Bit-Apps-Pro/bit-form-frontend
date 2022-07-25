/* eslint-disable camelcase */
import checkboxNradioStyle1_4_individual from '../../componentsStyleByTheme/4_individual/checkboxNradioStyle1_4_individual'

export default function individual({ fk, type, direction, fieldsArr }) {
  const fieldsStyles = {}
  switch (type) {
    case 'check':
    case 'radio':
      return checkNradioBox(type, fk, direction)
    default:
      return fieldsStyles
  }
}

const checkNradioBox = (type, fk, direction) => ({
  theme: 'individual',
  fieldType: type,
  // fieldThemeVars: {},
  overrideGlobalTheme: [],
  fieldSize: 'medium',
  classes: checkboxNradioStyle1_4_individual({ fk, type, direction }),
})



