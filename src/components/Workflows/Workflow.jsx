/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { Fragment, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CloseIcn from '../../Icons/CloseIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import bitsFetch from '../../Utils/bitsFetch'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { $bits, $fieldsArr, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import WorkflowRunner from './WorkflowRunner'
import WorkflowConditionSection from './WorkflowCondtionSection'

function Workflow({ formID }) {
  const [confMdl, setconfMdl] = useState({ show: false })
  const [allWorkFlows, setworkFlows] = useRecoilState($workflows)
  const fieldsArr = useRecoilValue($fieldsArr)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const workFlows = deepCopy(allWorkFlows)
  const bits = useRecoilValue($bits)
  const { isPro } = bits

  const actionsTitle = type => {
    switch (type) {
      case 'onload':
        return __('On Load')
      case 'oninput':
        return __('On Field Input')
      case 'onvalidate':
        return __('On Form Validate')
      case 'onsubmit':
        return __('On Form Submit')
      case 'create_edit':
        return __('Record Create/Edit')
      case 'create':
        return __('Record Create')
      case 'edit':
        return __('Record Edit')
      case 'delete':
        return __('Record Delete')
      case 'always':
        return __('Always')
      case 'cond':
        return __('With Condition')
      default:
        break
    }
  }

  const addLogicGrp = () => {
    workFlows.unshift({
      title: `Action ${workFlows.length + 1}`,
      action_type: 'onload',
      action_run: 'create_edit',
      action_behaviour: 'cond',
      logics: [
        { field: '', logic: '', val: '' },
        'or',
        { field: '', logic: '', val: '' },
      ],
      actions: [{ field: '', action: 'value' }],
      successAction: [],
    })
    setworkFlows([...workFlows])
    setUpdateBtn({ unsaved: true })
  }

  const delLgcGrp = val => {
    if (workFlows[val].id) {
      const prom = bitsFetch({ formID, id: workFlows[val].id }, 'bitforms_delete_workflow')
        .then(res => {
          if (res !== undefined && res.success) {
            workFlows.splice(val, 1)
            setworkFlows([...workFlows])
          }
        })

      toast.promise(prom, {
        success: 'Successfully Deleted.',
        loading: 'Deleting...',
        error: 'Error occurred, Try again.',
      })
    } else {
      workFlows.splice(val, 1)
      setworkFlows([...workFlows])
    }
  }

  const handleLgcTitle = (e, i) => {
    workFlows[i].title = e.target.value
    setworkFlows([...workFlows])
    setUpdateBtn({ unsaved: true })
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const lgcGrpDelConf = i => {
    confMdl.btnTxt = 'Delete'
    confMdl.body = 'Are you sure to delete this conditional logic?'
    confMdl.btnClass = ''
    confMdl.action = () => {
      delLgcGrp(i)
      closeConfMdl()
    }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  console.log('workflows', workFlows)

  return (
    <div className="btcd-workflow" style={{ width: 900 }}>
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <h2>{__('Conditional Logics')}</h2>

      {((!isPro && !workFlows.length) || isPro) && (
        <Button className="blue" onClick={addLogicGrp}>
          <CloseIcn size="10" className="icn-rotate-45 mr-1" />
          {__('Add Conditional Logic')}
        </Button>
      )}

      {workFlows.length > 0 ? workFlows.map((lgcGrp, lgcGrpInd) => (
        <Fragment key={`workFlows-grp-${lgcGrpInd + 13}`}>
          <div className="workflow-grp d-flx mt-2">
            <Accordions
              title={`${lgcGrp.title}`}
              header={(
                <small className="f-right txt-dp mr-4">
                  <span className="mr-2">
                    <i className="btcd-chat-dot mr-1" />
                    {actionsTitle(lgcGrp.action_run)}
                  </span>
                  {lgcGrp.action_type !== undefined && (
                    <span className="mr-2">
                      <i className="btcd-chat-dot mr-1" />
                      {actionsTitle(lgcGrp.action_type)}
                    </span>
                  )}
                  <span>
                    <i className="btcd-chat-dot mr-1" />
                    {actionsTitle(lgcGrp.action_behaviour)}
                  </span>
                </small>
              )}
              titleEditable
              onTitleChange={e => handleLgcTitle(e, lgcGrpInd)}
              notScroll
              cls={!isPro ? 'w-10' : 'w-9'}
            >
              <WorkflowRunner lgcGrpInd={lgcGrpInd} lgcGrp={lgcGrp} />
              <WorkflowConditionSection lgcGrpInd={lgcGrpInd} lgcGrp={lgcGrp} />
            </Accordions>
            {isPro && (
              <div className="mt-2">
                <Button
                  onClick={() => lgcGrpDelConf(lgcGrpInd)}
                  icn
                  className="ml-2 sh-sm btcd-menu-btn tooltip"
                  style={{ '--tooltip-txt': '"Delete Action"' }}
                >
                  <TrashIcn size="16" />
                </Button>
              </div>
            )}
          </div>
          {!isPro && (
            <div className="txt-center bg-pro p-5 mt-2">
              {__('For')}
                    &nbsp;
              <span className="txt-pro">{__('UNLIMITED')}</span>
                    &nbsp;
              {__('Conditional Logics')}
              ,&nbsp;
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <b
                  className="txt-pro"
                >
                  {__('Buy Premium')}
                </b>
              </a>
            </div>
          )}
        </Fragment>
      )) : (
        <div className={css(ut.btcdEmpty, ut.txCenter)}>
          <StackIcn size="50" />
          {__('Empty')}
        </div>
      )}
    </div>
  )
}

export default Workflow
