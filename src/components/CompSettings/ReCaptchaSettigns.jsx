import React from 'react'

export default function ReCaptchaSettigns({ elm, updateData }) {
  const onInput = e => {
    const tmp = { ...elm }
    tmp.data[e.target.name] = e.target.value
    updateData(tmp)
  }

  return (
    <div>
      <div className="mt-2 mb-2">
        <span className="font-w-m">Field Type : </span>
        ReCaptcha
      </div>
      <div>
        <label htmlFor="recap-thm">
          Theme
          <select onChange={onInput} name="theme" value={elm.data.theme} className="btcd-paper-inp mt-1">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>
    </div>
  )
}
