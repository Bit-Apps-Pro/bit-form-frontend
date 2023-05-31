/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { arrayMoveImmutable } from 'array-move'
import { create } from 'mutative'
import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useRecoilState, useAtomValue, useSetRecoilState } from 'recoil'
import { $bits, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import { defaultConds } from '../../Utils/StaticData/form-templates/templateProvider'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import ConfirmModal from '../Utilities/ConfirmModal'
import { DragHandle, SortableItem, SortableList } from '../Utilities/Sortable'
import WorkflowConditionSection from './WorkflowConditionSection'
import WorkflowRunner from './WorkflowRunner'

function Workflow({ formID }) {
  const [confMdl, setconfMdl] = useState({ show: false })
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const bits = useAtomValue($bits)
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
    const tmpWorkflows = create(workflows, draftWorkflows => {
      draftWorkflows.unshift({
        title: `Action ${workflows.length + 1}`,
        action_type: 'onload',
        action_run: 'create_edit',
        action_behaviour: 'cond',
        conditions: [{ ...defaultConds }],
      })
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const delLgcGrp = val => {
    if (workflows[val].id) {
      const prom = bitsFetch({ formID, id: workflows[val].id }, 'bitforms_delete_workflow')
        .then(res => {
          if (res !== undefined && res.success) {
            const tmpWorkflows = create(workflows, draftWorkflows => {
              draftWorkflows.splice(val, 1)
            })
            setWorkflows(tmpWorkflows)
          }
        })

      toast.promise(prom, {
        success: 'Successfully Deleted.',
        loading: 'Deleting...',
        error: 'Error occurred, Try again.',
      })
    } else {
      const tmpWorkflows = create(workflows, draftWorkflows => {
        draftWorkflows.splice(val, 1)
      })
      setWorkflows(tmpWorkflows)
    }
  }

  const handleLgcTitle = (e, i) => {
    const tmpWorkflows = create(workflows, draftWorkflows => {
      draftWorkflows[i].title = e.target.value
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
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

  const onWorkflowSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    setWorkflows(oldWorkflows => arrayMoveImmutable(oldWorkflows, oldIndex, newIndex))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <div className="btcd-workflow" style={{ width: '93%' }}>
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

      {workflows.length === 0 && (
        <div className={css(ut.btcdEmpty, ut.txCenter)}>
          <StackIcn size="50" />
          {__('Empty')}
        </div>
      )}

      <SortableList onSortEnd={onWorkflowSortEnd} useDragHandle>
        {workflows.map((lgcGrp, lgcGrpInd) => (
          <SortableItem
            key={`workflows-grp-${lgcGrpInd + 13}`}
            index={lgcGrpInd}
          >
            <div className="workflow-grp d-flx mt-2">
              <Accordions
                customTitle={<DragHandle className="workflow-drg-handle mr-1 flx" />}
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
          </SortableItem>
        ))}
      </SortableList>

      {workflows.length > 1 && (
        <div className={css(ut.w9, { fs: 13 }, ut.mt4)}>
          <strong>Note: </strong>
          Conditional Logics are triggered based on the order of the logic groups. The higher the logic group, the higher the priority. If you want to change the priority, you can sort by drag and drop the logic group.
        </div>
      )}
    </div>
  )
}

export default Workflow
