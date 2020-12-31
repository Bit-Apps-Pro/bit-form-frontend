import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link, NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import BrushIcn from '../../Icons/BrushIcn'
import FieldIcn from '../../Icons/FieldIcn'
import FormIcn from '../../Icons/FormIcn'
import ImageIcn from '../../Icons/ImageIcn'
import ItemBlockIcn from '../../Icons/ItemBlockIcn'
import FileUpSettings from './FileUpSettings'
import PaypalSettings from './PaypalSettings'
import RadioCheckSettings from './RadioCheckSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'
import SelectSettings from './SelectSettings'
import DropdownStyleEditors from './StyleCustomize/DropdownStyleEditors'
import PaypalStyleEditor from './StyleCustomize/PaypalStyleEditor'
import StyleEditor from './StyleCustomize/StyleEditor'
import styleEditorConfig from './StyleCustomize/StyleEditorConfig'
import SubmitBtnSettings from './SubmitBtnSettings'
import TextFieldSettings from './TextFieldSettings'

function CompSettings({ fields, elm, updateData, setElementSetting, setSubmitConfig, style, styleDispatch, brkPoint, setResponsiveView, formID, lay, setLay }) {
  const { path } = useRouteMatch()
  const { formType } = useParams()
  const [scrollTopShadow, setScrollTopShadow] = useState(false)

  const TabLink = ({ title, sub, icn, link }) => (
    <NavLink to={`/form/builder/${formType}/${formID}/${link}`} activeClassName="s-t-l-active" className="btcd-s-tab-link active flx w-5 ">
      {typeof icn === 'string' ? <span className={`btcd-icn icn-${icn} mr-2`} /> : icn}
      <div className="d-in-b">
        <div className="title">{title}</div>
        <div className="sub">{sub}</div>
      </div>
    </NavLink>
  )

  const onSettingScroll = ({ target: { scrollTop } }) => {
    if (scrollTop > 20) {
      setScrollTopShadow(true)
    } else {
      setScrollTopShadow(false)
    }
  }

  return (
    <div className="elm-settings">
      <div className="flx" style={{ ...scrollTopShadow && { boxShadow: '0 0px 16px 2px #b0b7d8' } }}>
        <TabLink title="Field" sub="Settings" icn="settings" link="fs" />
        <TabLink title="Style" sub="Customize" icn={<BrushIcn style={{ height: 20, width: 20, marginRight: 8 }} />} link="style" />
      </div>
      <div className="btcd-hr" />
      <div className="settings">
        <Scrollbars onScroll={onSettingScroll} autoHide>
          <Switch>
            <Route path={`${path}/fs`}>
              <RenderSettings
                type={elm.data.typ}
                fields={fields}
                elm={elm}
                updateData={updateData}
                setElementSetting={setElementSetting}
                setSubmitConfig={setSubmitConfig}
              />
            </Route>
            <Route exact path={`${path}/style`}>
              <Link to={`/form/builder/${formType}/${formID}/style/bg`}>
                <FieldOptionBtn icn={<ImageIcn />} title="Background Customize" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/f`}>
                <FieldOptionBtn icn={<FormIcn />} title="Form Customize" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fb`}>
                <FieldOptionBtn icn={<ItemBlockIcn />} title="Field Block Customize" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl`}>
                <FieldOptionBtn icn={<FieldIcn />} title="Field Customize" />
              </Link>
            </Route>
            <Route path={`${path}/style/bg`}>
              <StyleEditor editorLabel="Form Background" compStyle={style} cls={`._frm-bg-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.formbg} formID={formID} />
            </Route>
            <Route path={`${path}/style/f`}>
              <StyleEditor editorLabel="Form style" compStyle={style} cls={`._frm-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.form} formID={formID} />
            </Route>
            <Route path={`${path}/style/fb`}>
              <StyleEditor editorLabel="Field Block" compStyle={style} cls={`.fld-wrp-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_block} formID={formID} />
            </Route>
            <Route exact path={`${path}/style/fl`}>
              <Link to={`/form/builder/${formType}/${formID}/style`}>
                <h4 className="w-9 mt-2 m-a flx txt-dp">
                  <button className="icn-btn" type="button" aria-label="back btn"><span className="btcd-icn icn-arrow_back" /></button>
                  <div className="flx w-10">
                    <span>Back</span>
                    <div className="txt-center w-10 f-5">Field Customize</div>
                  </div>
                </h4>
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/fld`}>
                <FieldOptionBtn icn={<FieldIcn />} title="Field Style" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/dpd`}>
                <FieldOptionBtn icn={<FieldIcn />} title="Dropdown Style" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl/ppl`}>
                <FieldOptionBtn icn={<FieldIcn />} title="Paypal Style" />
              </Link>
            </Route>
            <Route path={`${path}/style/fl/fld`}>
              <StyleEditor editorLabel="Field Style" title="Label Style" compStyle={style} cls={`.fld-lbl-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_label} formID={formID} />
              <StyleEditor title="Field Style" noBack compStyle={style} cls={`input.fld-${formID},textarea.fld-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field} formID={formID} />
            </Route>
            <Route path={`${path}/style/fl/ppl`}>
              <PaypalStyleEditor elm={elm} setElementSetting={setElementSetting} updateData={updateData} lay={lay} setLay={setLay} fields={fields} />
            </Route>
            <Route path={`${path}/style/fl/dpd`}>
              <DropdownStyleEditors
                editorLabel="Dropdown Style"
                {...{ style, styleDispatch, brkPoint, setResponsiveView, styleEditorConfig, formID }}
              />
            </Route>
          </Switch>
          <div className="mb-50" />
        </Scrollbars>
      </div>
    </div>
  )
}
export default CompSettings

const RenderSettings = ({ type, fields, elm, updateData, setElementSetting, setSubmitConfig }) => {
  if ((fields !== null && fields[elm.id] !== undefined) || type === 'submit') {
    switch (type) {
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'url':
      case 'textarea':
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
      case 'color':
        return <TextFieldSettings setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      case 'check':
      case 'radio':
        return <RadioCheckSettings setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      case 'select':
        return <SelectSettings setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      case 'file-up':
        return <FileUpSettings setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      case 'submit':
        return <SubmitBtnSettings setElementSetting={setElementSetting} fields={fields} elm={elm} setSubmitConfig={setSubmitConfig} />
      case 'recaptcha':
        return <ReCaptchaSettigns setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      case 'paypal':
        return <PaypalSettings setElementSetting={setElementSetting} fields={fields} elm={elm} updateData={updateData} />
      default:
        return <FieldList fields={fields} setElementSetting={setElementSetting} />
    }
  }
  return <FieldList fields={fields} setElementSetting={setElementSetting} />
}

function FieldList({ fields, setElementSetting }) {
  const arr = []
  for (const fld in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, fld)) {
      arr.push(
        <FieldOptionBtn key={fld} icn={fields[fld].typ} title={fields[fld].lbl} sub={fld} action={() => setElementSetting({ id: fld, data: fields[fld] })} />,
      )
    }
  }
  return arr
}

function FieldOptionBtn({ icn, title, sub, action }) {
  const extraProps = {}
  if (action !== undefined) {
    extraProps.role = 'button'
    extraProps.tabIndex = 0
    extraProps.onKeyPress = action
    extraProps.onClick = action
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className="btc-s-l mt-2" {...extraProps}>
      <div className="flx flx-between ">
        <div className="flx">
          <span className="lft-icn mr-2 btcd-icn-lg flx br-50">
            {typeof icn === 'object' ? icn : <span className={`btcd-icn icn-${icn}`} />}
          </span>
          <div>
            <div>{title}</div>
            {sub && (
              <small>
                Key:
                {` ${sub}`}
              </small>
            )}
          </div>
        </div>
        <span className="btcd-icn icn-chevron-right btc-icn-md" />
      </div>
    </div>
  )
}
