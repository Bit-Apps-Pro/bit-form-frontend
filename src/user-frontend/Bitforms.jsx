/* eslint-disable no-undef */
import { useEffect, useState, useReducer } from 'react';
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'
import { resetCaptcha } from '../components/Fields/Recaptcha'
import { checkLogic, replaceWithField } from './checkLogic'

const reduceFieldData = (state, action) => ({ ...state, ...action })
export default function Bitforms(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [fieldData, dispatchFieldData] = useReducer(reduceFieldData, props.data)
  const [layout] = useState(props.layout)
  const [hasError, sethasError] = useState(false)
  const [resetFieldValue, setresetFieldValue] = useState(false)
  let maxRowIndex = 0
  const blk = (field) => {
    const dataToPass = fieldData !== undefined && JSON.parse(JSON.stringify(fieldData))
    // eslint-disable-next-line no-useless-escape
    const name = field.i
    // eslint-disable-next-line no-param-reassign
    dataToPass[field.i].name = name
    if (props.gRecaptchaSiteKey && props.gRecaptchaSiteKey !== null && dataToPass[field.i].typ === 'recaptcha') {
      dataToPass[field.i].siteKey = props.gRecaptchaSiteKey
    }
    if (props.fieldToCheck[name]) {
      dataToPass[field.i].hasWorkflow = true
    }
    maxRowIndex = maxRowIndex > field.y + field.h ? maxRowIndex : field.y + field.h
    return (
      <div
        key={field.i}
        className={`btcd-fld-itm ${field.i} ${dataToPass[field.i].valid.hide ? 'btcd-hidden' : ''}`}
      // btcd-id={field.i}
      // data-grid={field}
      >
        <CompGen
          editMode
          atts={dataToPass[field.i]}
          formID={props.formID}
          entryID={props.entryID}
          onBlurHandler={onBlurHandler}
          resetFieldValue={resetFieldValue}
        />
      </div>
    )
  }
  // console.log('fieldData', fieldData)
  const onBlurHandler = (event) => {
    if (!event) {
      return
    }
    let maybeReset = false
    let isInteracted = false
    const dataToSet = []
    let element
    let form
    if (event.target) {
      element = event.target
      form = event.target.form
      isInteracted = true
    } else {
      element = event
      if (element.type === 'dropdown' && element.userinput) {
        isInteracted = true
      }
      form = document.getElementById(`form-${props.contentID}`)
    }
    const newData = fieldData !== undefined && JSON.parse(JSON.stringify(fieldData))
    if (resetFieldValue) {
      setresetFieldValue(false)
    }
    let targetFieldName
    const fieldValues = []
    const fieldNameToQuery = element.name
    if (element.name && element.name.indexOf('[]') !== -1 && element.name.indexOf('[]') === element.name.length - 2) {
      targetFieldName = element.name.substring(0, element.name.length - 2)
    } else {
      targetFieldName = element.name
    }
    if (newData[props.fieldsKey[targetFieldName]] && newData[props.fieldsKey[targetFieldName]].error) {
      delete newData[props.fieldsKey[targetFieldName]].error
      dataToSet[props.fieldsKey[targetFieldName]] = newData[props.fieldsKey[targetFieldName]]
      maybeReset = true
    }
    if (newData[props.fieldsKey[targetFieldName]] && !newData[props.fieldsKey[targetFieldName]].userinput && isInteracted) {
      newData[props.fieldsKey[targetFieldName]].userinput = isInteracted
      dataToSet[props.fieldsKey[targetFieldName]] = newData[props.fieldsKey[targetFieldName]]
      maybeReset = true
    }
    // console.log('______o_n_b_l_u_r______________________', isInteracted)

    if (props.fieldToCheck[targetFieldName] !== undefined) {
      Object.keys(props.fieldsKey).forEach(fieldName => {
        let currentField
        if (targetFieldName === fieldName) {
          currentField = fieldNameToQuery
        } else {
          currentField = fieldName
        }
        const fieldDetails = form.querySelectorAll(`[name^='${currentField}']`)
        // const fieldDetails = document.getElementsByName(currentField)
        // console.log('fieldDetails', form.querySelectorAll(`*[name='${currentField}']`))
        if (fieldDetails.length > 0) {
          let value
          let multiple
          let { type } = fieldDetails[0]
          if (fieldDetails[0].name === element.name && type !== 'checkbox') {
            // console.log('fieldDetails[0].', fieldDetails[0].nextElementSibling, fieldDetails[0].value, element.value, fieldDetails[0].name === element.name, fieldDetails[0].name, targetFieldName)
            value = element.value
            multiple = element.multiple
            type = element.type
          } else if (type === 'checkbox' || type === 'select-multiple' || type === 'select-one' || type === 'radio') {
            switch (type) {
              case 'checkbox':
                // eslint-disable-next-line no-case-declarations
                const checkedValue = []
                fieldDetails.forEach(option => { option.checked && option.value && checkedValue.push(option.value) })
                value = checkedValue
                multiple = true
                break;

              case 'select-multiple':
                // console.log('MULPLfieldDetails', fieldDetails)
                // eslint-disable-next-line no-case-declarations
                const selectedValue = []
                if (fieldDetails[0].slim) {
                  fieldDetails[0].slim.data.data.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
                } else {
                  fieldDetails[0].childNodes.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
                }
                value = selectedValue
                multiple = true
                break;

              case 'select-one':
                value = fieldDetails[0].value
                break;

              case 'radio':
                fieldDetails.forEach(option => { if (option.checked && option.value) value = option.value })
                break;

              default:
                break;
            }
          } else if (fieldDetails[0].type === 'hidden' && fieldDetails[0].value && fieldDetails[0].nextElementSibling && fieldDetails[0].nextElementSibling.hasAttribute('data-msl')) {
            value = fieldDetails[0].value.split(',')
            multiple = value && value.length > 0
          } else {
            value = fieldDetails[0].value
            multiple = fieldDetails[0].multiple
          }
          fieldValues[fieldName] = {
            type,
            value,
            multiple,
          }
        }
      });
      props.fieldToCheck[targetFieldName].forEach(LogicIndex => {
        const logicStatus = checkLogic(props.conditional[LogicIndex].logics, fieldValues)
        if (logicStatus) {
          props.conditional[LogicIndex].actions.forEach(actionDetail => {
            if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
              switch (actionDetail.action) {
                case 'value':
                  if (actionDetail.val !== undefined && newData[props.fieldsKey[actionDetail.field]]) {
                    const actionValue = actionDetail.val ? replaceWithField(actionDetail.val, fieldValues) : actionDetail.val
                    if (actionDetail.field === targetFieldName && newData[props.fieldsKey[actionDetail.field]].val === actionValue && isInteracted && !newData[props.fieldsKey[actionDetail.field]].conditional) {
                      newData[props.fieldsKey[actionDetail.field]].conditional = true
                    } else {
                      newData[props.fieldsKey[actionDetail.field]].conditional = false
                    }
                    newData[props.fieldsKey[actionDetail.field]].val = actionValue
                    newData[props.fieldsKey[actionDetail.field]].userinput = false
                    maybeReset = true
                  }
                  break

                case 'hide':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.hide = true; maybeReset = true }
                  break;

                case 'disable':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.disabled = true; maybeReset = true }
                  break;

                case 'enable':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.disabled = false; maybeReset = true }
                  break;

                case 'show':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = false;
                    if (newData[props.fieldsKey[actionDetail.field]].typ === 'hidden') {
                      newData[props.fieldsKey[actionDetail.field]].typ = 'text';
                    }
                    maybeReset = true
                  }
                  break
                default:
                  break
              }
              dataToSet[props.fieldsKey[actionDetail.field]] = newData[props.fieldsKey[actionDetail.field]]
            }
          })
        } else {
          props.conditional[LogicIndex].actions.forEach(actionDetail => {
            if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
              maybeReset = true
              switch (actionDetail.action) {
                case 'value':
                  if (actionDetail.val !== undefined && newData[props.fieldsKey[actionDetail.field]] && !newData[props.fieldsKey[actionDetail.field]].userinput && actionDetail.field !== targetFieldName) {
                    newData[props.fieldsKey[actionDetail.field]].val = props.data[props.fieldsKey[actionDetail.field]].val ? replaceWithField(props.data[props.fieldsKey[actionDetail.field]].val, fieldValues) : ''
                    newData[props.fieldsKey[actionDetail.field]].userinput = false
                  }
                  break

                case 'hide':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = props.data[props.fieldsKey[actionDetail.field]].valid.hide
                  }
                  break;

                case 'disable':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.disabled = props.data[props.fieldsKey[actionDetail.field]].valid.disabled
                  }
                  break;

                case 'enable':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.disabled = props.data[props.fieldsKey[actionDetail.field]].valid.disabled
                  }
                  break;

                case 'show':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = props.data[props.fieldsKey[actionDetail.field]].valid.hide
                    if (newData[props.fieldsKey[actionDetail.field]].typ === 'hidden') {
                      newData[props.fieldsKey[actionDetail.field]].typ = props.data[props.fieldsKey[actionDetail.field]].typ
                    }
                  }
                  break
                default:
                  break
              }
              dataToSet[props.fieldsKey[actionDetail.field]] = newData[props.fieldsKey[actionDetail.field]]
            }
          })
        }
      })
    }
    if (maybeReset) {
      if (dataToSet[props.fieldsKey[targetFieldName]] && dataToSet[props.fieldsKey[targetFieldName]].userinput && fieldValues[targetFieldName]) {
        dataToSet[props.fieldsKey[targetFieldName]].val = fieldValues[targetFieldName].value
      }
      dispatchFieldData(dataToSet)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setbuttonDisabled(true)
    snack && setSnack(false)
    const formData = new FormData(event.target)

    let submitResponse
    if (props.gRecaptchaVersion && props.gRecaptchaVersion !== null && props.gRecaptchaVersion === 'v3') {
      grecaptcha.ready(() => {
        grecaptcha.execute(props.gRecaptchaSiteKey, { action: 'homepage' }).then((token) => {
          formData.append('g-recaptcha-response', token)
          submitResponse = bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
            .then(response => response)
        })
      })
    } else {
      submitResponse = bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
        .then(response => response)
    }
    submitResponse.then(result => {
      let responsedRedirectPage = null
      let hitCron = null
      if (result !== undefined && result.success) {
        handleReset()
        if (typeof result.data === 'object') {
          responsedRedirectPage = result.data.redirectPage
          if (result.data.cron) {
            hitCron = result.data.cron
          }
          setMessage(result.data.message)
          setSnack(true)
          if (hasError) {
            sethasError(false)
          }
        } else {
          setMessage(result.data)
          setSnack(true)
        }
      } else if (result.data && typeof result.data === 'string') {
        setMessage(result.data)
        sethasError(true)
        setSnack(true)
      } else if (result.data && result.data.data && typeof result.data.data === 'string') {
        setMessage(result.data.data)
        sethasError(true)
        setSnack(true)
      } else if (result.data && result.data.data) {
        if (result.data.data.$form !== undefined) {
          setMessage(JSON.parse(JSON.stringify(result.data.data.$form)))
          sethasError(true)
          setSnack(true)
          // eslint-disable-next-line no-param-reassign
          delete result.data.data.$form
        }
        if (Object.keys(result.data.data).length > 0) {
          const newData = fieldData !== undefined && JSON.parse(JSON.stringify(fieldData))
          // eslint-disable-next-line array-callback-return
          Object.keys(result.data.data).map(element => {
            newData[props.fieldsKey[element]].error = result.data.data[element]
          });
          dispatchFieldData(newData)
        }
      }
      if (responsedRedirectPage) {
        const timer = setTimeout(() => {
          window.location = decodeURI(responsedRedirectPage)
          if (timer) {
            clearTimeout(timer)
          }
        }, 1000);
      }
      if (hitCron) {
        if (!responsedRedirectPage || (responsedRedirectPage && decodeURI(responsedRedirectPage).indexOf(window.location.origin) === -1)) {
          fetch(`${window.location.origin}/wp-cron.php?doing_wp_cron&${hitCron}`)
        }
      }
      setbuttonDisabled(false)
    })
  }

  const handleReset = () => {
    setresetFieldValue(true)
    if (props.gRecaptchaSiteKey) {
      resetCaptcha()
    }
  }

  useEffect(() => {
    if (resetFieldValue) {
      setresetFieldValue(false)
    }
    return () => {
      setresetFieldValue(false)
    }
  }, [resetFieldValue])

  useEffect(() => {
    if (props.error) {
      if (props.error.$form !== undefined) {
        sethasError(true)
        setMessage(JSON.parse(JSON.stringify(props.error.$form)))
        setSnack(true)
        // eslint-disable-next-line no-param-reassign
        delete props.error.$form
      }
      if (Object.keys(props.error).length > 0) {
        const newData = fieldData !== undefined && JSON.parse(JSON.stringify(fieldData))
        // eslint-disable-next-line array-callback-return
        Object.keys(props.error).map(element => {
          newData[props.fieldsKey[element]].error = props.error[element]
        })
        dispatchFieldData(newData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.error])

  useEffect(() => {
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[i].nextSibling.children[1].children[1].style.maxHeight = `${Number(allSel[i].getAttribute('data-max-show')) * 2}pc`
          }
        }
      }
    }
  }, [])

  return (
    <div id={`f-${props.formId}`}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form
        id={`form-${props.contentID}`}
        className={`_frm-bg-${props.formID}`}
        ref={props.refer}
        method="POST"
        encType={props.file ? 'multipart/form-data' : ''}
        onSubmit={handleSubmit}
        onKeyDown={e => {
          e.key === 'Enter'
            && e.target.tagName !== 'TEXTAREA'
            && e.preventDefault()
        }}
      >
        {!props.editMode && <input type="hidden" value={bitFormsFront && props.nonce} name="bitforms_token" />}
        {!props.editMode && <input type="hidden" value={bitFormsFront && props.appID} name="bitforms_id" />}
        {props.gclid && <input type="hidden" name="gclid" />}
        <div className={`_frm-${props.formID}`}>
          <div className={`_frm-g _frm-g-${props.formID}`}>
            {layout.lg.map(field => blk(field))}
          </div>
          {!props.editMode && props.buttons
            && (
              <CompGen
                atts={props.buttons}
                entryID={props.entryID}
                buttonDisabled={buttonDisabled}
                handleReset={handleReset}
              // formID={bitFormsFront.contentID}
              // handleSubmit={handleSubmit}
              // id={`form-${props.contentID}-submit`}
              />
            )}
        </div>
      </form>
      {
        snack
        && (typeof message === 'string' ? <Toast msg={message} show={snack} setSnack={setSnack} error={hasError} /> : message.map((msg, index) => <Toast msg={msg} show={snack} setSnack={setSnack} error={hasError} index={index} canClose={message.length - 1 === index} editMode={props.editMode} />))
      }
    </div>
  )
}

