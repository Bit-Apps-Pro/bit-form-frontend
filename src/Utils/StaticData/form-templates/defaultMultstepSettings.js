import { IS_PRO } from '../../Helpers'
import { __ } from '../../i18nwrap'

const defaultMultstepSettings = {
  themeStyle: 'style-0',
  showStepHeader: IS_PRO,
  showLbl: IS_PRO,
  showSubtitle: IS_PRO,
  validateOnStepChange: IS_PRO,
  maintainStepHistory: IS_PRO,
  saveProgress: IS_PRO,
  stepHeaderSwitchable: IS_PRO,
  headerIcon: {
    show: IS_PRO,
    iconType: 'number',
  },
  btnSettings: {
    show: true,
    prevBtn: {
      key: 'prev-step-btn',
      typ: 'button',
      btnTyp: 'previous-step',
      btnSiz: 'md',
      txt: __('Previous'),
    },
    nextBtn: {
      key: 'next-step-btn',
      typ: 'button',
      btnTyp: 'next-step',
      btnSiz: 'md',
      txt: __('Next'),
    },
    position: 'column',
    orientation: 'horizontal',
    alignment: 'right',
  },
  progressSettings: {
    show: true,
    position: 'top',
    alignment: 'left',
    orientation: 'horizontal',
    type: 'bar',
    barStyle: 'style-0',
    showStepNumber: true,
    showStepLabel: true,
    showPercentage: true,
  },
}

export default defaultMultstepSettings
