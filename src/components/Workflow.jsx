/* eslint-disable no-else-return */
import React, { useState } from 'react'
import Button from './ElmSettings/Childs/Button'
import MtInput from './ElmSettings/Childs/MtInput'
import MtSelect from './ElmSettings/Childs/MtSelect'

function Workflow() {
  const a = [{ f: 'a' }, 'or', { f: 'b' }, 'or', [{ f: 'c' }, 'or', { f: 'd' }, 'or', [{ f: 'e' }, 'and', { f: 'f' }, 'and', { f: 'g' }]], 'and', { f: 'h' }, 'or', { f: 'i' }]

  const layGen = itm => {
    if (typeof itm === 'object' && !Array.isArray(itm)) {
      console.log(itm.f)
    } else if (typeof itm === 'string') {
      console.log('--', itm)
    } else if (Array.isArray(itm)) {
      itm.map(i => { layGen(i) })
    }
  }

  const l = [
    {
      logics: [
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        [
          { field: 'fld-1', logic: 'eqal', val: 'aaa' },
          'or',
          { field: 'fld-1', logic: 'eqal', val: 'aaa' },
          'or',
          [
            { field: 'fld-1', logic: 'eqal', val: 'aaa' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'aaa' },
            'and',
            { field: 'fld-1', logic: 'eqal', val: 'aaa' },
          ],
        ],
        'and',
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
        'or',
        { field: 'fld-1', logic: 'eqal', val: 'aaa' },
      ],
      actions: [],
    },
  ]

  const [lgc, setlgc] = useState(l)

  const treeGen = (itm, nested, ind) => {
    console.log(ind)
    if (typeof itm === 'object' && !Array.isArray(itm)) {
      return <Logic />
    } else if (typeof itm === 'string') {
      return <LogicChip logic={itm} nested={nested} />
    } else if (Array.isArray(itm)) {
      return (
        <div className="p-2 pl-6 br-10 btcd-logic-grp">
          {itm.map((sub, i) => treeGen(sub, true, i))}
          <div className=" btcd-lgc-btns">
            <div className="flx">
              <Button icn className="blue sh-sm">+</Button>
              <Button onClick={() => addLogic('and')} className="blue sh-sm ml-2"> AND </Button>
              <Button onClick={() => addLogic('or')} className="blue sh-sm ml-2"> OR </Button>
              <Button onClick={() => addLogic('orGrp')} className="blue sh-sm ml-2"> OR Group</Button>
              <Button onClick={() => addLogic('andGrp')} className="blue sh-sm ml-2"> AND Group</Button>
            </div>
          </div>
        </div>
      )
    }
  }


  /* const l = [
    {
      logics: [
        [{ field: 'assad', action: 'hide' }],
        [{ field: 'assad', action: 'hide' }],
        [
          [{ field: 'assad', action: 'hide' }],
          [{ field: 'assad', action: 'hide' }],
          [
            { field: 'assad', action: 'hide' },
            { field: 'assad', action: 'hide' },
            { field: 'assad', action: 'hide' },
          ],
        ],
      ],
      actions: [
        { field: 'assad', action: 'hide' },
        { field: 'assad', action: 'hide' },
      ],
    },
  ] */

  /* const l = [
    {
      logics: [
        [
          [{ field: 'fld-1', logic: 'eqal', val: 'aaa' }],
          [{ field: 'fld-2', logic: 'eqal', val: 'bbb' }],
          [{ field: 'fld-2', logic: 'eqal', val: 'ccc' }],
          [
            { field: 'fld-2', logic: 'eqal', val: 'ccc' },
            { field: 'fld-2', logic: 'eqal', val: 'ccc' },
          ],
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
  ] */

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

  return (
    <div className="btcd-workflow">

      {lgc.map((lgcGrp, lgcGrpInd) => {
        return (
          <>
            {/* {lgcGrp.logics.map((logic, i) => treeGen(logic, false))} */}
            {lgcGrp.logics.map((logic, ind) => (
              <>
                {typeof logic === 'object' && !Array.isArray(logic) && <Logic />}
                {typeof logic === 'string' && (
                  <>
                    {logic === 'and' && (
                      'asdassadasdd'
                    )}
                    <LogicChip logic={logic} />
                  </>
                )}
                {Array.isArray(logic) && (
                  <div className="p-2 pl-6 br-10 btcd-logic-grp">
                    {logic.map((subLogic, subInd) => (
                      <>
                        {typeof subLogic === 'object' && !Array.isArray(subLogic) && <Logic />}
                        {typeof subLogic === 'string' && <LogicChip logic={subLogic} nested />}
                        {Array.isArray(subLogic) && (
                          <div className="p-2 pl-6 br-10 btcd-logic-grp">
                            {subLogic.map(subSubLogic => (
                              <>
                                {typeof subSubLogic === 'object' && !Array.isArray(subSubLogic) && <Logic />}
                                {typeof subSubLogic === 'string' && <LogicChip logic={subSubLogic} nested />}
                              </>
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
                      </>
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
              </>
            ))}

            <div className=" btcd-lgc-btns">
              <div className="flx">
                <Button icn className="blue sh-sm">+</Button>
                <Button onClick={() => addLogic('and', lgcGrpInd)} className="blue sh-sm ml-2"> AND </Button>
                <Button onClick={() => addLogic('or', lgcGrpInd)} className="blue sh-sm ml-2"> OR </Button>
                <Button onClick={() => addLogic('orGrp', lgcGrpInd)} className="blue sh-sm ml-2"> OR Group</Button>
                <Button onClick={() => addLogic('andGrp', lgcGrpInd)} className="blue sh-sm ml-2"> AND Group</Button>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Workflow

function LogicChip({ logic, nested }) {
  return (
    <>
      <div style={{ height: nested ? 5 : 10 }}>
        <svg height="60" width="50">
          <line x1="20" y1={nested ? 6 : 10} x2="20" y2="0" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        </svg>
      </div>

      <div>
        <span className={nested ? 'btcd-lgc-sm' : 'btcd-lgc'}>{logic.toUpperCase()}</span>
      </div>

      <div style={{ height: nested ? 5 : 10 }}>
        <svg height="60" width="50">
          <line x1="20" y1={nested ? 6 : 10} x2="20" y2="0" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        </svg>
      </div>
    </>
  )
}

function Logic() {
  return (
    <div className="flx">
      <MtSelect
        label="Form Fields"
      >
        <option>sdfsdf</option>
        <option>asd</option>
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        <circle cx="0" cy="20" r="3" fill="#b9c5ff" />
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        <circle cx="40" cy="20" r="3" fill="#b9c5ff" />
      </svg>

      <MtSelect
        className="w-3"
        label="Logic"
      >
        <option>Equal</option>
        <option>Not Equal</option>
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        <circle cx="0" cy="20" r="3" fill="#b9c5ff" />
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        <circle cx="40" cy="20" r="3" fill="#b9c5ff" />
      </svg>

      <MtInput
        label="Fsdfsdfsdf"
      />
    </div>
  )
}
