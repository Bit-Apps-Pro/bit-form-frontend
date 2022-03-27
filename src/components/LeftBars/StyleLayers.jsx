import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import TweaksIcn from '../../Icons/TweaksIcn'
import ut from '../../styles/2.utilities'
import { ucFirst } from '../../Utils/Helpers'
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
  const showFldTitle = (typ) => ucFirst(fieldTypes[typ] || typ)
  const selectedFieldKey = useRecoilValue($selectedFieldId)

  const styleHandler = (route, fldKey = null) => {
    if (fldKey) history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${fldKey}`)
    else history.push(`/form/builder/${formType}/${formID}/theme-customize/${route}`)
  }
  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Elements & Layers</h4>
      <div className={css(s.divider)} />
      <Scrollbars style={{ height: 'calc(100% - 120px)' }} autoHide>
        <div className={css(s.scrollDiv)}>
          <h5 className={css(s.subtitle, ut.mt1, ut.fontH)}>Common Elements</h5>
          <NavBtn route="quick-tweaks" label={<span className={css({ fw: 500 })}>Theme Quick Tweaks</span>} icn={<TweaksIcn size={13} />} />
          <NavBtn route="form-wrappers" label="Form Wrappers" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="form-containers" label="Form Containers" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="field-containers" label="Field Containers" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="label-containers" label="Label Containers" offset="3" highlightSelector="[data-dev-lbl-wrp]" />

          <LayerAccordion childrenAccodin onClick={() => styleHandler('label')} offset="6" title="Label" highlightSelector="[data-dev-lbl]">
            <NavBtn route="lbl-pre-i" label="Prefix Icon" offset="3.5" highlightSelector="[data-dev-lbl-pre-i]" />
            <NavBtn route="lbl-suf-i" label="Suffix Icon" offset="3.5" highlightSelector="[data-dev-lbl-suf-i]" />
          </LayerAccordion>

          <LayerAccordion childrenAccodin onClick={() => styleHandler('subtitle')} offset="6" title="Sub Title" highlightSelector="[data-dev-sub-titl]">
            <NavBtn route="sub-titl-pre-i" label="Prefix Icon" offset="3.5" highlightSelector="[data-dev-sub-titl-pre-i]" />
            <NavBtn route="sub-titl-suf-i" label="Suffix Icon" offset="3.5" highlightSelector="[data-dev-sub-titl-suf-i]" />
          </LayerAccordion>

          <LayerAccordion childrenAccodin onClick={() => styleHandler('pre-i')} offset="6" title="Input" highlightSelector="[data-dev-sub-titl]">
            <NavBtn route="pre-i" label="Prefix Icon" offset="3.5" highlightSelector="[data-dev-pre-i]" />
            <NavBtn route="suf-i" label="Suffix Icon" offset="3.5" highlightSelector="[data-dev-suf-i]" />
          </LayerAccordion>

          <LayerAccordion childrenAccodin onClick={() => styleHandler('helper-text')} offset="6" title="Helper Texts" highlightSelector="[data-dev-hlp-txt]">
            <NavBtn route="hlp-txt-pre-i" label="Prefix Icon" offset="3.5" highlightSelector="[data-dev-hlp-txt-pre-i]" />
            <NavBtn route="hlp-txt-suf-i" label="Suffix Icon" offset="3.5" highlightSelector="[data-dev-hlp-txt-suf-i]" />
          </LayerAccordion>

          <LayerAccordion childrenAccodin onClick={() => styleHandler('error-messages')} offset="6" title="Error Messages" highlightSelector="[data-dev-err-msg]">
            <NavBtn route="err-txt-pre-i" label="Prefix Icon" offset="3.5" highlightSelector="[data-dev-err-txt-pre-i]" />
            <NavBtn route="err-txt-suf-i" label="Suffix Icon" offset="3.5" highlightSelector="[data-dev-err-txt-suf-i]" />
          </LayerAccordion>

          <h5 className={css(s.subtitle, ut.fontH, { mt: 12 })}>Individual Elements</h5>

          {activeFields.map(([fldKey, fldData]) => (
            <LayerAccordion onClick={() => styleHandler('quick-tweaks', fldKey)} title={showFldTitle(fldData.typ)} fldData={fldData} tag={fldKey} key={fldKey} open={fldKey === selectedFieldKey} highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} styleOverride={isFieldOverrideStyles(styles, fldKey)}>
              {!fldData.typ.match(/^(title|image|html)$/gi) && (<NavBtn subRoute={fldKey} route="quick-tweaks" label="Quick Tweaks" offset="2.5" highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} />)}
              <NavBtn subRoute={fldKey} route="field-container" label="Field Container" offset="2.5" highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} styleOverride={isLabelOverrideStyles(styles, fldKey, 'field-container')} />
              <ElementConfiguration fldKey={fldKey} />
              {fldData.typ.match(/^(check|radio|decision-box)/gi) && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="check-container"
                    label="Check Container"
                    offset="2.5"
                    highlightSelector={`[data-dev-cc="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'check-container')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="option-label"
                    label="Option Label"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-lbl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'option-label')}
                  />
                </>
              )}

              {fldData.typ.match(/(check|decision-box)/gi) && (
                <NavBtn
                  subRoute={fldKey}
                  route="check-box"
                  label="Check Box"
                  offset="2.5"
                  highlightSelector={`[data-dev-ck="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'check-box')}
                />
              )}
              {fldData.typ.match(/^(check|radio)$/gi) && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="check-wrapper"
                    label="Check Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-cw="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'check-wrapper')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="option-wrapper"
                    label="Option Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-cl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'option-wrapper')}
                  />

                  {fldData.typ === 'radio' && (
                    <NavBtn
                      subRoute={fldKey}
                      route="radio-box"
                      label="Radio Box"
                      offset="2.5"
                      highlightSelector={`[data-dev-rdo="${fldKey}"]`}
                      styleOverride={isLabelOverrideStyles(styles, fldKey, 'radio-box')}
                    />
                  )}
                </>
              )}

              {fldData.typ === 'razorpay' && (
                <NavBtn
                  subRoute={fldKey}
                  route="razorpay-btn"
                  label="Razorpay Button"
                  offset="2.5"
                  highlightSelector={`[data-dev-razorpay-btn="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'razorpay-btn')}
                />
              )}

              {fldData.typ === 'currency' && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="currency-fld-wrp"
                    label="Currency Field Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-crncy-fld-wrp="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'currency-fld-wrp')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-currency-img"
                    label="Selected Currency Image"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-crncy-img="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'selected-currency-img')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="input-clear-btn"
                    label="Input Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-input-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'input-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-input"
                    label="Option Search Input"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-input="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-input')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-icn"
                    label="Option Search Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="search-clear-btn"
                    label="Search Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-search-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'search-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="currency-option"
                    label="Currency Option"
                    offset="2.5"
                    highlightSelector={`[data-dev-currency-option="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'currency-option')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="currency-option-icn"
                    label="Currency Option Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-currency-option-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'currency-option-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="currency-option-lbl"
                    label="Currency Option Label"
                    offset="2.5"
                    highlightSelector={`[data-dev-currency-option-lbl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'currency-option-lbl')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="currency-option-suf"
                    label="Currency Option Suffix"
                    offset="2.5"
                    highlightSelector={`[data-dev-currency-option-suf="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'currency-option-suf')}
                  />
                </>
              )}
              {fldData.typ === 'phone-number' && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="phone-fld-wrp"
                    label="Phone Field Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-phone-fld-wrp="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-fld-wrp')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-country-img"
                    label="Selected Country Image"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-phone-img="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-selected-country-img')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="input-clear-btn"
                    label="Input Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-input-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-input-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-input"
                    label="Option Search Input"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-input="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-opt-search-input')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-icn"
                    label="Option Search Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-opt-search-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="search-clear-btn"
                    label="Search Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-search-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-search-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="phone-option"
                    label="Phone Option"
                    offset="2.5"
                    highlightSelector={`[data-dev-phone-option="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-option')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="phone-option-icn"
                    label="Phone Option Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-phone-option-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-option-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="phone-option-lbl"
                    label="Phone Option Label"
                    offset="2.5"
                    highlightSelector={`[data-dev-phone-option-lbl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-option-lbl')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="phone-option-prefix"
                    label="Phone Option Prefix"
                    offset="2.5"
                    highlightSelector={`[data-dev-phone-option-pre="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'phone-option-prefix')}
                  />
                </>
              )}
              {fldData.typ === 'country' && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="country-fld-wrp"
                    label="Country Field Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-country-fld-wrp="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'country-fld-wrp')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-country-img"
                    label="Selected Country Image"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-country-img="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'selected-country-img')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-country-clear-btn"
                    label="Input Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-country-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'selected-country-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-input"
                    label="Option Search Input"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-input="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-input')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-icn"
                    label="Option Search Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="search-clear-btn"
                    label="Search Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-search-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'search-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="option"
                    label="Country Option"
                    offset="2.5"
                    highlightSelector={`[data-dev-option="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'option')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-icn"
                    label="Country Option Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-lbl"
                    label="Country Option Label"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-lbl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-lbl')}
                  />
                </>
              )}
              {fldData.typ === 'select' && (
                <>
                  <NavBtn
                    subRoute={fldKey}
                    route="dpd-fld-wrp"
                    label="Dropdown Field Wrapper"
                    offset="2.5"
                    highlightSelector={`[data-dev-dpd-fld-wrp="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'dpd-fld-wrp')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-opt-img"
                    label="Selected Option Image"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-opt-img="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'selected-opt-img')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="selected-opt-clear-btn"
                    label="Input Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-selected-opt-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'selected-opt-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-input"
                    label="Option Search Input"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-input="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-input')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-search-icn"
                    label="Option Search Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-search-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-search-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="search-clear-btn"
                    label="Search Clear Button"
                    offset="2.5"
                    highlightSelector={`[data-dev-search-clear-btn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'search-clear-btn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="option"
                    label="Option"
                    offset="2.5"
                    highlightSelector={`[data-dev-option="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'option')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-icn"
                    label="Option Icon"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-icn="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-icn')}
                  />
                  <NavBtn
                    subRoute={fldKey}
                    route="opt-lbl"
                    label="Option Label"
                    offset="2.5"
                    highlightSelector={`[data-dev-opt-lbl="${fldKey}"]`}
                    styleOverride={isLabelOverrideStyles(styles, fldKey, 'opt-lbl')}
                  />
                </>
              )}
              {!fldData.typ.match(/^(button|divider|title|image|check|html|razorpay)$/) && (
                <NavBtn
                  subRoute={fldKey}
                  route="error-message"
                  label="Error Message"
                  offset="2.5"
                  highlightSelector={`[data-dev-err-msg="${fldKey}"]`}
                  styleOverride={isLabelOverrideStyles(styles, fldKey, 'error-message')}
                />
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
