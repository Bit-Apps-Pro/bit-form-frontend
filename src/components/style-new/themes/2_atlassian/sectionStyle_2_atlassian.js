import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function sectionStyle_2_atlassian({ fk, type, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),
      [`.${fk}-inp-fld-wrp`]: { display: 'grid' },
    }
  }
  return {}
}
