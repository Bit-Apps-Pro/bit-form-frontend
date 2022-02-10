import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import RenderStyle from '../style-new/RenderStyle'

function Image({ fieldKey, attr: fieldData, styleClasses }) {
  const [wrap, setWrap] = useState()
  const width = wrap?.clientWidth || 100
  const height = wrap?.clientHeight || 80
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div ref={setWrap} className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        <img className={`${fieldKey}-img`} src={fieldData?.bg_img || `https://via.placeholder.com/${width}x${height}`} width="100%" height="100%" alt="bg" />
      </div>
    </>
  )
}

export default Image
