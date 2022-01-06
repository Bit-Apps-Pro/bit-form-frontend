import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates'
import NavBtn from './NavBtn'

export default function ElementConfiguration({ fldType, fldKey }) {
  const fields = useRecoilValue($fields)
  const fieldObj = fields[fldKey]
  const styleClasses = {
    lbl: ['lbl', 'lbl-wrp'],
    subTitl: ['sub-titl'],
    hepTxt: ['hlp-txt'],
  }


  return (
    <>
      {fieldObj.lbl
        && (
          <>
            <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[0]}`} subRoute={fldKey} route="label-subtitle-container" label="Label Container" offset="2.5" highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`} />
            <NavBtn cssSelector={`.${fldKey}-${styleClasses.lbl[1]}`} subRoute={fldKey} route="label" label="Label" offset="2.5" highlightSelector={`[data-dev-lbl="${fldKey}"]`} />
          </>
        )}
      {fieldObj.subtitle
        && <NavBtn cssSelector={`.${fldKey}-${styleClasses.subTitl[0]}`} subRoute={fldKey} route="subtitle" label="Subtitle" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} />}

      {fieldObj.helperTxt
        && <NavBtn cssSelector={`.${fldKey}-${styleClasses.hepTxt[0]}`} subRoute={fldKey} route="helper-text" label="Helper Text" offset="2.5" highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`} />}
    </>
  )
}
