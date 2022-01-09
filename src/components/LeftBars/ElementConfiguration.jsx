import { useRecoilValue } from 'recoil'
import { useHistory, useParams } from 'react-router-dom'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import fieldTypes from '../../Utils/StaticData/fieldTypes'

import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import NavBtn from './NavBtn'

export default function ElementConfiguration({ fldData, fldKey }) {
  const { formType, formID } = useParams()
  const history = useHistory()

  const fields = useRecoilValue($fields)
  const fieldObj = fields[fldKey]

  const selectedFieldKey = useRecoilValue($selectedFieldId)

  const showFldTitle = (typ) => fieldTypes[typ] || typ
  console.log('fldData', fldData)

  const styleHandler = (route) => {
    history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  console.log(fieldObj)
  return (
    <>
      {fieldObj.lbl
        && (
          <>
            <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`} subRoute={fldKey} route="label-subtitle-container" label="Label Container" offset="2.5" highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`} />
            <LayerAccordion onClick={() => styleHandler('label')} offset="10" title="Label" fldData={fldData} tag={fldKey} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.lblPreIcn || fieldObj.lblSufIcn)}>
              {fieldObj.lblPreIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`} subRoute={fldKey} route="lbl-pre-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-lbl-pre-i="${fldKey}"]`} />
              )}
              {fieldObj.lblSufIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`} subRoute={fldKey} route="lbl-suf-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-lbl-suf-i="${fldKey}"]`} />
              )}
            </LayerAccordion>
            {/* <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[1]}`} subRoute={fldKey} route="label" label="Label" offset="3.5" highlightSelector={`[data-dev-lbl="${fldKey}"]`} /> */}
          </>
        )}
      {fieldObj.subtitle
        && (
          <>
            <LayerAccordion onClick={() => styleHandler('subtitle')} offset="10" title="Subtitle" fldData={fldData} tag={fldKey} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.subTlePreIcn || fieldObj.subTleSufIcn)}>
              {fieldObj.subTlePreIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTlePreIcn[0]}`} subRoute={fldKey} route="sub-titl-pre-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`} />
              )}
              {fieldObj.subTleSufIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTleSufIcn[0]}`} subRoute={fldKey} route="sub-titl-suf-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`} />
              )}
            </LayerAccordion>
            {/* < NavBtn cssSelector={`.${fldKey}-${styleClasses.subTitl[0]}`} subRoute={fldKey} route="subtitle" label="Subtitle" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} />} */}
          </>
        )}

      {fieldObj.helperTxt
        && (
          <>
            <LayerAccordion onClick={() => styleHandler('helper-text')} offset="10" title="Helper Text" fldData={fldData} tag={fldKey} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.hlpPreIcn || fieldObj.hlpSufIcn)}>
              {fieldObj.subTlePreIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.hlpPreIcn[0]}`} subRoute={fldKey} route="hlp-txt-pre-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`} />
              )}
              {fieldObj.subTleSufIcn && (
                <NavBtn cssSelector={`.${fldKey}-${styleClasses.hlpSufIcn[0]}`} subRoute={fldKey} route="hlp-txt-suf-icn" label="Label prefix Icon" offset="3.5" highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`} />
              )}
            </LayerAccordion>
          </>
        )}
      {/* && <NavBtn cssSelector={`.${fldKey}-${styleClasses.hepTxt[0]}`} subRoute={fldKey} route="helper-text" label="Helper Text" offset="2.5" highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`} />} */}
    </>
  )
}
const styleClasses = {
  lbl: ['lbl', 'lbl-wrp'],
  lblPreIcn: ['lbl-pre-i'],
  lblSufIcn: ['lbl-suf-i'],
  subTitl: ['sub-titl'],
  subTlePreIcn: ['sub-titl-pre-i'],
  subTleSufIcn: ['sub-titl-suf-i'],
  hepTxt: ['hlp-txt'],
  hlpPreIcn: ['hlp-txt-pre-i'],
  hlpSufIcn: ['hlp-txt-suf-i'],
  prefixIcn: ['pre-i'],
  suffixIcn: ['suf-i'],
}
