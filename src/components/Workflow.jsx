import React from 'react'
import Button from './ElmSettings/Childs/Button'

function Workflow() {
  const a = [
    {
      logics: [
        [
          {
            field: 'fld-1',
            logic: 'eqal',
            val: 'aaa',
            connector: 'and',
          },
          {
            field: 'fld-2',
            logic: 'eqal',
            val: 'aaa',
            connector: 'and',
          },
        ],
      ],
      action: {},
    },

  ]

  return (
    <div className="btcd-workflow">

      <div className="btcd-flow-logic-grp">
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

      <div className="btcd-flow-logic-grp">
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

      <div className="bg-blue-1 p-2 br-15">
        <div className="flx flx-between">
          <div className="btcd-flow-icn mr-2">This</div>
          <select className="btcd-paper-inp mr-2">
            <option value="">Select Form Field</option>
            <option value="">asdas</option>
          </select>
          <div className="btcd-flow-icn rev-icn"><span className="btcd-icn icn-arrow_back" /></div>
          <select className="btcd-paper-inp w-3 ml-2 mr-2">
            <option value="">Equal</option>
            <option value="">Not Equal</option>
          </select>
        </div>
      </div>



    </div >
  )
}

export default Workflow
