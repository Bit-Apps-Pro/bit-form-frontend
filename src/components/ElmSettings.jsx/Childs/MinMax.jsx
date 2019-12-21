/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'

export default function MinMax(props) {
  const [min, setMin] = useState(props.min)
  const [max, setMax] = useState(props.max)

  useEffect(() => {
    setMin(props.min)
    setMax(props.max)
  }, [props])

  const updateMin = e => {
    e.preventDefault()
    setMin(e.target.value)
    props.elm.data.child.map(node => {
      if (node.tag === 'input') {
        node.attr.min = e.target.value
        if (e.target.value.trim() === '') {
          delete node.attr.min
        }
      }
      return null
    })
    props.updateData(props.elm)
  }
  const updateMax = e => {
    e.preventDefault()
    setMax(e.target.value)
    props.elm.data.child.map(node => {
      if (node.tag === 'input') {
        node.attr.max = e.target.value
        if (e.target.value.trim() === '') {
          delete node.attr.max
        }
      }
      return null
    })
    props.updateData(props.elm)
  }
  return (
    <div className="mt-3">
      <div className="flx">
        <div className="setting-inp ml-2">
          <span>Minimum:</span>
          <input style={{ width: '70%' }} type="number" onChange={updateMin} value={min} />
        </div>
        <div className="setting-inp">
          <span>Maximum:</span>
          <input style={{ width: '70%' }} type="number" onChange={updateMax} value={max} />
        </div>
      </div>

    </div>
  )
}
