import produce from 'immer'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import { SmartTagField } from '../../Utils/StaticData/SmartTagField'
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

    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
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
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
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
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeLogicChip = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd][subSubLgcInd] = val
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd] = val
      } else {
        tmpLogics[lgcInd] = val
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const getLogicPath = (logicsObj, lgcInd, subLgcInd, subSubLgcInd) => {
    if (subSubLgcInd !== undefined) {
      return logicsObj[lgcInd][subLgcInd][subSubLgcInd]
    }
    if (subLgcInd !== undefined) {
      return logicsObj[lgcInd][subLgcInd]
    }
    return logicsObj[lgcInd]
  }

  const changeValue = (val, lgcInd, subLgcInd, subSubLgcInd, valKey = '') => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      const logicPath = getLogicPath(tmpLogics, lgcInd, subLgcInd, subSubLgcInd)

      if (valKey) {
        if (typeof logicPath.val === 'string') {
          logicPath.val = {}
        }
        logicPath.val[valKey] = val
      } else {
        logicPath.val = val
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeFormField = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const isSmartTag = SmartTagField.find(field => field.name === val)
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      const logicPath = getLogicPath(tmpLogics, lgcInd, subLgcInd, subSubLgcInd)
      if (subSubLgcInd !== undefined) {
        logicPath.field = val
        logicPath.val = ''
      } else if (subLgcInd !== undefined) {
        logicPath.field = val
        logicPath.val = ''
      } else {
        logicPath.field = val
        logicPath.val = ''
      }
      if (!isSmartTag?.custom) delete logicPath.smartKey
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const addInlineLogic = (typ, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      if (subSubLgcInd !== undefined) {
        tmpLogics[lgcInd][subLgcInd].splice(subSubLgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      } else if (subLgcInd !== undefined) {
        tmpLogics[lgcInd].splice(subLgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      } else {
        tmpLogics.splice(lgcInd + 1, 0, typ, { field: '', logic: '', val: '' })
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeSmartKey = (val, lgcInd, subLgcInd, subSubLgcInd) => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      const tmpLogics = draftWorkflows[lgcGrpInd].conditions[condGrpInd].logics
      const logicPath = getLogicPath(tmpLogics, lgcInd, subLgcInd, subSubLgcInd)
      logicPath.smartKey = val
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    condGrp?.logics?.map((logic, ind) => (
      <span key={`logic-${ind + 44}`}>
        {typeof logic === 'object' && !Array.isArray(logic) && (
          <LogicBlock
            logic={logic}
            fieldVal={logic.field}
            changeFormField={changeFormField}
            changeValue={changeValue}
            changeSmartKey={changeSmartKey}
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
        {typeof logic === 'string' && (
          <LogicChip logic={logic} onChange={e => changeLogicChip(e.target.value, ind)} />
        )}
        {Array.isArray(logic) && (
          <div className="p-2 br-10 btcd-logic-grp mt-2 mb-2 pl-4 pr-4">
            {logic.map((subLogic, subInd) => (
              <span key={`subLogic-${subInd * 7}`}>
                {typeof subLogic === 'object' && !Array.isArray(subLogic) && (
                  <LogicBlock
                    logic={subLogic}
                    fieldVal={subLogic.field}
                    changeFormField={changeFormField}
                    changeValue={changeValue}
                    changeSmartKey={changeSmartKey}
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
                  <div className="p-2 br-10 btcd-logic-grp mt-2 mb-2 pl-4 pr-4">
                    {subLogic.map((subSubLogic, subSubLgcInd) => (
                      <span key={`subsubLogic-${subSubLgcInd + 90}`}>
                        {typeof subSubLogic === 'object' && !Array.isArray(subSubLogic) && (
                          <LogicBlock
                            logic={subSubLogic}
                            fieldVal={subSubLogic.field}
                            changeFormField={changeFormField}
                            changeValue={changeValue}
                            changeSmartKey={changeSmartKey}
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
                  </div>
                )}
              </span>
            ))}
          </div>
        )}
      </span>
    ))
  )
}
