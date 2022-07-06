/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import { useRecoilValue } from 'recoil'
import { $flags } from '../../GlobalStates/GlobalStates'
import { getCustomAttributs, getCustomClsName } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'
import RenderHtml from '../Utilities/RenderHtml'

export default function HtmlField({ fieldKey, attr, styleClasses }) {
  const { styleMode } = useRecoilValue($flags)
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div
        data-dev-fld-wrp={fieldKey}
        className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${getCustomClsName(fieldKey, 'fld-wrp')}`}
        {...getCustomAttributs(fieldKey, 'fld-wrp')}
      >
        <RenderHtml html={attr.content || attr?.info?.content} />
      </div>
    </>
  )
}
