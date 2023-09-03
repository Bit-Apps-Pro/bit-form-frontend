export default function defaultStepSettings(stepIndex) {
  return {
    lbl: `Step ${stepIndex + 1}`,
    subtitle: 'Step description',
    icon: '',
    showIcon: true,
    iconType: 'number',
    showLbl: true,
    showSubtitle: true,
    customClasses: {},
    customAttributes: {},
  }
}
