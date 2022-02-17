import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

function Image({ fieldKey, attr: fieldData, styleClasses }) {
  const [wrap, setWrap] = useState()
  const width = wrap?.clientWidth || 100
  const height = wrap?.clientHeight || 80
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  const styleClassesForRender = deepCopy(styleClasses)
  styleClassesForRender[`.${fieldKey}-img`].width = width
  styleClassesForRender[`.${fieldKey}-img`].height = height
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <div data-dev-fld-wrp={fieldKey} ref={setWrap} className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <img data-dev-img={fieldKey} className={`${fieldKey}-img`} src={fieldData?.bg_img || `https://via.placeholder.com/${width}x${height}`} alt="bg" />
      </div>
    </>
  )
}

export default Image
