import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link, Switch, useRouteMatch, Route, NavLink, useParams, useLocation } from 'react-router-dom'
import TextFieldSettings from './TextFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import SelectSettings from './SelectSettings'
import FileUpSettings from './FileUpSettings'
import SubmitBtnSettings from './SubmitBtnSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'
import FormStyle from './StyleCustomize/FormStyle'

function CompSettings({ fields, elm, updateData, setElementSetting, setSubmitConfig, style, setStyle }) {
  const { url, path } = useRouteMatch()
  const { formType, formID } = useParams()

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
              {/* <Link to="style/bg-s">
                <FieldOptionBtn icn="settigns" title="Background Customize" />
              </Link> */}

              <Link to={`/form/builder/${formType}/${formID}/style/f`}>
                <FieldOptionBtn icn="settigns" title="Form Customize" />
              </Link>
              <Link to={`/form/builder/${formType}/${formID}/style/fl`}>
                <FieldOptionBtn icn="settigns" title="Field Customize" />
              </Link>
            </Route>
            <Route path={`${path}/style/f`}>
              <FormStyle style={style} setStyle={setStyle} />
            </Route>
            <Route path={`${path}/style/fl`}>
              firldASDF ASDF ASDFASDFASDF
            </Route>
          </Switch>
          <div className="mb-50" />
        </Scrollbars>
      </div>
    </div>
  )
}
export default (CompSettings)

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
          <span className="lft-icn mr-2 btcd-icn-lg flx br-50"><span className={`btcd-icn icn-${icn}`} /></span>
          <div>
            <div>{title}</div>
            {sub && (
              <small>
                Key:
                {sub}
              </small>
            )}
          </div>
        </div>
        <span className="btcd-icn icn-chevron-right btc-icn-md" />
      </div>
    </div>
  )
}
