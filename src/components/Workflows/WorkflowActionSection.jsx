import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import produce from 'immer'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import CheckBox from '../Utilities/CheckBox'
import DropDown from '../Utilities/DropDown'
import MtSelect from '../Utilities/MtSelect'
import ActionBlock from './ActionBlock'
import Button from '../Utilities/Button'
import CloseIcn from '../../Icons/CloseIcn'
import { $bits,
  $confirmations,
  $fieldsArr,
  $integrations,
  $mailTemplates,
  $updateBtn,
  $workflows } from '../../GlobalStates/GlobalStates'

export default function WorkflowActionSection({ lgcGrp, lgcGrpInd, condGrp, condGrpInd }) {
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const mailTem = useRecoilValue($mailTemplates)
  const integrations = useRecoilValue($integrations)
  const confirmations = useRecoilValue($confirmations)
  const fieldsArr = useRecoilValue($fieldsArr)
  const bits = useRecoilValue($bits)
  const { fields: fldActions, success: successActions, failure: validateAction } = condGrp.actions

  const enableAction = (checked, typ) => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      if (checked) {
        if (typ === 'mailNotify') {
          draftSuccessActions.push({ type: typ, details: {} })
        } else if (typ === 'dblOptin') {
          draftSuccessActions.push({ type: typ, details: {} })
        } else {
          draftSuccessActions.push({ type: typ, details: { id: '' } })
        }
      } else {
        for (let i = 0; i < draftSuccessActions.length; i += 1) {
          if (draftSuccessActions[i].type === typ) {
            draftSuccessActions.splice(i, 1)
            break
          }
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }
  const checkKeyInArr = key => successActions?.some(v => v.type === key)

  const preventDelete = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { actions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd]
      actions.avoid_delete = val
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const addAction = () => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { fields: tmpFldActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      let actionVal = 'disable'
      if (draftWorkflow[lgcGrpInd].action_type === 'onsubmit') {
        actionVal = 'value'
      }
      tmpFldActions.push({ field: '', action: actionVal })
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const setWebHooks = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'webHooks') {
          draftSuccessActions[i].details.id = val.map(itm => itm.value)
          break
        }
      }
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const getValueFromArr = (key, subkey) => {
    const value = successActions.find(val => val.type === key)
    if (value !== undefined) {
      return value.details[subkey]
    }
    return ''
  }

  const emailInFormField = () => {
    fieldsArr.map(field => {
      if (field.type === 'email') {
        return true
      }
    })
    return false
  }

  const fileInFormField = () => {
    const file = []
    fieldsArr.map(field => {
      if (field.type === 'file-up') {
        file.push({ label: field.name, value: field.key })
      }
    })
    return file
  }

  const mailOptions = () => {
    const mail = []
    if (emailInFormField()) {
      const flds = []

      fieldsArr.map(fld => {
        if (fld.type === 'email') {
          flds.push({ label: fld.name, value: `\${${fld.key}}` })
        }
      })
      mail.push({ title: 'Form Fields', type: 'group', childs: flds })
    }

    if (bits.userMail && Array.isArray(bits.userMail)) {
      mail.push({ title: 'WP Emails', type: 'group', childs: bits.userMail })
    }
    return mail
  }

  const setEmailSetting = (typ, value) => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (['mailNotify', 'dblOptin'].includes(draftSuccessActions[i].type)) {
          draftSuccessActions[i].details[typ] = value
          break
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const setInteg = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'integ') {
          draftSuccessActions[i].details.id = val.map(itm => itm.value)
          break
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeValidateMsg = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions.failure = val
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const setSuccessMsg = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'successMsg') {
          draftSuccessActions[i].details.id = val
          break
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const setRedirectPage = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'redirectPage') {
          draftSuccessActions[i].details.id = val
          break
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <>
      {/* action section start */}
      <h3 className="txt-dp mt-3 mb-1">
        {lgcGrp.action_behaviour === 'cond' ? 'Then ' : ''}
        Action
      </h3>
      {(lgcGrp.action_type === 'onsubmit' || lgcGrp.action_run === 'delete') && (
        <>
          <div className="mb-2">
            {lgcGrp.action_run !== 'delete'
                && (
                  <TableCheckBox
                    onChange={e => enableAction(e.target.checked, 'successMsg')}
                    className="ml-2 mt-2"
                    title={__('Success Message')}
                    checked={checkKeyInArr('successMsg')}
                  />
                )}
            {!lgcGrp.action_run.match(/^(delete|edit)$/)
                && (
                  <TableCheckBox
                    onChange={e => enableAction(e.target.checked, 'redirectPage')}
                    className="ml-5 mt-2"
                    title={__('Redirect URL')}
                    checked={checkKeyInArr('redirectPage')}
                  />
                )}
            <TableCheckBox
              onChange={e => enableAction(e.target.checked, 'webHooks')}
              className="ml-5 mt-2"
              title={__('Web Hook')}
              checked={checkKeyInArr('webHooks')}
            />
            {lgcGrp.action_run !== 'delete'
                && (
                  <TableCheckBox
                    onChange={e => enableAction(e.target.checked, 'integ')}
                    className="ml-5 mt-2"
                    title={__('Integration')}
                    checked={checkKeyInArr('integ')}
                  />
                )}
          </div>
          <div className="mb-3">
            <TableCheckBox
              onChange={e => enableAction(e.target.checked, 'mailNotify')}
              className="ml-2 mt-2"
              title={__('Email Notification')}
              checked={checkKeyInArr('mailNotify')}
            />
            <TableCheckBox
              onChange={e => enableAction(e.target.checked, 'dblOptin')}
              className="ml-4 mt-2"
              title={__('Double Opt-In')}
              checked={checkKeyInArr('dblOptin')}
            />
          </div>
        </>
      )}
      {lgcGrp.action_run === 'delete' && (
        <CheckBox
          onChange={e => preventDelete(e.target.checked)}
          checked={workflows[lgcGrpInd].avoid_delete}
          title={<small className="txt-dp">Prevent Delete</small>}
        />
      )}
      {(lgcGrp.action_type === 'onsubmit' || lgcGrp.action_run === 'delete') && (
        <>
          {checkKeyInArr('webHooks') && (
            <DropDown
              action={val => setWebHooks(val)}
              jsonValue
              value={getValueFromArr('webHooks', 'id')}
              title={<span className="f-m f-5">{__('Web Hooks')}</span>}
              titleClassName="mt-2 w-7"
              className="w-10"
              isMultiple
              options={confirmations?.type?.webHooks?.map((itm, i) => ({ label: itm.title, value: itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i }) }))}
              placeholder={__('Select Hooks to Call')}
            />
          ) }
          { checkKeyInArr('integ') && (
            <DropDown
              action={val => setInteg(val)}
              jsonValue
              value={getValueFromArr('integ', 'id')}
              title={<span className="f-m f-5">{__('Integrations')}</span>}
              titleClassName="mt-2 w-7"
              className="w-10"
              isMultiple
              options={integrations?.map((itm, i) => ({ label: itm.name, value: itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i }) }))}
              placeholder={__('Select Integation')}
            />
          )}

          {lgcGrp.action_run !== 'delete' && (
            <>
              <div className="mt-2" />
              {checkKeyInArr('successMsg') && (
                <div>
                  <label className="f-m f-5">
                    {__('Success Message:')}
                  </label>
                  <br />
                  <select
                    className="btcd-paper-inp w-7"
                    onChange={e => setSuccessMsg(e.target.value)}
                    value={getValueFromArr('successMsg', 'id')}
                  >
                    <option value="">{__('Select Message')}</option>
                    {confirmations?.type?.successMsg?.map((itm, i) => (
                      <option
                        key={`sm-${i + 2.3}`}
                        value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
                      >
                        {itm.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mt-2" />
              {checkKeyInArr('redirectPage') && (
                <div>
                  <label className="f-m f-5">
                    {__('Redirect URL:')}
                  </label>
                  <br />
                  <select
                    className="btcd-paper-inp w-7"
                    onChange={e => setRedirectPage(e.target.value)}
                    value={getValueFromArr('redirectPage', 'id')}
                  >
                    <option value="">{__('Select Page To Redirect')}</option>
                    {confirmations?.type?.redirectPage?.map((itm, i) => (
                      <option
                        key={`sr-${i + 2.5}`}
                        value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
                      >
                        {itm.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ) }

          <div className="mt-2 ml-2">
            {checkKeyInArr('mailNotify') && (
              <>
                <label className="f-m f-5">
                  {__('Email Notification:')}
                </label>
                <br />
                <select
                  className="btcd-paper-inp w-7 mt-1"
                  onChange={e => setEmailSetting('id', e.target.value)}
                  value={getValueFromArr('mailNotify', 'id')}
                >
                  <option value="">{__('Select Email Template')}</option>
                  {mailTem?.map((itm, i) => (
                    <option
                      key={`sem-${i + 2.3}`}
                      value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
                    >
                      {itm.title}
                    </option>
                  ))}
                </select>
                <DropDown
                  action={val => setEmailSetting('to', val ? val.split(',') : [])}
                  value={getValueFromArr('mailNotify', 'to')}
                  placeholder={__('Add Email Receiver')}
                  title={<span className="f-m f-5">{__('To')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  addable
                  options={mailOptions(getValueFromArr('mailNotify', 'to'))}
                />
                <DropDown
                  action={val => setEmailSetting('from', val)}
                  placeholder={__('Add mail from address')}
                  value={getValueFromArr('mailNotify', 'from')}
                  title={<span className="f-m f-5">{__('From')}</span>}
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  addable
                  options={mailOptions(getValueFromArr('mailNotify', 'from'))}
                />
                <DropDown
                  action={val => setEmailSetting('cc', val ? val.split(',') : [])}
                  value={getValueFromArr('mailNotify', 'cc')}
                  placeholder={__('Add Email CC')}
                  title={<span className="f-m f-5">{__('CC')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  addable
                  options={mailOptions(getValueFromArr('mailNotify', 'cc'))}
                />
                <DropDown
                  action={val => setEmailSetting('bcc', val ? val.split(',') : [])}
                  placeholder={__('Add Email BCC')}
                  value={getValueFromArr('mailNotify', 'bcc')}
                  title={<span className="f-m f-5">{__('BCC')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  addable
                  options={mailOptions(getValueFromArr('mailNotify', 'bcc'))}
                />
                <DropDown
                  action={val => setEmailSetting('replyto', val ? val.split(',') : [])}
                  placeholder={__('Reply To')}
                  value={getValueFromArr('mailNotify', 'replyto')}
                  title={<span className="f-m f-5">{__('Reply To')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  addable
                  options={mailOptions(getValueFromArr('mailNotify', 'replyto'))}
                />
                <DropDown
                  action={val => setEmailSetting('attachment', val ? val.split(',') : [])}
                  placeholder={__('Attachment')}
                  value={getValueFromArr('mailNotify', 'attachment')}
                  title={<span className="f-m f-5">{__('Attachment')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  className="w-10"
                  options={fileInFormField()}
                />
              </>
            )}
          </div>

          <div className="mt-2 ml-2">
            {checkKeyInArr('dblOptin') && (
              <>
                <label className="f-m ">
                  {__('Double optin tamplate:')}
                  <br />
                  <select
                    className="btcd-paper-inp w-7 mt-1"
                    onChange={e => setEmailSetting('id', e.target.value)}
                    value={getValueFromArr('dblOptin', 'id')}
                  >
                    <option value="">{__('Select Email Template')}</option>
                    {mailTem?.map((itm, i) => (
                      <option
                        key={`sem-${i + 2.3}`}
                        value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
                      >
                        {itm.title}
                      </option>
                    ))}
                  </select>
                </label>
                <DropDown
                  action={val => setEmailSetting('to', val ? val.split(',') : [])}
                  value={getValueFromArr('dblOptin', 'to')}
                  placeholder={__('Add Email Receiver')}
                  title={<span className="f-m">{__('To')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  addable
                  options={mailOptions(getValueFromArr('dblOptin', 'to'))}
                />
                <DropDown
                  action={val => setEmailSetting('from', val)}
                  placeholder={__('Add mail from address')}
                  value={getValueFromArr('dblOptin', 'from')}
                  title={<span className="f-m">{__('From')}</span>}
                  titleClassName="w-7 mt-2"
                  addable
                  options={mailOptions(getValueFromArr('dblOptin', 'from'))}
                />
                <DropDown
                  action={val => setEmailSetting('cc', val ? val.split(',') : [])}
                  value={getValueFromArr('dblOptin', 'cc')}
                  placeholder={__('Add Email CC')}
                  title={<span className="f-m">{__('CC')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  addable
                  options={mailOptions(getValueFromArr('dblOptin', 'cc'))}
                />
                <DropDown
                  action={val => setEmailSetting('bcc', val ? val.split(',') : [])}
                  placeholder={__('Add Email BCC')}
                  value={getValueFromArr('dblOptin', 'bcc')}
                  title={<span className="f-m">{__('BCC')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  addable
                  options={mailOptions(getValueFromArr('dblOptin', 'bcc'))}
                />
                <DropDown
                  action={val => setEmailSetting('replyto', val ? val.split(',') : [])}
                  placeholder={__('Reply To')}
                  value={getValueFromArr('dblOptin', 'replyto')}
                  title={<span className="f-m">{__('Reply To')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  addable
                  options={mailOptions(getValueFromArr('dblOptin', 'replyto'))}
                />
                <DropDown
                  action={val => setEmailSetting('attachment', val ? val.split(',') : [])}
                  placeholder={__('Attachment')}
                  value={getValueFromArr('dblOptin', 'attachment')}
                  title={<span className="f-m">{__('Attachment')}</span>}
                  isMultiple
                  titleClassName="w-7 mt-2"
                  options={fileInFormField()}
                />
              </>
            )}
          </div>

          {lgcGrp.action_run !== 'delete' && <div className="mt-2 ml-2"><b className="txt-dp">{__('Set another field value')}</b></div>}
        </>
      )}
      {(lgcGrp.action_type === 'onvalidate' && lgcGrp.action_run !== 'delete') && (
        <MtSelect
          onChange={e => changeValidateMsg(e.target.value)}
          value={validateAction}
          label="Error Message"
          className="w-7 mt-3 ml-2"
        >
          <option value="">{__('Select Message')}</option>
          {confirmations?.type?.successMsg?.map((itm, i) => (
            <option
              key={`vm-${i + 2.7}`}
              value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
            >
              {itm.title}
            </option>
          ))}
        </MtSelect>
      )}
      {(lgcGrp.action_type !== 'onvalidate' && lgcGrp.action_run !== 'delete') && (
        <div className="ml-2 mt-2">
          {fldActions.map((action, actionInd) => (
            <span key={`atn-${actionInd + 22}`}>
              <ActionBlock
                lgcGrpInd={lgcGrpInd}
                condGrpInd={condGrpInd}
                action={action}
                actionInd={actionInd}
                actionType={lgcGrp.action_type}
              />
              {fldActions.length !== actionInd + 1 && (
                <>
                  <div style={{ height: 5 }}>
                    <svg height="60" width="50">
                      <line x1="20" y1="10" x2="20" y2="0" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
                    </svg>
                  </div>
                  <span className="btcd-logic-chip">AND</span>
                  <div style={{ height: 5 }}>
                    <svg height="60" width="50">
                      <line x1="20" y1="10" x2="20" y2="0" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
                    </svg>
                  </div>
                </>
              )}
            </span>
          ))}
          <br />
          <Button
            onClick={() => addAction()}
            icn
            className="blue sh-sm"
          >
            <CloseIcn size="14" className="icn-rotate-45" />

          </Button>
        </div>
      )}
      {/* action section end */}
    </>
  )
}
