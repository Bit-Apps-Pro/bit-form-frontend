import Back2FldList from './Back2FldList'

export default function ReCaptchaSettigns({ elm, updateData, setElementSetting }) {
  const onInput = e => {
    const tmp = { ...elm }
    tmp.data[e.target.name] = e.target.value
    updateData(tmp)
  }


  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        reCAPTCHA
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
