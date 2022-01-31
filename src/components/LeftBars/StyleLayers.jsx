import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import TweaksIcn from '../../Icons/TweaksIcn'
import ut from '../../styles/2.utilities'
import fieldTypes from '../../Utils/StaticData/fieldTypes'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { isFieldOverrideStyles, isLabelOverrideStyles } from '../style-new/styleHelpers'
import ElementConfiguration from './ElementConfiguration'
import NavBtn from './NavBtn'

export default function StyleLayers() {
  const { css } = useFela()
  const styles = useRecoilValue($styles)
  const fields = useRecoilValue($fields)
  const history = useHistory()
  const { formID, formType } = useParams()
  const activeFields = Object.entries(fields).filter(([, fld]) => !fld.hidden)
  const showFldTitle = (typ) => fieldTypes[typ] || typ
  const selectedFieldKey = useRecoilValue($selectedFieldId)

  const styleHandler = (route, fldKey) => {
    history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
  }
  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Elements & Layers</h4>
      <div className={css(s.divider)} />
      <Scrollbars style={{ height: 'calc(100% - 120px)' }} autoHide>
        <div className={css(s.scrollDiv)}>
          <h5 className={css(s.subtitle, ut.mt1, ut.fontH)}>Common Elements</h5>
          <NavBtn route="quick-tweaks" label={<span className={css({ fw: 500 })}>Theme Quick Tweaks</span>} icn={<TweaksIcn size={13} />} />
          <NavBtn route="form-wrapper" label="Form Wrapper" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="form-container" label="Form Container" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="field-container" label="Field Containers" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="label-container" label="Label Containers" offset="3" highlightSelector="[data-dev-lbl-wrp]" />
          <NavBtn route="label" label="Labels" offset="3" highlightSelector="[data-dev-lbl]" />
          <NavBtn route="subtitle" label="Sub Title" offset="3" highlightSelector="[data-dev-sub-titl]" />
          <NavBtn route="helper-text" label="Helper Texts" offset="3" highlightSelector="[data-dev-hlp-txt]" />
          <NavBtn route="error-messages" label="Error Messages" offset="3" highlightSelector="[data-dev-err-msg]" />

          <h5 className={css(s.subtitle, ut.fontH, { mt: 12 })}>Individual Elements</h5>
          {activeFields.map(([fldKey, fldData]) => (
            <LayerAccordion onClick={() => styleHandler('quick-tweaks', fldKey)} title={showFldTitle(fldData.typ)} fldData={fldData} tag={fldKey} key={fldKey} open={fldKey === selectedFieldKey} highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} styleOverride={isFieldOverrideStyles(styles, fldKey)}>
              <NavBtn subRoute={fldKey} route="quick-tweaks" label="Quick Tweaks" offset="2.5" highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="field-container" label="Field Container" offset="2.5" highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'field-container')} />
              <ElementConfiguration fldKey={fldKey} />
              {!fldData.typ.match(/^(button|)$/) && (
                <NavBtn subRoute={fldKey} route="error-message" label="Error Message" offset="2.5" highlightSelector={`[data-dev-err-msg="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'error-message')} />
              )}
            </LayerAccordion>
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}

const s = {
  con: {
    ff: 'Roboto, sans-serif',
    mxw: 250,
    h: '100%',
    bs: '0 0 0 1px var(--b-44-87)',
    ow: 'hidden',
    '& .toggle-icn': { oy: '0' },
    ':hover': { '& .toggle-icn': { oy: '1' } },
  },
  title: {
    ff: '"Montserrat", sans-serif',
    mt: 7,
    bs: 'none',
    mb: 10,
    mx: 8,
    wb: 'keep-all',
    ws: 'nowrap',
  },
  subtitle: {
    mx: 8,
    mb: 8,
    fs: 14,
    fw: 500,
    cr: '#9a9fb9',
    wb: 'keep-all',
    ws: 'nowrap',
  },

  scrollDiv: { ow: 'hidden' },
  divider: { bb: '1px solid var(--white-0-83)' },
}
