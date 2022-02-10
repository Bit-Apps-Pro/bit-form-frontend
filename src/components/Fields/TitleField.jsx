import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { renderDOMObjectFromHTMLStr } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

function TitleField({ fieldKey, attr: fieldData, styleClasses }) {
  const { logo, logoHide, title, subtitle, titleHide, subtitleHide, titleTag, subTitleTag } = fieldData
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const titleGenerator = (tag, text, cls, preIcn, sufIcn) => {
    switch (tag) {
      case 'h1':
        return (
          <h1 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h1>
        )
      case 'h2':
        return (
          <h2 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h2>
        )
      case 'h3':
        return (
          <h3 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h3>
        )
      case 'h4':
        return (
          <h4 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h4>
        )
      case 'h5':
        return (
          <h5 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h5>
        )
      case 'h6':
        return (
          <h6 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h6>
        )
      case 'div':
        return (
          <div className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </div>
        )
      case 'span':
        return (
          <span className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </span>
        )
      case 'p':
        return (
          <p className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </p>
        )
      default:
        return (
          <h1 className={`${fieldKey}${cls}`}>
            {preIcn}
            {renderDOMObjectFromHTMLStr(text)}
            {sufIcn}
          </h1>
        )
    }
  }

  const titlePreIcn = fieldData.titlePreIcn ? <img data-dev-title-pre-i={fieldKey} className={`${fieldKey}-title-pre-i`} src={fieldData.titlePreIcn} alt="" /> : ''
  const titleSufIcn = fieldData.titleSufIcn ? <img data-dev-title-suf-i={fieldKey} className={`${fieldKey}-title-suf-i`} src={fieldData.titleSufIcn} alt="" /> : ''
  const subTlePreIcn = fieldData.subTlePreIcn ? <img data-dev-sub-titl-pre-i={fieldKey} className={`${fieldKey}-sub-titl-pre-i`} src={fieldData.subTlePreIcn} alt="" /> : ''
  const subTleSufIcn = fieldData.subTleSufIcn ? <img data-dev-sub-titl-suf-i={fieldKey} className={`${fieldKey}-sub-titl-suf-i`} src={fieldData.subTleSufIcn} alt="" /> : ''

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        {logoHide && <img className={`${fieldKey}-logo`} src={logo} alt="img" width="40" height="40" />}
        <div className="title-wrp">
          {titleHide && titleGenerator(titleTag, title, '-title', titlePreIcn, titleSufIcn)}

          {subtitleHide && titleGenerator(subTitleTag, subtitle, '-sub-titl', subTlePreIcn, subTleSufIcn)}
        </div>
      </div>
    </>
  )
}

export default TitleField
