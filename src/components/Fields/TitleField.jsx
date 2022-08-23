/* eslint-disable react/jsx-props-no-spreading */
import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'
import RenderHtml from '../Utilities/RenderHtml'

function TitleField({ fieldKey, attr: fieldData, styleClasses }) {
  const { logo, title, subtitle, titleHide, subtitleHide, titleTag, subTitleTag } = fieldData
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.valid.hidden?.includes(breakpoint) || false

  const titleGenerator = (tag, text, cls, preIcn, sufIcn) => (
    <RenderHtml html={`<${tag} data-dev-${cls}=${fieldKey} className="${fieldKey}-${cls} ${getCustomClsName(fieldKey, cls)}">
  ${preIcn}${text}${sufIcn}
</${tag}>`}
    />
  )

  const attFunction = (element) => {
    const obj = fieldData.customAttributes[element]
    if (obj === '') return
    let str = ''
    if (obj) {
      const attrLen = obj.length
      let i = 0
      while (i < attrLen) {
        if (obj[i].key && obj[i].value) {
          str += `${obj[i].key}=${obj[i].value} `
        }
        i += 1
      }
    }
    return str
  }

  const titlePreIcn = fieldData.titlePreIcn ? `<img data-dev-title-pre-i="${fieldKey}" ${attFunction('title-pre-i')} classname="${fieldKey}-title-pre-i ${getCustomClsName(fieldKey, 'title-pre-i')}"  src="${fieldData.titlePreIcn}" alt="Title Leading Icon" />` : ''
  const titleSufIcn = fieldData.titleSufIcn ? `<img data-dev-title-suf-i="${fieldKey}" ${attFunction('title-suf-i')} classname="${fieldKey}-title-suf-i ${getCustomClsName(fieldKey, 'title-suf-i')}" src="${fieldData.titleSufIcn}" alt="Title Trailing Icon" />` : ''
  const subTitlPreIcn = fieldData.subTitlPreIcn ? `<img data-dev-sub-titl-pre-i="${fieldKey}" ${attFunction('sub-titl-pre-i')} classname="${fieldKey}-sub-titl-pre-i ${getCustomClsName(fieldKey, 'sub-titl-pre-i')}" src="${fieldData.subTitlPreIcn}" alt="Subtitle Leading Icon" />` : ''
  const subTitlSufIcn = fieldData.subTitlSufIcn ? `<img data-dev-sub-titl-suf-i="${fieldKey}" ${attFunction('sub-titl-suf-i')} classname="${fieldKey}-sub-titl-suf-i ${getCustomClsName(fieldKey, 'sub-titl-suf-i')}" src="${fieldData.subTitlSufIcn}" alt="Subtitle Trailing Icon" />` : ''

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div
        data-dev-fld-wrp={fieldKey}
        {...getCustomAttributes(fieldKey, 'fld-wrp')}
        className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''} ${getCustomClsName(fieldKey, 'fld-wrp')}`}
      >
        {logo
          && (
            <img
              data-dev-logo={fieldKey}
              className={`${fieldKey}-logo ${getCustomClsName(fieldKey, 'logo')}`}
              src={logo}
              alt="img"
              {...getCustomAttributes(fieldKey, 'logo')}
            />
          )}
        <div
          data-dev-titl-wrp={fieldKey}
          className={`${fieldKey}-titl-wrp ${getCustomClsName(fieldKey, 'titl-wrp')}`}
          {...getCustomAttributes(fieldKey, 'titl-wrp')}
        >
          {!titleHide && titleGenerator(titleTag, title, 'title', titlePreIcn, titleSufIcn)}
          {!subtitleHide && titleGenerator(subTitleTag, subtitle, 'sub-titl', subTitlPreIcn, subTitlSufIcn)}
        </div>
      </div>
    </>
  )
}

export default TitleField
