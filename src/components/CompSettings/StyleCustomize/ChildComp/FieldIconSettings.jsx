import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import EditIcn from '../../../../Icons/EditIcn'
import ut from '../../../../styles/2.utilities'
import Tip from '../../../Utilities/Tip'
import IconStyleBtn from '../../IconStyleBtn'

export default function FieldIconSettings({ classNames, labelClass, label, alt, iconSrc, styleRoute, setIcon, removeIcon }) {
  const { css } = useFela()
  return (
    <div className={`${css(ut.flxcb)} ${classNames}`}>
      <span className={`${css(ut.fw500, ut.ml2)} ${labelClass}`}>{label}</span>
      <div className={css(ut.flxcb)}>
        {iconSrc && (
          <>
            <img src={iconSrc} alt={alt || label} width="18" height="18" />
            <Tip msg="Style">
              <IconStyleBtn route={styleRoute} />
            </Tip>
          </>
        )}

        <Tip msg="Change">
          <button type="button" onClick={setIcon} className={css(ut.icnBtn)}>
            <EditIcn size={22} />
          </button>
        </Tip>
        {iconSrc && (
          <Tip msg="Remove">
            <button onClick={removeIcon} className={css(ut.icnBtn)} type="button">
              <CloseIcn size="13" />
            </button>
          </Tip>
        )}

      </div>
    </div>
  )
}
