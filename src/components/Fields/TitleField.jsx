import { useEffect } from 'react'
import { selectInGrid } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'

function TitleField({ fieldKey, attr, styleClasses }) {
  const { titleImg, title, subTitle, titleTag, subTitleTag } = attr

  useEffect(() => {
    const txtWrp = selectInGrid(`#${fieldKey}-txt-wrp`)
    const titleHeading = document.createElement(titleTag || 'h1')
    const subTitleSpan = document.createElement(subTitleTag || 'span')
    titleHeading.className = `${fieldKey}-title`
    titleHeading.textContent = title
    txtWrp.appendChild(titleHeading)

    subTitleSpan.className = `${fieldKey}-sub-title`
    subTitleSpan.textContent = subTitle
    txtWrp.appendChild(subTitleSpan)
  }, [titleTag || subTitleTag])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className="drag">
        <div className={`${fieldKey}-wrp`}>
          <img className={`${fieldKey}-logo`} src={titleImg} alt="img" width="40" height="40" />
          <div className={`${fieldKey}-txt-wrp`} id={`${fieldKey}-txt-wrp`} />
        </div>
      </div>
    </>
  )
}

export default TitleField
