import React from 'react'

export default function ReCaptchaSettigns({ elm, updateData }) {
  console.log('elm', elm)
  const onInput = e => {
    const tmp = { ...elm }
    tmp.data[e.target.name] = e.target.value
    updateData(tmp)
    console.log(tmp)
  }

  return (
    <div>
      <h4>ReCaptcha</h4>
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
