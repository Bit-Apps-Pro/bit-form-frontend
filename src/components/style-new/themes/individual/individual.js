/* eslint-disable camelcase */
import checkboxNradioStyle_4_individual from './checkboxNradioStyle_4_individual'

export default function individual({ fieldKey: fk, type, direction, breakpoint = 'lg', colorScheme = 'light' }) {
  const fieldsStyles = {}
  switch (type) {
    case 'check':
    case 'radio':
      return checkNradioBox({ type, fk, direction, breakpoint, colorScheme })
    default:
      return fieldsStyles
  }
}

const checkNradioBox = ({ type, fk, direction, breakpoint, colorScheme }) => {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      theme: 'individual',
      fieldType: type,
      // fieldThemeVars: {},
      overrideGlobalTheme: [],
      fieldSize: 'medium',
      classes: checkboxNradioStyle_4_individual({ fk, type, direction, breakpoint, colorScheme }),
    }
  }
  return {}
}
