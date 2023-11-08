import { IS_PRO } from '../../Helpers'

export default function defaultStepSettings(stepIndex) {
  return {
    lbl: `Step ${stepIndex + 1}`,
    subtitle: 'Step description',
    icon: '',
    showIcon: true,
    iconType: 'number',
    showLbl: IS_PRO,
    showSubtitle: IS_PRO,
    customClasses: {},
    customAttributes: {},
  }
}
