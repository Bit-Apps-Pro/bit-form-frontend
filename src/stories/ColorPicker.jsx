import './colorPicker.css'

function ColorPicker() {
  const copyVar = (e) => {
    const [, innerHTML] = e.target.innerHTML.split(': ')
    navigator.clipboard.writeText(`var(${innerHTML})`)
  }
  const tabHandler = (e) => {
    if (e.code === 'Enter') {
      copyVar(e)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="colors">
            <div className="title blue">
              Blue
            </div>

            {/* <button onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" type="button" className="code b-54-12"> var name: --b-53-8</button> */}

            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-53-8">
              var name: --b-53-8
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-54-12">
              var name: --b-54-12
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-53-13">
              var name: --b-53-13
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-37-18">
              var name: --b-37-18
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-44-20">
              var name: --b-44-20
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-50-22">
              var name: --b-50-22
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-93-16-8">
              var name: --b-93-16-8
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-35-33">
              var name: --b-35-33
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-54-31">
              var name: --b-54-31
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-36">
              var name: --b-36
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-50">
              var name: --b-50
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-59">
              var name: --b-59
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-92-62">
              var name: --b-92-62
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-72">
              var name: --b-72
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-73">
              var name: --b-73
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-100-64-40">
              var name: --b-100-64-40
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-86">
              var name: --b-86
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-49-79">
              var name: --b-49-79
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-37-69">
              var name: --b-37-69
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-19-48">
              var name: --b-19-48
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-63-18-67">
              var name: --b-63-18-67
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-16-35">
              var name: --b-16-35
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-13-52">
              var name: --b-13-52
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-11-50">
              var name: --b-11-50
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-54-15-53">
              var name: --b-54-15-53
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-38-62-40">
              var name: --b-38-62-40
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-44-87">
              var name: --b-44-87
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-30-84">
              var name: --b-30-84
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-31-44-27">
              var name: --b-31-44-27
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-31-81">
              var name: --b-31-81
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-12-81">
              var name: --b-12-81
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-15-83">
              var name: --b-15-83
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-13-88">
              var name: --b-13-88
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-16-87">
              var name: --b-16-87
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-16-86">
              var name: --b-16-86
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-20-93">
              var name: --b-20-93
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-23-95">
              var name: --b-23-95
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-33-93">
              var name: --b-33-93
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-36-96">
              var name: --b-36-96
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-49-91">
              var name: --b-49-91
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-79-96">
              var name: --b-79-96
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-50-95">
              var name: --b-50-95
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-82-11-5">
              var name: --b-82-11-5
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-70-12-24">
              var name: --b-70-12-24
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-58-82">
              var name: --b-58-82
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-35-86">
              var name: --b-35-86
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-38-89">
              var name: --b-38-89
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-90">
              var name: --b-90
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-95-31-18">
              var name: --b-95-31-18
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-97">
              var name: --b-97
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-15-94">
              var name: --b-15-94
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-100-48-1">
              var name: --b-100-48-1
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code b-88-23-22">
              var name: --b-88-23-22
            </div>
          </div>
        </div>
        <div className="col">
          <div className="colors">
            <div className="title white-73">
              White
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code black-0">
              var name: --black-0
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-9">
              var name: --white-0-9
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-13">
              var name: --white-0-13
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-21">
              var name: --white-0-21
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-29">
              var name: --white-0-29
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-31">
              var name: --white-0-31
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-64">
              var name: --white-0-0-64
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-2-47">
              var name: --white-2-47
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-50">
              var name: --white-0-50
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-61">
              var name: --white-0-61
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-32">
              var name: --white-0-0-32
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-69">
              var name: --white-0-69
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-29">
              var name: --white-0-0-29
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-75">
              var name: --white-0-75
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-77">
              var name: --white-0-77
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-78">
              var name: --white-0-78
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-80">
              var name: --white-0-80
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-5-2">
              var name: --white-0-5-2
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-83">
              var name: --white-0-83
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-17">
              var name: --white-0-0-17
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-14">
              var name: --white-0-0-14
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-86">
              var name: --white-0-86
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-0-12">
              var name: --white-0-0-12
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-89">
              var name: --white-0-89
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-90">
              var name: --white-0-90
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-93">
              var name: --white-0-93
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-81-32">
              var name: --white-0-81-32
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-95 f-c-b">
              var name: --white-0-95
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-97 f-c-b">
              var name: --white-0-97
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-16-86">
              var name: --white-16-86
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-24-34-0 f-c-b">
              var name: --white-24-34-0
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-55-96">
              var name: --white-55-96
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-100-a-658 f-c-b">
              var name: --white-100-a-658
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-100-90 f-c-b">
              var name: --white-0-100-90
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-0-100-0 f-c-b">
              var name: --white-0-100-0
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-100 f-c-b">
              var name: --white-100
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code white-100-50-2 f-c-b">
              var name: --white-100-50-2
            </div>
          </div>
        </div>
        <div className="col">
          <div className="colors ">
            <div className="title white-73">
              Mixed
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code crimson">
              var name: --crimson
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code red-100-45">
              var name: --red-100-45
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code red-83-54">
              var name: --red-83-54
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code red-100-61">
              var name: --red-100-61
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code red-100-49">
              var name: --red-100-49
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code red-100-50">
              var name: --red-100-50
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-41">
              var name: --g-41
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-45">
              var name: --g-45
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-89-7">
              var name: --g-89-7
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-100-25">
              var name: --g-100-25
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code wave-blue-46">
              var name: --wave-blue-46
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code wave-blue-58">
              var name: --wave-blue-58
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-23-61-45">
              var name: --g-23-61-45
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code lightgray f-c-b">
              var name: --lightgray
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code light-98 f-c-b">
              var name: --light-98
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-100-50-2 f-c-b">
              var name: --g-100-50-2
            </div>
            <div onClick={copyVar} onKeyPress={tabHandler} role="button" aria-label="color code copy" tabIndex="0" className="code g-100-50-2 f-c-b">
              var name: --g-100-50-2
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ColorPicker
