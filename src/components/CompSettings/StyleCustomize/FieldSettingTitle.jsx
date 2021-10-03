import { useFela } from 'react-fela'
import ut from '../../../styles/2.utilities'
import { __ } from '../../../Utils/i18nwrap'
import CoolCopy from '../../Utilities/CoolCopy'
import Back2FldBtn from '../Back2FldBtn'
import style from '../../../styles/FieldSettingTitle.style'

export default function FieldSettingTitle({ title, subtitle, fieldKey }) {
  const { css } = useFela()
  return (
    <>
      <div className={css(style.section, style.flxColumn)}>
        <Back2FldBtn size="20" className={css(style.btn)} />
        <div>
          <div className={css(style.mainTitle)}>{__(title, 'bitform')}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__(subtitle[0].toUpperCase() + subtitle.slice(1), 'bitform')}</span>
        </div>
      </div>

      <hr className={css(style.divider)} />

      <div className={css(style.section)}>
        <span className={css(style.title)}>Field key</span>
        <CoolCopy value={fieldKey} />
      </div>

      <hr className={css(style.divider)} />
    </>
  )
}
