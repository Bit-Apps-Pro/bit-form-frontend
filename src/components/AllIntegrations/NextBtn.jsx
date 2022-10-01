import { useFela } from 'react-fela'
import BackIcn from '../../Icons/BackIcn'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'

export default function NextBtn({ nextPageHanlder, disabled }) {
  const { css } = useFela()
  return (
    <Btn
      varient="success"
      onClick={nextPageHanlder}
      className={css(ut.ftRight)}
      disabled={disabled}
    >
      {__('Next')}
      <BackIcn className={css(nextBtnStyle.backIcn, ut.ml1)} />
    </Btn>
  )
}

const nextBtnStyle = {
  backIcn: {
    tm: 'rotateY(180deg)',
    '-webkit-transform': 'rotateY(180deg)',
    '-moz-transform': 'rotateY(180deg)',
    '-o-transform': 'rotateY(180deg)',
    '-ms-transform': 'rotateY(180deg)',
  },

}
