import { __ } from '../../i18nwrap'

const defaultMultstepSettings = {
  themeStyle: 'style-0',
  showStepHeader: true,
  showLbl: true,
  showSubtitle: true,
  headerIcon: {
    show: true,
    iconType: 'number',
  },
  btnSettings: {
    show: true,
    prevBtn: {
      key: 'bf-prev-btn',
      typ: 'button',
      btnType: 'prevBtn',
      btnSiz: 'md',
      txt: __('Previous'),
    },
    nextBtn: {
      key: 'bf-next-btn',
      typ: 'button',
      btnType: 'nextBtn',
      btnSiz: 'md',
      txt: __('Next'),
    },
    position: 'bottom',
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
