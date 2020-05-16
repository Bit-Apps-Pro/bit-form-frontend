/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import SlimSelect from 'slim-select'
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'
import checkLogic from './checkLogic'

export default function Bitforms(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  const [redirectPage, setredirectPage] = useState(null)
  const [data, setdata] = useState(props.data)
  const [layout, setlayout] = useState(props.layout)
  const [layoutSize, setlayoutSize] = useState(window.innerWidth > 800 ? 'lg' : window.innerWidth > 600 ? 'md' : 'sm')
  let maxRowIndex = 0
  const blk = (field) => {
    const name = data[field.i].lbl === null ? null : field.i + data[field.i].lbl.split(' ').join('_')
    // eslint-disable-next-line no-param-reassign
    data[field.i].name = name
    maxRowIndex = maxRowIndex > field.y + field.h ? maxRowIndex : field.y + field.h
    return (
      <div
        style={{
          gridColumnStart: field.x + 1, /* x-0 -> (x + 1) */
          gridColumnEnd: (field.x + 1) + field.w, /* w-4 -> x + w */
          gridRowStart: field.y + 1, /* y-0 -> y + 1 */
          gridRowEnd: field.y !== 1 && field.h + (field.y + 1), /* h-4 -> if y not 1 then h+y */
          minHeight: field.h * 40, /* h * 40px */
        }}
        key={field.i}
        btcd-id={field.i}
        data-grid={field}
        role="button"
      >
        <CompGen
          editMode
          atts={data[field.i]}
          formID={props.formID}
          entryID={props.entryID}
          onBlurHandler={onBlurHandler}
        />
      </div>
    )
  }

  const onBlurHandler = (event) => {
    const element = event.target
    if (props.fieldToCheck[element.name] !== undefined) {
      const fieldData = []
      Object.keys(props.fieldToCheck).forEach(fieldName => {
        const fieldDetails = document.getElementsByName(fieldName)
        if (fieldDetails.length > 0) {
          fieldData[fieldName] = {
            type: fieldDetails[0].type,
            value: fieldDetails[0].value,
            multiple: fieldDetails[0].multiple,
          }
        }
      });
      console.log(fieldData)
      // console.log( props.fieldToCheck)
      props.fieldToCheck[element.name].forEach(LogicIndex => {
        console.log('checkLogic', checkLogic(props.conditional[LogicIndex].logics, fieldData), JSON.stringify(data))
        if (checkLogic(props.conditional[LogicIndex].logics, fieldData)) {
          const newData = data !== undefined && JSON.parse(JSON.stringify(data))
          props.conditional[LogicIndex].actions.forEach(actionDetail => {
            if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
              switch (actionDetail.action) {
                case 'value':
                  if (actionDetail.val !== undefined) {
                    newData[props.fieldToChange[actionDetail.field]].val = actionDetail.val;
                  }
                  break

                case 'hide':
                  newData[props.fieldToChange[actionDetail.field]].valid.hide = true;
                  break;

                case 'disable':
                  newData[props.fieldToChange[actionDetail.field]].valid.disabled = true;
                  break;

                case 'enable':
                  newData[props.fieldToChange[actionDetail.field]].valid.disabled = false;
                  break;

                case 'show':
                  newData[props.fieldToChange[actionDetail.field]].valid.hide = false;
                  if (newData[props.fieldToChange[actionDetail.field]].typ === 'hidden') {
                    newData[props.fieldToChange[actionDetail.field]].typ = 'text';
                  }
                  break
                default:
                  break
              }
            }
          })
          setdata(newData)
          setlayout(layout)
        } else {
          setdata(props.data)
        }
      })
      console.log('onBlurHandler', props.data, data)
    }
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      setlayoutSize('lg')
      console.log(window.innerWidth)
    } else if (window.innerWidth > 600) {
      setlayoutSize('md')
      console.log(window.innerWidth)
    } else {
      setlayoutSize('sm')
      console.log(window.innerWidth)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const fields = Array.prototype.slice.call(event.target)
    // eslint-disable-next-line array-callback-return
    fields.filter(el => {
      if (el.type === 'file' && el.files.length > 0) {
        let fileName
        if (el.files.length > 1) {
          fileName = `${el.name}[]`
        } else {
          fileName = el.name
        }
        if (el.files.forEach) {
          el.files.forEach(file => formData.append(fileName, file))
        } else {
          Array.from(el.files).forEach(file => formData.append(fileName, file))
        }
      } else if ((el.type === 'checkbox' || el.type === 'radio') && el.checked) {
        formData.append(el.name, el.value)
      } else if (el.type === 'select-multiple') {
        if ('slim' in el && 'data' in el.slim && 'data' in el.slim.data && el.slim.data.data.length > 0) {
          const selectedData = el.slim.data.data
          const name = el.name.substr(el.name.length - 2, el.name.length) === '[]' ? el.name : `${el.name}[]`
          selectedData.forEach(optionData => {
            if (optionData.selected) {
              formData.append(name, optionData.value)
            }
          })
        } else {
          formData.append(el.name, el.value)
        }
      } else if (el.type === 'select-one') {
        formData.append(el.name, el.value)
      } else if (!(el.type === 'checkbox' || el.type === 'radio' || el.type === 'file' || el.type === 'select')) {
        formData.append(el.name, el.value)
      }
    })

    if (props.gRecaptchaVersion && props.gRecaptchaVersion !== null && props.gRecaptchaVersion === 'v3') {
      grecaptcha.ready(() => {
        grecaptcha.execute(props.gRecaptchaSiteKey, { action: 'homepage' }).then((token) => {
          formData.append('g-recaptcha-response', token)
          bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
            .then(response => {
              if (response !== undefined && response.success) {
                if (typeof response.data === 'object') {
                  setMessage(response.data.message)
                  setSnack(true)
                  setredirectPage(response.data.redirectPage)
                } else {
                  setMessage(response.data)
                  setSnack(true)
                  setredirectPage(null)
                }
              }
            })
        })
      })
    } else {
      bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
        .then(response => {
          if (response !== undefined && response.success) {
            if (typeof response.data === 'object') {
              setMessage(response.data.message)
              setredirectPage(response.data.redirectPage)
              setSnack(true)
              if (response.data.redirectPage === null) {
                document.getElementById(`form-${typeof bitFormsFront !== 'undefined' && bitFormsFront.contentID}`).reset()
              }
            } else {
              setMessage(response.data)
              setredirectPage(null)
              setSnack(true)
              document.getElementById(`form-${typeof bitFormsFront !== 'undefined' && bitFormsFront.contentID}`).reset()
            }
          }
        })
    }
  }


  useEffect(() => {
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
        // eslint-disable-next-line no-unused-vars
        const s = new SlimSelect({
          select: `[btcd-id="${allSel[i].parentNode.parentNode.getAttribute(
            'btcd-id',
          )}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute('placeholder'),
          limit: Number(allSel[i].getAttribute('limit')),
        })

        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[i].nextSibling.children[1].children[1].style.maxHeight = `${Number(allSel[i].getAttribute('data-max-show')) * 2}pc`
          }
        }
      }
    }
  }, [])

  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto',
    gridgap: 0,
  }
  return (
    <div>
      {
        snack
        && <Toast msg={message} show={snack} setSnack={setSnack} redirectPage={redirectPage} />
      }
      <form ref={props.refer} id={`form-${typeof bitFormsFront !== 'undefined' && bitFormsFront.contentID}`} encType={props.file ? 'multipart/form-data' : ''} onSubmit={handleSubmit} method="POST">
        {typeof bitFormsFront !== 'undefined' && !props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && bitFormsFront.nonce} name="bitforms_token" />}
        {typeof bitFormsFront !== 'undefined' && !props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && bitFormsFront.appID} name="bitforms_id" />}
        <div
          style={style}
        // cols={{ lg: 10 }}
        // breakpoints={{ lg: 800 }}
        // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
        // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
        // rowHeight={40}
        // margin={[0, 10]}
        >
          {layout[layoutSize].map(field => {
            // eslint-disable-next-line no-param-reassign
            field.static = true
            return blk(field)
          })}
        </div>
        {/* {!props.editMode && <button className="blk" type="submit">Submit</button>} */}
        {props.gRecaptchaSiteKey && props.gRecaptchaSiteKey !== null && props.gRecaptchaVersion && props.gRecaptchaVersion === 'v2'
          && (
            <div className="text-wrp">
              <div className="g-recaptcha" data-sitekey={props.gRecaptchaSiteKey} />
            </div>
          )}
        {!props.editMode && props.buttons
          && (
            <div
              style={{
                // gridColumnStart: field.x + 1, /* x-0 -> (x + 1) */
                // gridColumnEnd: (field.x + 1) + field.w, /* w-4 -> x + w */
                gridRowStart: maxRowIndex + 2, /* y-0 -> y + 1 */
                gridRowEnd: maxRowIndex + 4, /* h-4 -> if y not 1 then h+y */
                minHeight: 40, /* h * 40px */
              }}
              key={props.buttons.typ}
              role="button"
            >
              <CompGen
                atts={props.buttons}
                // formID={bitFormsFront.contentID}
                entryID={props.entryID}
              />
            </div>
          )}
      </form>
    </div>
  )
}

function Toast(props) {
  const toatStyles = {
    userSelect: 'none',
    background: '#383838',
    padding: '10px 15px',
    color: 'white',
    borderRadius: '5px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    boxShadow: '1px 1px 3px 0px #0000004d',
    transition: 'right 0.5s',
  }
  console.log('props.redirectPage', props.redirectPage)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.show) {
        props.setSnack(false)
        if (props.redirectPage !== null) {
          window.location = props.redirectPage
        } else {
          window.location.reload()
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="btcd-snack flx" style={toatStyles}>
      {
        /<\/?[a-z][\s\S]*>/i.test(props.msg)
          ? (
            <div
              dangerouslySetInnerHTML={{ __html: props.msg }}
            />
          )
          : props.msg
      }
      <button onClick={() => props.setSnack(false)} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}