function Toast(props) {
  const [snack, setSnack] = useState(true)
  const closeButtonStyle = {
    position: props.editMode ? 'absolute' : 'inherit',
    top: props.editMode && -20,
    right: props.editMode && -15,
    background: 'red',
    height: '25px',
    width: '25px',
    fontSize: '21px',
    padding: '3px 6px',
    color: 'white',
    borderRadius: '50px',
    lineHeight: '0.8',
    marginLeft: '7px',
    cursor: 'pointer',
    float: !props.editMode && 'right',
  }
  const toatStyles = {
    userSelect: 'none',
    background: '#383838',
    padding: '10px 15px',
    color: 'white',
    borderRadius: '5px',
    position: props.editMode ? 'fixed' : 'inherit',
    bottom: props.editMode && 20,
    right: props.editMode && 20,
    left: props.editMode && 20,
    marginBottom: !props.editMode && 10,
    boxShadow: '1px 1px 3px 0px #0000004d',
    transition: 'right 0.5s',
  }
  if (props.index && props.index > 0) {
    if (props.editMode) {
      toatStyles.bottom += props.index * 2 * 45
    }
  }
  useEffect(() => {
    if (!snack && props.canClose && props.show) {
      props.setSnack(false)
    } else if (!snack && !props.index && props.show) {
      props.setSnack(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snack])
  useEffect(() => {
    const resetTime = props.error ? 10000 : 5000
    const timer = setTimeout(() => {
      if (props.show) {
        // !props.index && props.canClose === undefined && props.setSnack(false)
        props.setSnack(false)
      }
    }, resetTime);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return snack && (
    <div style={toatStyles}>
      <button onClick={() => setSnack(false)} style={closeButtonStyle} type="button">&times;</button>
      {
        /<\/?[a-z][\s\S]*>/i.test(props.msg)
          ? (
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: props.msg }}
            />
          )
          : props.msg
      }
    </div>
  )
}
