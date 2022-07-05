import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $builderRightPanelScroll } from '../../../GlobalStates/GlobalStates'
import ut from '../../../styles/2.utilities'
import style from '../../../styles/FieldSettingTitle.style'
import { ucFirst } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import CoolCopy from '../../Utilities/CoolCopy'
import Back2FldBtn from '../Back2FldBtn'
import SizeAndPosition from './StyleComponents/SizeAndPosition'

export default function FieldSettingTitle({ title, subtitle, fieldKey }) {
  const scrollTo = useRecoilValue($builderRightPanelScroll)
  const { css } = useFela()
  return (
    <>
      <div className={css(style.section, style.flxColumn, style.fixed, scrollTo && style.shw)}>
        <Back2FldBtn size="16" className={css(style.btn, ut.fontBody)} />
        <div>
          <div className={css(style.mainTitle)}>{__(title)}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__(ucFirst(subtitle))}</span>
        </div>
      </div>

      <hr className={css(style.divider)} />

      <div className={css(style.section, { mx: 15 })}>
        <span className={css(style.title)}>Field key</span>
        <CoolCopy id="fld-stng-key" value={fieldKey} />
      </div>

      <hr className={css(style.divider)} />
      <SizeAndPosition fldKey={fieldKey} />
      <hr className={css(style.divider)} />
    </>
  )
}
