import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates'
import NavBtn from './NavBtn'

export default function ElementConfiguration({ fldType, fldKey }) {
  const fields = useRecoilValue($fields)
  const fieldObj = fields[fldKey]

  return (
    <>
      {fieldObj.lbl
        && (
          <>
            <NavBtn subRoute={fldKey} route="label-subtitle-container" label="Label Container" offset="2.5" highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`} />
            <NavBtn subRoute={fldKey} route="label" label="Label" offset="2.5" highlightSelector={`[data-dev-lbl="${fldKey}"]`} />
          </>
        )}
      {fieldObj.subtitle
        && <NavBtn subRoute={fldKey} route="subtitle" label="Subtitle" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} />}

      {fieldObj.helperTxt
        && <NavBtn subRoute={fldKey} route="helper-text" label="Helper Text" offset="2.5" highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`} />}
    </>
  )
}
