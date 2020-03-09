import React, { useState } from 'react'
import Button from './ElmSettings/Childs/Button'

function Workflow() {
  const l = [
    {
      logics: [
        [
          { field: 'fld-1', logic: 'eqal', val: 'aaa' },
          { field: 'fld-2', logic: 'eqal', val: 'bbb' },
          { field: 'fld-2', logic: 'eqal', val: 'ccc' },
        ],
        [
          { field: 'fld-1', logic: 'eqal', val: 'ddd' },
          { field: 'fld-2', logic: 'eqal', val: 'eee' },
        ],
      ],
      actions: [
        { field: 'assad', action: 'hide' },
        { field: 'assad', action: 'hide' },
      ],
    },
  ]

  const [logicSets, setlogicSets] = useState(l)

  const delLogic = (setInd, logicGrpInd, logicInd) => {
    if (logicSets[setInd].logics.length > 1 || logicSets[setInd].logics[0].length > 1) {
      if (logicSets[setInd].logics[logicGrpInd].length !== 1) {
        setlogicSets(prv => {
          prv[setInd].logics[logicGrpInd].splice(logicInd, 1)
          return [...prv]
        })
      } else {
        setlogicSets(prv => {
          prv[setInd].logics.splice(logicGrpInd, 1)
          return [...prv]
        })
      }
    }
    console.log(setInd, logicGrpInd, logicInd)
  }

  const insertLogicInGrp = (setInd, logicGrpInd, logicInd) => {
    setlogicSets(prv => {
      prv[setInd].logics[logicGrpInd].splice(logicInd + 1, 0, { field: 'fld-2', logic: 'eqal', val: 'zzz' })
      return [...prv]
    })
  }

  const addAction = (setInd, actionInd) => {
    setlogicSets(prv => {
      prv[setInd].actions.splice(actionInd + 1, 0, { field: 'assad', action: 'hide' })
      return [...prv]
    })
  }

  const delAction = (setInd, actionInd) => {
    if (logicSets[setInd].actions.length > 1) {
      setlogicSets(prv => {
        prv[setInd].actions.splice(actionInd, 1)
        return [...prv]
      })
    }
  }

  const addLogicGrp = setInd => {
    setlogicSets(prv => {
      prv[setInd].logics.push([{ field: 'fld-2', logic: 'eqal', val: 'zzz' }])
      return [...prv]
    })
  }

  return (
    <div className="btcd-workflow">

      {logicSets.map((logicArr, setInd) => (
        <div key={`logics-${setInd + 41}`}>

          {logicArr.logics.map((logicGrp, logicGrpInd) => (
            <div key={`logic-arr-${logicGrpInd + 31}`}>
              <div className="br-15 bg-blue-1 p-2">

                {logicGrp.map((logic, logicInd) => (
                  <div key={`logic-grp-${logicInd + 21}`}>
                    <div className="flx flx-between pos-rel btcd-wrk-logic">
                      <div className="btcd-flow-icn mr-2">If</div>
                      <select className="btcd-paper-inp mr-2">
                        <option value="">Select Form Field</option>
                        <option value="">asdas</option>
                      </select>
                      <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
                      <select className="btcd-paper-inp w-3 ml-2 mr-2">
                        <option value="">Equal</option>
                        <option value="">Not Equal</option>
                      </select>
                      <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
                      <input className="btcd-paper-inp ml-2" type="text" value={logic.val} />
                      <div className="btcd-li-side-btn" style={{ width: 150 }}>
                        <Button onClick={() => insertLogicInGrp(setInd, logicGrpInd, logicInd)} icn className="blue mr-1 ml-2"><strong>+</strong></Button>
                        <Button onClick={() => delLogic(setInd, logicGrpInd, logicInd)} icn className="blue"><span className="btcd-icn icn-trash-2" /></Button>
                      </div>
                    </div>
                    {logicGrp.length !== logicInd + 1 && <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>And</div>}
                  </div>
                ))}

              </div>
              {logicArr.logics.length !== logicGrpInd + 1 && <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>OR</div>}
            </div>
          ))}
          <div className="txt-center"><Button onClick={() => addLogicGrp(setInd)} icn className="bg-blue-1 ml-4 mt-2 tooltip" style={{ '--tooltip-txt': '"Add A Logic Group"' }}><strong>+</strong></Button></div>
          <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 " style={{ lineHeight: 1 }}>Then</div>
          <div className="bg-blue-2 p-2 br-15">
            {logicArr.actions.map((action, actionInd) => (
              <div key={`action${actionInd + 11}`}>
                <div className="flx flx-between pos-rel btcd-wrk-logic">
                  <div className="btcd-flow-icn mr-2">This</div>
                  <select className="btcd-paper-inp mr-2">
                    <option value="">Select Form Field</option>
                    <option value="">asdas</option>
                  </select>
                  <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
                  <select className="btcd-paper-inp w-3 ml-2 mr-2">
                    <option value="">Enable</option>
                    <option value="">Disable</option>
                    <option value="">Hide</option>
                    <option value="">Show</option>
                  </select>
                  <div className="btcd-li-side-btn" style={{ width: 150 }}>
                    <Button onClick={() => addAction(setInd, actionInd)} icn className="blue mr-1 ml-2"><strong>+</strong></Button>
                    <Button onClick={() => delAction(setInd, actionInd)} icn className="blue"><span className="btcd-icn icn-trash-2" /></Button>
                  </div>
                </div>
                {logicArr.actions.length !== actionInd + 1 && <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>And</div>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/*
      <hr />
      <hr />
      <div className="br-15 bg-blue-1 p-2">
        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">If</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Equal</option>
            <option value="">Not Equal</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <input className="btcd-paper-inp ml-2" type="text" />
        </div>

        <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>And</div>

        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">If</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Equal</option>
            <option value="">Not Equal</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <input className="btcd-paper-inp ml-2" type="text" />
        </div>
      </div>

      <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>OR</div>

      <div className="br-15 bg-blue-1 p-2">
        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">If</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Equal</option>
            <option value="">Not Equal</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <input className="btcd-paper-inp ml-2" type="text" />
        </div>

        <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>And</div>

        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">If</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Equal</option>
            <option value="">Not Equal</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <input className="btcd-paper-inp ml-2" type="text" />
        </div>

      </div>

      <div className="btcd-flow-icn txt-center mt-2 ml-4 mb-2 f-m" style={{ lineHeight: 1 }}>Then</div>

      <div className="bg-blue-2 p-2 br-15">
        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">This</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Enabled</option>
            <option value="">Disabled</option>
            <option value="">Hide</option>
            <option value="">Show</option>
          </select>
        </div>
      </div> */}

    </div>
  )
}

export default Workflow
