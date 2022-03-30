import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { renderDOMObjectFromHTMLStr } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'

function TitleField({ fieldKey, attr: fieldData, styleClasses }) {
  const { logo, title, subtitle, titleHide, subtitleHide, titleTag, subTitleTag } = fieldData
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false

  const titleGenerator = (tag, text, cls, preIcn, sufIcn) => renderDOMObjectFromHTMLStr(
    `<${tag} data-dev${cls}=${fieldKey} className="${fieldKey}${cls}">
      ${preIcn}${text}${sufIcn}
    </${tag}>`,
  )

  const titlePreIcn = fieldData.titlePreIcn ? `<img data-dev-title-pre-i="${fieldKey}" classname="${fieldKey}-title-pre-i" src="${fieldData.titlePreIcn}" alt="Title Prefix Icon" />` : ''
  const titleSufIcn = fieldData.titleSufIcn ? `<img data-dev-title-suf-i="${fieldKey}" classname="${fieldKey}-title-suf-i" src="${fieldData.titleSufIcn}" alt="Title Suffix Icon" />` : ''
  const subTitlPreIcn = fieldData.subTitlPreIcn ? `<img data-dev-sub-titl-pre-i="${fieldKey}" classname="${fieldKey}-sub-titl-pre-i" src="${fieldData.subTitlPreIcn}" alt="Subtitle Prefix Icon" />` : ''
  const subTitlSufIcn = fieldData.subTitlSufIcn ? `<img data-dev-sub-titl-suf-i="${fieldKey}" classname="${fieldKey}-sub-titl-suf-i" src="${fieldData.subTitlSufIcn}" alt="Subtitle Suffix Icon" />` : ''

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''}`}>
        {logo && <img data-dev-logo={fieldKey} className={`${fieldKey}-logo`} src={logo} alt="img" />}
        <div data-dev-titl-wrp={fieldKey} className={`${fieldKey}-titl-wrp`}>
          {!titleHide && titleGenerator(titleTag, title, '-title', titlePreIcn, titleSufIcn)}

          {!subtitleHide && titleGenerator(subTitleTag, subtitle, '-sub-titl', subTitlPreIcn, subTitlSufIcn)}
        </div>
      </div>
    </>
  )
}

export default TitleField
