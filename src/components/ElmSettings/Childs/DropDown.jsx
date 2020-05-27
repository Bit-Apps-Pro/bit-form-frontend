import React, { useEffect } from 'react'
import SlimSelect from 'slim-select'


function DropDown(props) {
  const s = React.useRef(null)

  const config = {
    select: s.current,
    allowDeselect: true,
    placeholder: props.placeholder,
    searchPlaceholder: props.searchPH,
  }

  if (props.addable) {
    config.addable = val => ({ text: val, value: val })
  }

  useEffect(() => {
    config.select = s.current
    // eslint-disable-next-line no-new
    new SlimSelect(config)
  }, [config])

  return (
    <div className={`${props.titleClassName}`}>
      <span>{props.title}</span>
      <select value={props.value} ref={s} multiple={props.isMultiple} onChange={props.action} className={`btcd-app-slim ${props.className}`}>
        {props.options !== null
          && props.options !== false
          && props.options.map(item => <option key={`key${item.name}`} value={item.value}>{item.name}</option>)}
      </select>
    </div>
  )
}

export default (DropDown)
