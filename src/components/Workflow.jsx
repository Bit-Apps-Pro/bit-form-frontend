/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react'
import Button from './ElmSettings/Childs/Button'
import LogicChip from './ElmSettings/Childs/LogicChip'
import LogicBlock from './ElmSettings/Childs/LogicBlock'
import ActionBlock from './ElmSettings/Childs/ActionBlock'
import Accordions from './ElmSettings/Childs/Accordions'
import CheckBox from './ElmSettings/Childs/CheckBox'
import MtSelect from './ElmSettings/Childs/MtSelect'
import DropDown from './ElmSettings/Childs/DropDown'

function Workflow({ formFields, formSettings, setworkFlows }) {
  const l = [
    {
      title: 'Action',
      action_run: 'create_edit',
      action_type: 'onload',
      action_behaviour: 'cond',
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'bbb' },
        'or',
        [
          { field: 'fld-1', logic: 'eqal', val: 'ccc' },
          'or',
          { field: 'fld-1', logic: 'eqal', val: 'ddd' },
          'or',
          [
            { field: 'fld-1', logic: 'eqal', val: 'eee' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'fff' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'ggg' },
          ],
        ],
        'and',
        { field: 'fld-1', logic: 'eqal', val: 'hhh' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'iii' },
      ],
      actions: [
        { field: 'fld-1', action: 'show' },
        { field: 'fld-1', action: 'hide' },
        { field: 'fld-1', action: 'hide' },
      ],
    },
    {
      title: 'Action asd',
      action_type: 'onsubmit',
      action_run: 'edit',
      action_behaviour: 'always',
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'bbb' },
      ],
      actions: [
        { field: 'fld-1', action: 'value' },
      ],
    },
  ]

  const [lgc, setlgc] = useState(l)
  useEffect(() => {
    setworkFlows([...lgc])
  }, [lgc])

  const addLogicGrp = () => {
    lgc.push({
      title: `Action ${lgc.length + 1}`,
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'bbb' },
      ],
      actions: [
        { field: 'fld-1', action: 'hide' },
      ],
    })
    setlgc([...lgc])
  }

  const delLgcGrp = val => {
    lgc.splice(val, 1)
    setlgc([...lgc])
  }

  const handleLgcTitle = (e, i) => {
    lgc[i].title = e.target.value
    setlgc([...lgc])
  }

  const addLogic = (typ, lgcGrpInd) => {
    if (typ === 'and') {
      setlgc(prv => {
        prv[lgcGrpInd].logics.push('and')
        prv[lgcGrpInd].logics.push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    } else if (typ === 'or') {
      setlgc(prv => {
        prv[lgcGrpInd].logics.push('or')
        prv[lgcGrpInd].logics.push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    } else if (typ === 'orGrp') {
      setlgc(prv => {
        prv[lgcGrpInd].logics.push('or')
        prv[lgcGrpInd].logics.push([{ field: 'fld-1', logic: 'eqal', val: 'aaa' }, 'or', { field: 'fld-1', logic: 'eqal', val: 'aaa' }])
        return [...prv]
      })
    } else if (typ === 'andGrp') {
      setlgc(prv => {
        prv[lgcGrpInd].logics.push('and')
        prv[lgcGrpInd].logics.push([{ field: 'fld-1', logic: 'eqal', val: 'aaa' }, 'and', { field: 'fld-1', logic: 'eqal', val: 'aaa' }])
        return [...prv]
      })
    }
  }

  const addSubLogic = (typ, lgcGrpInd, ind) => {
    if (typ === 'and') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind].push('and')
        prv[lgcGrpInd].logics[ind].push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    } else if (typ === 'or') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind].push('or')
        prv[lgcGrpInd].logics[ind].push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    } else if (typ === 'orGrp') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind].push('or')
        prv[lgcGrpInd].logics[ind].push([{ field: 'fld-1', logic: 'eqal', val: 'aaa' }, 'or', { field: 'fld-1', logic: 'eqal', val: 'aaa' }])
        return [...prv]
      })
    } else if (typ === 'andGrp') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind].push('and')
        prv[lgcGrpInd].logics[ind].push([{ field: 'fld-1', logic: 'eqal', val: 'aaa' }, 'and', { field: 'fld-1', logic: 'eqal', val: 'aaa' }])
        return [...prv]
      })
    }
  }

  const addSubSubLogic = (typ, lgcGrpInd, ind, subInd) => {
    if (typ === 'and') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind][subInd].push('and')
        prv[lgcGrpInd].logics[ind][subInd].push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    } else if (typ === 'or') {
      setlgc(prv => {
        prv[lgcGrpInd].logics[ind][subInd].push('or')
        prv[lgcGrpInd].logics[ind][subInd].push({ field: 'fld-1', logic: 'eqal', val: 'aaa' })
        return [...prv]
      })
    }
  }

  const changeLogicChip = (e, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (subSubLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd] = e
        return [...prv]
      })
    } else if (subLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd] = e
        return [...prv]
      })
    } else {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd] = e
        return [...prv]
      })
    }
  }

  const changeLogic = (val, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (subSubLgcInd !== undefined) {
      setlgc(prv => {
        if (val === 'null') {
          prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd].val = ''
        }
        prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd].logic = val
        return [...prv]
      })
    } else if (subLgcInd !== undefined) {
      setlgc(prv => {
        if (val === 'null') {
          prv[lgcGrpInd].logics[lgcInd][subLgcInd].val = ''
        }
        prv[lgcGrpInd].logics[lgcInd][subLgcInd].logic = val
        return [...prv]
      })
    } else {
      setlgc(prv => {
        if (val === 'null') {
          prv[lgcGrpInd].logics[lgcInd].val = ''
        }
        prv[lgcGrpInd].logics[lgcInd].logic = val
        return [...prv]
      })
    }
  }

  const changeValue = (val, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (subSubLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd].val = val
        return [...prv]
      })
    } else if (subLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd].val = val
        return [...prv]
      })
    } else {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd].val = val
        return [...prv]
      })
    }
  }

  const changeFormField = (val, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (subSubLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd].field = val
        return [...prv]
      })
    } else if (subLgcInd !== undefined) {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd][subLgcInd].field = val
        return [...prv]
      })
    } else {
      setlgc(prv => {
        prv[lgcGrpInd].logics[lgcInd].field = val
        return [...prv]
      })
    }
  }

  const delLogic = (lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (lgc[lgcGrpInd].logics.length > 1) {
      if (subSubLgcInd !== undefined) {
        setlgc(prv => {
          if (prv[lgcGrpInd].logics[lgcInd][subLgcInd].length === subSubLgcInd + 1) {
            if (prv[lgcGrpInd].logics[lgcInd][subLgcInd].length === 3) {
              const tmp = prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd - 2]
              prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd, 1)
              prv[lgcGrpInd].logics[lgcInd].push(tmp)
            } else {
              prv[lgcGrpInd].logics[lgcInd][subLgcInd].splice(subSubLgcInd - 1, 2)
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (prv[lgcGrpInd].logics[lgcInd][subLgcInd].length === 3) {
              const tmp = prv[lgcGrpInd].logics[lgcInd][subLgcInd][subSubLgcInd + 2]
              prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd, 1)
              prv[lgcGrpInd].logics[lgcInd].push(tmp)
            } else {
              prv[lgcGrpInd].logics[lgcInd][subLgcInd].splice(subSubLgcInd, 2)
            }
          }
          return [...prv]
        })
      } else if (subLgcInd !== undefined) {
        setlgc(prv => {
          if (prv[lgcGrpInd].logics[lgcInd].length === subLgcInd + 1) {
            if (prv[lgcGrpInd].logics[lgcInd].length === 3) {
              const tmp = prv[lgcGrpInd].logics[lgcInd][subLgcInd - 2]
              prv[lgcGrpInd].logics.splice(lgcInd, 1)
              prv[lgcGrpInd].logics.splice(lgcInd, 0, tmp)
            } else {
              prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd - 1, 2)
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (prv[lgcGrpInd].logics[lgcInd].length === 3) {
              const tmp = prv[lgcGrpInd].logics[lgcInd][subLgcInd + 2]
              prv[lgcGrpInd].logics.splice(lgcInd, 1)
              prv[lgcGrpInd].logics.splice(lgcInd, 0, tmp)
            } else {
              prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd, 2)
            }
          }
          return [...prv]
        })
      } else {
        setlgc(prv => {
          if (lgcInd !== 0) {
            prv[lgcGrpInd].logics.splice(lgcInd - 1, 2)
          } else {
            prv[lgcGrpInd].logics.splice(lgcInd, 2)
          }
          return [...prv]
        })
      }
    }
  }

  const addAction = lgcGrpInd => {
    setlgc(prv => {
      prv[lgcGrpInd].actions.push({ field: 'fld-1', action: 'disable' })
      return [...prv]
    })
  }

  const addInlineLogic = (typ, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd) => {
    if (typ === 'and') {
      setlgc(prv => {
        if (subSubLgcInd !== undefined) {
          prv[lgcGrpInd].logics[lgcInd][subLgcInd].splice(subSubLgcInd + 1, 0, 'and', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        } else if (subLgcInd !== undefined) {
          prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd + 1, 0, 'and', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        } else {
          prv[lgcGrpInd].logics.splice(lgcInd + 1, 0, 'and', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        }
        return [...prv]
      })
    } else {
      setlgc(prv => {
        if (subSubLgcInd !== undefined) {
          prv[lgcGrpInd].logics[lgcInd][subLgcInd].splice(subSubLgcInd + 1, 0, 'or', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        } else if (subLgcInd !== undefined) {
          prv[lgcGrpInd].logics[lgcInd].splice(subLgcInd + 1, 0, 'or', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        } else {
          prv[lgcGrpInd].logics.splice(lgcInd + 1, 0, 'or', { field: 'fld-1', logic: 'eqal', val: 'iii' })
        }
        return [...prv]
      })
    }
  }

  const changeActionType = (typ, lgcGrpInd) => {
    if (typ === 'onsubmit') {
      lgc[lgcGrpInd].actions.map(itm => { itm.action = 'value' })
    } else if (typ === 'onvalidate') {
      lgc[lgcGrpInd].action_behaviour = 'cond'
    }
    lgc[lgcGrpInd].action_type = typ
    setlgc([...lgc])
  }

  const changeActionRun = (typ, lgcGrpInd) => {
    lgc[lgcGrpInd].action_run = typ
    setlgc([...lgc])
  }

  const changeActionBehave = (typ, lgcGrpInd) => {
    lgc[lgcGrpInd].action_behaviour = typ
    setlgc([...lgc])
  }

  const changeValidateMsg = (val, lgcGrpInd) => {
    lgc[lgcGrpInd].validateMsg = val
    setlgc([...lgc])
  }

  const setSuccessMsg = (val, lgcGrpInd) => {
    lgc[lgcGrpInd].successMsg = val // value can be message title or arr index or msg value
    setlgc([...lgc])
  }

  const setRedirectPage = (val, lgcGrpInd) => {
    lgc[lgcGrpInd].redirectPage = val // value can be message title or arr index or msg value
    setlgc([...lgc])
  }

  const setWebHooks = (e, lgcGrpInd) => {
    const val = []
    for (let i = 0; i < e.target.selectedOptions.length; i += 1) {
      val.push(e.target.selectedOptions[i].value)
    }
    lgc[lgcGrpInd].webHooks = val // value can be message title or arr index or msg value
    setlgc([...lgc])
  }

  const preventDelete = (val, lgcGrpInd) => {
    lgc[lgcGrpInd].avoid_delete = val
    setlgc([...lgc])
  }


  return (
    <div className="btcd-workflow">
      <h3>Actions</h3>
      {lgc.map((lgcGrp, lgcGrpInd) => (
        <div key={`lgc-grp-${lgcGrpInd + 13}`} className="workflow-grp flx">
          <Accordions title={`${lgcGrp.title}`} titleEditable onTitleChange={e => handleLgcTitle(e, lgcGrpInd)} notScroll cls="mt-2 w-10">
            <div className="flx">
              <b className="txt-dp"><small>Action Run When:</small></b>
              <CheckBox radio onChange={e => changeActionRun(e.target.value, lgcGrpInd)} name={`ar-${lgcGrpInd + 28}`} title={<small className="txt-dp">Record Create/Edit</small>} checked={lgcGrp.action_run === 'create_edit'} value="create_edit" />
              <CheckBox radio onChange={e => changeActionRun(e.target.value, lgcGrpInd)} name={`ar-${lgcGrpInd + 28}`} title={<small className="txt-dp">Record Create</small>} checked={lgcGrp.action_run === 'create'} value="create" />
              <CheckBox radio onChange={e => changeActionRun(e.target.value, lgcGrpInd)} name={`ar-${lgcGrpInd + 28}`} title={<small className="txt-dp">Record Edit</small>} checked={lgcGrp.action_run === 'edit'} value="edit" />
              <CheckBox radio onChange={e => changeActionRun(e.target.value, lgcGrpInd)} name={`ar-${lgcGrpInd + 28}`} title={<small className="txt-dp">Record Delete</small>} checked={lgcGrp.action_run === 'delete'} value="delete" />
            </div>
            {lgcGrp.action_run !== 'delete' && (
              <div className="flx">
                <b className="txt-dp"><small>Action Effect:</small></b>
                <CheckBox radio onChange={e => changeActionType(e.target.value, lgcGrpInd)} name={`at-${lgcGrpInd + 26}`} title={<small className="txt-dp">On Form Load</small>} checked={lgcGrp.action_type === 'onload'} value="onload" />
                <CheckBox radio onChange={e => changeActionType(e.target.value, lgcGrpInd)} name={`at-${lgcGrpInd + 26}`} title={<small className="txt-dp">On Field Input</small>} checked={lgcGrp.action_type === 'oninput'} value="oninput" />
                <CheckBox radio onChange={e => changeActionType(e.target.value, lgcGrpInd)} name={`at-${lgcGrpInd + 26}`} title={<small className="txt-dp">On Form Validate</small>} checked={lgcGrp.action_type === 'onvalidate'} value="onvalidate" />
                <CheckBox radio onChange={e => changeActionType(e.target.value, lgcGrpInd)} name={`at-${lgcGrpInd + 26}`} title={<small className="txt-dp">On Form Submit</small>} checked={lgcGrp.action_type === 'onsubmit'} value="onsubmit" />
              </div>
            )}
            <div className="flx">
              <b className="txt-dp"><small>Action Behaviour:</small></b>
              {lgcGrp.action_behaviour !== 'onvalidate' && <CheckBox radio onChange={e => changeActionBehave(e.target.value, lgcGrpInd)} name={`ab-${lgcGrpInd + 111}`} title={<small className="txt-dp">Always</small>} checked={lgcGrp.action_behaviour === 'always'} value="always" />}
              <CheckBox radio onChange={e => changeActionBehave(e.target.value, lgcGrpInd)} name={`ab-${lgcGrpInd + 111}`} title={<small className="txt-dp">Condition</small>} checked={lgcGrp.action_behaviour === 'cond'} value="cond" />
            </div>

            {lgcGrp.action_behaviour === 'cond' && <h3 className="m-0 mb-1 txt-gray">IF</h3>}
            <div>
              {
                lgcGrp.action_behaviour === 'cond' && lgcGrp.logics.map((logic, ind) => (
                  <span key={`logic-${ind + 44}`}>
                    {typeof logic === 'object' && !Array.isArray(logic) && <LogicBlock fieldVal={logic.field} formFields={formFields} changeFormField={changeFormField} changeValue={changeValue} logicValue={logic.logic} changeLogic={changeLogic} addInlineLogic={addInlineLogic} delLogic={delLogic} lgcGrpInd={lgcGrpInd} lgcInd={ind} value={logic.val} />}
                    {typeof logic === 'string' && <LogicChip logic={logic} onChange={e => changeLogicChip(e.target.value, lgcGrpInd, ind)} />}
                    {Array.isArray(logic) && (
                      <div className="p-2 pl-6 br-10 btcd-logic-grp">

                        {logic.map((subLogic, subInd) => (
                          <span key={`subLogic-${subInd + 55}`}>
                            {typeof subLogic === 'object' && !Array.isArray(subLogic) && <LogicBlock fieldVal={subLogic.field} formFields={formFields} changeFormField={changeFormField} changeValue={changeValue} logicValue={subLogic.logic} changeLogic={changeLogic} addInlineLogic={addInlineLogic} delLogic={delLogic} lgcGrpInd={lgcGrpInd} lgcInd={ind} subLgcInd={subInd} value={subLogic.val} />}
                            {typeof subLogic === 'string' && <LogicChip logic={subLogic} nested onChange={e => changeLogicChip(e.target.value, lgcGrpInd, ind, subInd)} />}
                            {Array.isArray(subLogic) && (
                              <div className="p-2 pl-6 br-10 btcd-logic-grp">

                                {subLogic.map((subSubLogic, subSubLgcInd) => (
                                  <span key={`subsubLogic-${subSubLgcInd + 90}`}>
                                    {typeof subSubLogic === 'object' && !Array.isArray(subSubLogic) && <LogicBlock fieldVal={subSubLogic.field} formFields={formFields} changeFormField={changeFormField} changeValue={changeValue} logicValue={subSubLogic.logic} changeLogic={changeLogic} addInlineLogic={addInlineLogic} delLogic={delLogic} lgcGrpInd={lgcGrpInd} lgcInd={ind} subLgcInd={subInd} subSubLgcInd={subSubLgcInd} value={subSubLogic.val} />}
                                    {typeof subSubLogic === 'string' && <LogicChip logic={subSubLogic} nested onChange={e => changeLogicChip(e.target.value, lgcGrpInd, ind, subInd, subSubLgcInd)} />}
                                  </span>
                                ))}
                                <div className=" btcd-lgc-btns">
                                  <div className="flx">
                                    <Button icn className="blue sh-sm">+</Button>
                                    <Button onClick={() => addSubSubLogic('and', lgcGrpInd, ind, subInd)} className="blue sh-sm ml-2"> AND </Button>
                                    <Button onClick={() => addSubSubLogic('or', lgcGrpInd, ind, subInd)} className="blue sh-sm ml-2"> OR </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </span>
                        ))}
                        <div className=" btcd-lgc-btns">
                          <div className="flx">
                            <Button icn className="blue sh-sm">+</Button>
                            <Button onClick={() => addSubLogic('and', lgcGrpInd, ind)} className="blue sh-sm ml-2"> AND </Button>
                            <Button onClick={() => addSubLogic('or', lgcGrpInd, ind)} className="blue sh-sm ml-2"> OR </Button>
                            <Button onClick={() => addSubLogic('orGrp', lgcGrpInd, ind)} className="blue sh-sm ml-2"> OR Group</Button>
                            <Button onClick={() => addSubLogic('andGrp', lgcGrpInd, ind)} className="blue sh-sm ml-2"> AND Group</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </span>
                ))
              }

              {lgcGrp.action_behaviour === 'cond' && (
                <div className="btcd-lgc-btns">
                  <div className="flx">
                    <Button icn className="blue sh-sm">+</Button>
                    <Button onClick={() => addLogic('and', lgcGrpInd)} className="blue sh-sm ml-2"> AND </Button>
                    <Button onClick={() => addLogic('or', lgcGrpInd)} className="blue sh-sm ml-2"> OR </Button>
                    <Button onClick={() => addLogic('orGrp', lgcGrpInd)} className="blue sh-sm ml-2"> OR Group</Button>
                    <Button onClick={() => addLogic('andGrp', lgcGrpInd)} className="blue sh-sm ml-2"> AND Group</Button>
                  </div>
                </div>
              )}

              <div className="txt-dp mt-2"><b>Action</b></div>
              <div className="btcd-hr mb-2" />

              {lgcGrp.action_run === 'delete' && <CheckBox onChange={e => preventDelete(e.target.checked, lgcGrpInd)} title={<small className="txt-dp">Prevent Delete</small>} />}

              {(lgcGrp.action_type === 'onsubmit' || lgcGrp.action_run === 'delete') && (
                <>
                  {lgcGrp.action_run !== 'delete' && (
                    <>
                      <MtSelect onChange={e => setSuccessMsg(e.target.value, lgcGrpInd)} value={lgcGrp.successMsg} label="Success Message" className="w-7">
                        <option value="">Select Message</option>
                        {formSettings.confirmation.type.msg.map((itm, i) => <option key={`sm-${i + 2.3}`} value={itm.title}>{itm.title}</option>)}
                      </MtSelect>
                      <div className="mt-2" />
                      <MtSelect onChange={e => setRedirectPage(e.target.value, lgcGrpInd)} value={lgcGrp.redirectPage} label="Redirect Page" className="w-7">
                        <option value="">Select Page To Redirect</option>
                        {formSettings.confirmation.type.url.map((itm, i) => <option key={`sr-${i + 2.5}`} value={itm.title}>{itm.title}</option>)}
                      </MtSelect>
                    </>
                  )}

                  <DropDown action={e => setWebHooks(e, lgcGrpInd)} value={lgcGrp.webHooks} title={<small className="txt-dp ml-2">Web Hooks</small>} titleClassName="mt-2 w-7" isMultiple options={formSettings.confirmation.type.hooks.map(itm => ({ name: itm.title, value: itm.title }))} placeholder="Select Hooks to Call" />
                  {lgcGrp.action_run !== 'delete' && <div className="mt-2"><b className="txt-dp">Set another field value</b></div>}
                </>
              )}

              {(lgcGrp.action_type === 'onvalidate' && lgcGrp.action_run !== 'delete') && (
                <MtSelect onChange={e => changeValidateMsg(e.target.value, lgcGrpInd)} value={lgcGrp.validateMsg} label="Validation Message" className="w-7 mt-2">
                  <option value="">Select Message</option>
                  {formSettings.confirmation.type.msg.map((itm, i) => <option key={`vm-${i + 2.7}`} value={itm.title}>{itm.title}</option>)}
                </MtSelect>
              )}

              {(lgcGrp.action_type !== 'onvalidate' && lgcGrp.action_run !== 'delete') && (
                <div className="ml-2 mt-2">
                  {lgcGrp.actions.map((action, actionInd) => (
                    <span key={`atn-${actionInd + 22}`}>
                      <ActionBlock formFields={formFields} action={action} setlgc={setlgc} lgcGrpInd={lgcGrpInd} actionInd={actionInd} actionType={lgcGrp.action_type} />
                      {lgcGrp.actions.length !== actionInd + 1 && (
                        <>
                          <div style={{ height: 5 }}>
                            <svg height="60" width="50">
                              <line x1="20" y1="10" x2="20" y2="0" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
                            </svg>
                          </div>
                          <h6 className="m-0 ml-2 mt-1 txt-gray">AND</h6>
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
                  <Button onClick={() => addAction(lgcGrpInd)} icn className="blue sh-sm">+</Button>
                </div>
              )}
            </div>
          </Accordions>

          <div className="mt-1">
            <Button onClick={() => delLgcGrp(lgcGrpInd)} icn className="ml-2 sh-sm btcd-menu-btn tooltip" style={{ '--tooltip-txt': '"Delete Action"' }}>
              <span className="btcd-icn icn-trash-2" />
            </Button>
          </div>
        </div>
      ))}
      <Button className="blue sh-sm" onClick={addLogicGrp}>+ Add Action</Button>
    </div>
  )
}

export default Workflow
