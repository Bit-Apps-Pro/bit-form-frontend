import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { isLabelOverrideStyles } from '../style-new/styleHelpers'
import NavBtn from './NavBtn'

export default function ElementConfiguration({ fldKey }) {
  const styles = useRecoilValue($styles)
  const { formType, formID } = useParams()
  const history = useHistory()

  const fields = useRecoilValue($fields)
  const fieldObj = fields[fldKey]

  const selectedFieldKey = useRecoilValue($selectedFieldId)

  const styleHandler = (route) => {
    history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  return (
    <>
      {fieldObj.lbl
        && (
          <>
            <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`} subRoute={fldKey} route="label-subtitle-container" label="Label Container" offset="2.5" highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'label-subtitle-container')} />
            {!(fieldObj.lblPreIcn || fieldObj.lblSufIcn) && (
              <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[1]}`} subRoute={fldKey} route="label" label="Label" offset="2.5" highlightSelector={`[data-dev-lbl="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'label')} />
            )}
            {(fieldObj.lblPreIcn || fieldObj.lblSufIcn) && (
              <LayerAccordion childrenAccodin onClick={() => styleHandler('label')} offset="3.1" title="Label" fldData={fieldObj} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.lblPreIcn || fieldObj.lblSufIcn)} styleOverride={isLabelOverrideStyles(styles, fldKey, 'label')}>
                {fieldObj.lblPreIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.lblPreIcn[0]}`} subRoute={fldKey} route="lbl-pre-i" label="Prefix Icon" offset="3.3" highlightSelector={`[data-dev-lbl-pre-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl-pre-i')} />
                )}
                {fieldObj.lblSufIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.lblSufIcn[0]}`} subRoute={fldKey} route="lbl-suf-i" label="Suffix Icon" offset="3.3" highlightSelector={`[data-dev-lbl-suf-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'lbl-suf-i')} />
                )}
              </LayerAccordion>
            )}
          </>
        )}
      {fieldObj.typ.match(/^(text|number|password|username|email|url|date|datetime-local|time|month|week|color|textarea|)$/)
        && (
          <>
            {!(fieldObj.prefixIcn || fieldObj.suffixIcn) && (
              <NavBtn cssSelector={`.${fldKey}-${styleClasses.fld[0]}`} subRoute={fldKey} route="fld" label="Input" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'fld')} />
            )}
            {(fieldObj.prefixIcn || fieldObj.suffixIcn) && (
              <LayerAccordion childrenAccodin onClick={() => styleHandler('fld')} offset="3.1" title="Input" fldData={fieldObj} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.prefixIcn || fieldObj.suffixIcn)} styleOverride={isLabelOverrideStyles(styles, fldKey, 'fld')}>
                {fieldObj.prefixIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.prefixIcn[0]}`} subRoute={fldKey} route="pre-i" label="Prefix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'pre-i')} />
                )}
                {fieldObj.suffixIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.suffixIcn[0]}`} subRoute={fldKey} route="suf-i" label="Suffix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'suf-i')} />
                )}
              </LayerAccordion>
            )}
          </>
        )}
      {fieldObj.subtitle
        && (
          <>
            {!(fieldObj.subTlePreIcn || fieldObj.subTleSufIcn) && (
              <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTitl[0]}`} subRoute={fldKey} route="subtitle" label="Subtitle" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'subtitle')} />
            )}
            {(fieldObj.subTlePreIcn || fieldObj.subTleSufIcn) && (
              <LayerAccordion childrenAccodin onClick={() => styleHandler('subtitle')} offset="3.1" title="Subtitle" fldData={fieldObj} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.subTlePreIcn || fieldObj.subTleSufIcn)} styleOverride={isLabelOverrideStyles(styles, fldKey, 'subtitle')}>
                {fieldObj.subTlePreIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTlePreIcn[0]}`} subRoute={fldKey} route="sub-titl-pre-i" label="Prefix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl-pre-i')} />
                )}
                {fieldObj.subTleSufIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTleSufIcn[0]}`} subRoute={fldKey} route="sub-titl-suf-i" label="Suffix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'sub-titl-suf-i')} />
                )}
              </LayerAccordion>
            )}
          </>
        )}

      {fieldObj.helperTxt
        && (
          <>
            {!(fieldObj.hlpPreIcn || fieldObj.hlpSufIcn) && (
              <NavBtn cssSelector={`.${fldKey}-${styleClasses.hepTxt[0]}`} subRoute={fldKey} route="helper-text" label="Helper Text" offset="2.5" highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'helper-text')} />
            )}
            {(fieldObj.hlpPreIcn || fieldObj.hlpSufIcn) && (
              <LayerAccordion childrenAccodin onClick={() => styleHandler('helper-text')} offset="3.1" title="Helper Text" fldData={fieldObj} key={fldKey} open={fldKey === selectedFieldKey && (fieldObj.hlpPreIcn || fieldObj.hlpSufIcn)} styleOverride={isLabelOverrideStyles(styles, fldKey, 'helper-text')}>
                {fieldObj.hlpPreIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.hlpPreIcn[0]}`} subRoute={fldKey} route="hlp-txt-pre-i" label="Prefix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-pre-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt-pre-i')} />
                )}
                {fieldObj.hlpSufIcn && (
                  <NavBtn cssSelector={`.${fldKey}-${styleClasses.hlpSufIcn[0]}`} subRoute={fldKey} route="hlp-txt-suf-i" label="Suffix Icon" offset="3.3" highlightSelector={`[data-dev-sub-titl-suf-i="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'hlp-txt-suf-i')} />
                )}
              </LayerAccordion>
            )}
          </>
        )}
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
  fld: ['fld'],
  hepTxt: ['hlp-txt'],
  hlpPreIcn: ['hlp-txt-pre-i'],
  hlpSufIcn: ['hlp-txt-suf-i'],
  prefixIcn: ['pre-i'],
  suffixIcn: ['suf-i'],
}
