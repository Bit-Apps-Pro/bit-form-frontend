/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import { useRecoilValue } from 'recoil'
import { $flags } from '../../GlobalStates/GlobalStates'
import { renderDOMObjectFromHTMLStr } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

export default function HtmlField({ fieldKey, attr, formID, styleClasses }) {
  const { styleMode } = useRecoilValue($flags)
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'}`}>
        {renderDOMObjectFromHTMLStr(attr.content || attr?.info?.content)}
      </div>
    </>
  )
}
