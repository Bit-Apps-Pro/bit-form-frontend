import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link, Switch, useRouteMatch, Route, NavLink, useParams } from 'react-router-dom'
import TextFieldSettings from './TextFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import SelectSettings from './SelectSettings'
import FileUpSettings from './FileUpSettings'
import SubmitBtnSettings from './SubmitBtnSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'
import StyleEditor from './StyleCustomize/StyleEditor'
import styleEditorConfig from './StyleCustomize/StyleEditorConfig'
import ImageIcn from '../../Icons/ImageIcn'
import FormIcn from '../../Icons/FormIcn'
import ItemBlockIcn from '../../Icons/ItemBlockIcn'
import FieldIcn from '../../Icons/FieldIcn'

function CompSettings({ fields, elm, updateData, setElementSetting, setSubmitConfig, style, styleDispatch, brkPoint, setResponsiveView, formID }) {
  const { path } = useRouteMatch()
  const { formType } = useParams()

  const TabLink = ({ title, sub, icn, link }) => (
    <NavLink to={`/form/builder/${formType}/${formID}/${link}`} activeClassName="s-t-l-active" className="btcd-s-tab-link active flx w-5 ">
      <span className={`btcd-icn icn-${icn} mr-2`} />
      <div className="d-in-b">
        <div className="title">{title}</div>
        <div className="sub">{sub}</div>
      </div>
    </NavLink>
  )

  return (
    <div className="elm-settings">
      <div className="flx mr-2">
        <TabLink title="Field" sub="Settings" icn="settings" link="fs" />
        <TabLink title="Style" sub="Customize" icn="settings" link="style" />
      </div>
      <div className="btcd-hr" />
      <div className="settings">
        <Scrollbars autoHide>
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
            <Route path={`${path}/style/fl`}>
              <StyleEditor editorLabel="Field Style" title="Label Style" compStyle={style} cls={`.fld-lbl-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field_label} formID={formID} />
              <StyleEditor title="Field Style" noBack compStyle={style} cls={`input.fld-${formID},textarea.fld-${formID}`} styleDispatch={styleDispatch} brkPoint={brkPoint} setResponsiveView={setResponsiveView} styleConfig={styleEditorConfig.field} formID={formID} />
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
                {`${sub}${title && title.split(' ').join('_')}`}
              </small>
            )}
          </div>
        </div>
        <span className="btcd-icn icn-chevron-right btc-icn-md" />
      </div>
    </div>
  )
}
