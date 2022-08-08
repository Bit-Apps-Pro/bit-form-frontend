import produce, { current } from 'immer'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import Button from '../Utilities/Button'
import LogicBlock from './LogicBlock'
import LogicChip from './LogicChip'
import { accessToNested } from './WorkflowHelpers'

export default function WorkflowLogicSection({ lgcGrp, lgcGrpInd, condGrp, condGrpInd }) {
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const addLogic = (typ, path = '', isGroup = 0) => {
    const logicData = [typ]
    const logicObj = { field: '', logic: '', val: '' }

    if (isGroup) logicData.push([logicObj, typ, logicObj])
    else logicData.push(logicObj)

    setWorkflows(prvSt => produce(prvSt, prv => {
      let tmp = prv[lgcGrpInd].conditions[condGrpInd].logics
      tmp = accessToNested(tmp, path)
      tmp.push(...logicData)
    }))

    setUpdateBtn({ unsaved: true })
  }

  const delLogic = (lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (tmpLogics.length > 1) {
        if (subSubLgcInd !== undefined) {
          if (tmpLogics[lgcInd][subLgcInd].length === subSubLgcInd + 1) {
            if (tmpLogics[lgcInd][subLgcInd].length === 3) {
              const tmp = tmpLogics[lgcInd][subLgcInd][subSubLgcInd - 2]
              tmpLogics[lgcInd].splice(subLgcInd, 1)
              tmpLogics[lgcInd].push(tmp)
            } else {
              tmpLogics[lgcInd][subLgcInd].splice(subSubLgcInd - 1, 2)
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (tmpLogics[lgcInd][subLgcInd].length === 3) {
              const tmp = tmpLogics[lgcInd][subLgcInd][subSubLgcInd + 2]
              tmpLogics[lgcInd].splice(subLgcInd, 1)
              tmpLogics[lgcInd].push(tmp)
            } else {
              tmpLogics[lgcInd][subLgcInd].splice(subSubLgcInd, 2)
            }
          }
        } else if (subLgcInd !== undefined) {
          if (tmpLogics[lgcInd].length === subLgcInd + 1) {
            if (tmpLogics[lgcInd].length === 3) {
              const tmp = tmpLogics[lgcInd][subLgcInd - 2]
              tmpLogics.splice(lgcInd, 1)
              tmpLogics.splice(lgcInd, 0, tmp)
            } else {
              tmpLogics[lgcInd].splice(subLgcInd - 1, 2)
            }
          } else if (tmpLogics[lgcInd].length === 3) {
            const tmp = tmpLogics[lgcInd][subLgcInd + 2]
            tmpLogics.splice(lgcInd, 1)
            tmpLogics.splice(lgcInd, 0, tmp)
          } else {
            tmpLogics[lgcInd].splice(subLgcInd, 2)
          }
        } else if (lgcInd !== 0) {
          tmpLogics.splice(lgcInd - 1, 2)
        } else {
          tmpLogics.splice(lgcInd, 2)
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const changeLogic = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        if (val === 'null') {
          tmpLogics[lgcInd][subLgcInd][subSubLgcInd].val = ''
        }
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd].logic = val
      } else if (subLgcInd !== undefined) {
        if (val === 'null') {
          tmpLogics[lgcInd][subLgcInd].val = ''
        }
        tmpLogics[lgcInd][subLgcInd].logic = val
      } else {
        if (val === 'null') {
          tmpLogics[lgcInd].val = ''
        }
        tmpLogics[lgcInd].logic = val
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const changeLogicChip = (e, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd] = e
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd] = e
      } else {
        tmpLogics[lgcInd] = e
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const changeValue = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd].val = val
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd].val = val
      } else {
        tmpLogics[lgcInd].val = val
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const changeFormField = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd].field = val
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd].val = ''
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd].field = val
        tmpLogics[lgcInd][subLgcInd].val = ''
      } else {
        tmpLogics[lgcInd].field = val
        tmpLogics[lgcInd].val = ''
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  const addInlineLogic = (typ, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd].splice(subSubLgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd].splice(subLgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      } else {
        console.log('tmplogics', current(tmpLogics))
        tmpLogics.splice(lgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn({ unsaved: true })
  }

  return (
    <>
      {condGrp.logics.map((logic, ind) => (
        <span key={`logic-${ind + 44}`}>
          {typeof logic === 'object' && !Array.isArray(logic) && (
            <LogicBlock
              fieldVal={logic.field}
              changeFormField={changeFormField}
              changeValue={changeValue}
              logicValue={logic.logic}
              changeLogic={changeLogic}
              addInlineLogic={addInlineLogic}
              delLogic={delLogic}
              lgcGrpInd={lgcGrpInd}
              lgcInd={ind}
              value={logic.val}
              actionType={lgcGrp?.action_type}
            />
          )}
          {typeof logic === 'string'
                  && <LogicChip logic={logic} onChange={e => changeLogicChip(e.target.value, ind)} />}
          {Array.isArray(logic) && (
            <div className="p-2 pl-6 br-10 btcd-logic-grp">

              {logic.map((subLogic, subInd) => (
                <span key={`subLogic-${subInd * 7}`}>
                  {typeof subLogic === 'object' && !Array.isArray(subLogic)
                      && (
                        <LogicBlock
                          fieldVal={subLogic.field}
                          changeFormField={changeFormField}
                          changeValue={changeValue}
                          logicValue={subLogic.logic}
                          changeLogic={changeLogic}
                          addInlineLogic={addInlineLogic}
                          delLogic={delLogic}
                          lgcGrpInd={lgcGrpInd}
                          lgcInd={ind}
                          subLgcInd={subInd}
                          value={subLogic.val}
                          actionType={lgcGrp?.action_type}
                        />
                      )}
                  {typeof subLogic === 'string' && (
                    <LogicChip
                      logic={subLogic}
                      nested
                      onChange={e => changeLogicChip(e.target.value, ind, subInd)}
                    />
                  )}
                  {Array.isArray(subLogic) && (
                    <div className="p-2 pl-6 br-10 btcd-logic-grp">

                      {subLogic.map((subSubLogic, subSubLgcInd) => (
                        <span key={`subsubLogic-${subSubLgcInd + 90}`}>
                          {typeof subSubLogic === 'object' && !Array.isArray(subSubLogic)
                              && (
                                <LogicBlock
                                  fieldVal={subSubLogic.field}
                                  changeFormField={changeFormField}
                                  changeValue={changeValue}
                                  logicValue={subSubLogic.logic}
                                  changeLogic={changeLogic}
                                  addInlineLogic={addInlineLogic}
                                  delLogic={delLogic}
                                  lgcGrpInd={lgcGrpInd}
                                  lgcInd={ind}
                                  subLgcInd={subInd}
                                  subSubLgcInd={subSubLgcInd}
                                  value={subSubLogic.val}
                                  actionType={lgcGrp?.action_type}
                                />
                              )}
                          {typeof subSubLogic === 'string' && (
                            <LogicChip
                              logic={subSubLogic}
                              nested
                              onChange={e => changeLogicChip(e.target.value, ind, subInd, subSubLgcInd)}
                            />
                          )}
                        </span>
                      ))}
                      <div className=" btcd-workFlows-btns">
                        <div className="flx">
                          <Button icn className="blue">
                            <CloseIcn
                              size="14"
                              className="icn-rotate-45"
                            />
                          </Button>
                          <Button onClick={() => addLogic('and', `${ind}.${subInd}`)} className="blue ml-2">
                            <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                            AND
                            {' '}
                          </Button>
                          <Button onClick={() => addLogic('or', `${ind}.${subInd}`)} className="blue ml-2">
                            <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                            OR
                            {' '}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              ))}
              <div className=" btcd-workFlows-btns">
                <div className="flx">
                  <Button icn className="blue sh-sm"><CloseIcn size="14" className="icn-rotate-45" /></Button>
                  <Button onClick={() => addLogic('and', `${ind}`)} className="blue ml-2">
                    <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                    AND
                  </Button>
                  <Button onClick={() => addLogic('or', `${ind}`)} className="blue ml-2">
                    <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                    OR
                  </Button>
                  <Button onClick={() => addLogic('or', `${ind}`, 1)} className="blue ml-2">
                    <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                    OR Group
                  </Button>
                  <Button onClick={() => addLogic('and', `${ind}`, 1)} className="blue ml-2">
                    <CloseIcn size="10" className="icn-rotate-45 mr-1" />
                    AND Group
                  </Button>
                </div>
              </div>
            </div>
          )}
        </span>
      ))}
      {lgcGrp.action_behaviour === 'cond' && (
        <div className="btcd-workFlows-btns">
          <div className="flx">
            <Button onClick={() => addLogic('and')} className="blue ml-2">
              <CloseIcn size="10" className="icn-rotate-45 mr-1" />
              AND
            </Button>
            <Button onClick={() => addLogic('or')} className="blue ml-2">
              <CloseIcn size="10" className="icn-rotate-45 mr-1" />
              OR
            </Button>
            <Button onClick={() => addLogic('or', '', 1)} className="blue ml-2">
              <CloseIcn size="10" className="icn-rotate-45 mr-1" />
              OR Group
            </Button>
            <Button onClick={() => addLogic('and', '', 1)} className="blue ml-2">
              <CloseIcn size="10" className="icn-rotate-45 mr-1" />
              AND Group
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
