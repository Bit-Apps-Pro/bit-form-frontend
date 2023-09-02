export default function defaultStepSettings(stepIndex) {
  return {
    lbl: `Step ${stepIndex + 1}`,
    subtitle: 'Step description',
    stepIcon: 'https://www.w3schools.com/howto/img_avatar.png',
    showIcon: true,
    iconType: 'number',
    showLbl: true,
    showSubtitle: true,
    customClasses: {},
    customAttributes: {},
  }
}
