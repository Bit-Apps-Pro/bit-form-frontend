import { useState } from 'react'
import RenderStyle from '../style-new/RenderStyle'

function Image({ fieldKey, attr, styleClasses }) {
  const [wrap, setWrap] = useState()
  const width = wrap?.clientWidth || 100
  const height = wrap?.clientHeight || 80
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div ref={setWrap} className={`${fieldKey}-fld-wrp drag`}>
        <img className={`${fieldKey}-img`} src={attr?.bg_img || `https://via.placeholder.com/${width}x${height}`} width="100%" height="100%" alt="bg" />
      </div>
    </>
  )
}

export default Image
