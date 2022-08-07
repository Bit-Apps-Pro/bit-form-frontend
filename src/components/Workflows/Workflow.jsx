/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { Fragment, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import produce from 'immer'
import CloseIcn from '../../Icons/CloseIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import { $bits, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import WorkflowRunner from './WorkflowRunner'
import WorkflowConditionSection from './WorkflowCondtionSection'

function Workflow({ formID }) {
  const [confMdl, setconfMdl] = useState({ show: false })
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
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
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      draftWorkflows.unshift({
        title: `Action ${workflows.length + 1}`,
        action_type: 'onload',
        action_run: 'create_edit',
        action_behaviour: 'cond',
        conditions: [
          {
            cond_type: 'if',
            logics: [
              {
                field: '',
                logic: '',
                val: '',
              },
              'or',
              {
                field: '',
                logic: '',
                val: '',
              },
            ],
            actions: {
              fields: [
                {
                  field: '',
                  action: 'value',
                },
              ],
              success: [
                {
                  type: 'successMsg',
                  details: { id: '{"index":0}' },
                },
              ],
            },
          },
        ],
      })
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const delLgcGrp = val => {
    if (workflows[val].id) {
      const prom = bitsFetch({ formID, id: workflows[val].id }, 'bitforms_delete_workflow')
        .then(res => {
          if (res !== undefined && res.success) {
            workflows.splice(val, 1)
            setWorkflows([...workflows])
          }
        })

      toast.promise(prom, {
        success: 'Successfully Deleted.',
        loading: 'Deleting...',
        error: 'Error occurred, Try again.',
      })
    } else {
      workflows.splice(val, 1)
      setWorkflows([...workflows])
    }
  }

  const handleLgcTitle = (e, i) => {
    workflows[i].title = e.target.value
    setWorkflows([...workflows])
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

      {((!isPro && !workflows.length) || isPro) && (
        <Button className="blue" onClick={addLogicGrp}>
          <CloseIcn size="10" className="icn-rotate-45 mr-1" />
          {__('Add Conditional Logic')}
        </Button>
      )}

      {workflows.length > 0 ? workflows.map((lgcGrp, lgcGrpInd) => (
        <Fragment key={`workflows-grp-${lgcGrpInd + 13}`}>
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
