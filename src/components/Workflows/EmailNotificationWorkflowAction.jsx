import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import produce from 'immer'
import { useFela } from 'react-fela'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import DropDown from '../Utilities/DropDown'
import { $bits, $fieldsArr, $mailTemplates, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'

export default function EmailNotificationWorkflowAction({ lgcGrpInd,
  condGrpInd,
  actionKey,
  enableAction,
  checkKeyInArr,
  getValueFromArr,
  title }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const mailTem = useRecoilValue($mailTemplates)
  const fieldsArr = useRecoilValue($fieldsArr)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const bits = useRecoilValue($bits)

  const fileInFormField = () => {
    const file = []
    fieldsArr.map(field => {
      if (field.type === 'file-up') {
        file.push({ label: field.name, value: field.key })
      }
    })
    return file
  }

  const emailInFormField = () => {
    fieldsArr.map(field => {
      if (field.type === 'email') {
        return true
      }
    })
    return false
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

  return (
    <div className={css(ut.mt2)}>
      <TableCheckBox
        onChange={e => enableAction(e.target.checked, actionKey)}
        title={title}
        checked={checkKeyInArr(actionKey)}
        className={css(ut.flxc)}
      />
      {checkKeyInArr(actionKey) && (
        <div className={css({ mt: 5, ml: 28 })}>
          <label className="f-m f-5">
            {__('Email Template:')}
          </label>
          <div className="mt-1"></div>
          <select
            className="btcd-paper-inp w-7"
            onChange={e => setEmailSetting('id', e.target.value)}
            value={getValueFromArr(actionKey, 'id')}
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
            value={getValueFromArr(actionKey, 'to')}
            placeholder={__('Add Email Receiver')}
            title={<span className="f-m f-5">{__('To')}</span>}
            isMultiple
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            addable
            options={mailOptions(getValueFromArr(actionKey, 'to'))}
          />
          <DropDown
            action={val => setEmailSetting('from', val)}
            placeholder={__('Add mail from address')}
            value={getValueFromArr(actionKey, 'from')}
            title={<span className="f-m f-5">{__('From')}</span>}
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            addable
            options={mailOptions(getValueFromArr(actionKey, 'from'))}
          />
          <DropDown
            action={val => setEmailSetting('cc', val ? val.split(',') : [])}
            value={getValueFromArr(actionKey, 'cc')}
            placeholder={__('Add Email CC')}
            title={<span className="f-m f-5">{__('CC')}</span>}
            isMultiple
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            addable
            options={mailOptions(getValueFromArr(actionKey, 'cc'))}
          />
          <DropDown
            action={val => setEmailSetting('bcc', val ? val.split(',') : [])}
            placeholder={__('Add Email BCC')}
            value={getValueFromArr(actionKey, 'bcc')}
            title={<span className="f-m f-5">{__('BCC')}</span>}
            isMultiple
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            addable
            options={mailOptions(getValueFromArr(actionKey, 'bcc'))}
          />
          <DropDown
            action={val => setEmailSetting('replyto', val ? val.split(',') : [])}
            placeholder={__('Reply To')}
            value={getValueFromArr(actionKey, 'replyto')}
            title={<span className="f-m f-5">{__('Reply To')}</span>}
            isMultiple
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            addable
            options={mailOptions(getValueFromArr(actionKey, 'replyto'))}
          />
          <DropDown
            action={val => setEmailSetting('attachment', val ? val.split(',') : [])}
            placeholder={__('Attachment')}
            value={getValueFromArr(actionKey, 'attachment')}
            title={<span className="f-m f-5">{__('Attachment')}</span>}
            isMultiple
            titleClassName="w-7 mt-2"
            className="w-10 mt-1"
            options={fileInFormField()}
          />
        </div>
      )}
    </div>
  )
}
