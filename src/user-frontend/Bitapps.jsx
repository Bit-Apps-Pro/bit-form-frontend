/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import SlimSelect from 'slim-select'
// import { Responsive, WidthProvider } from 'react-grid-layout'
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'

export default function Bitapps(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  // const FormLayout = WidthProvider(Responsive);
  const blk = (field) => {
    const name = props.data[field.i].lbl === null ? null : field.i + props.data[field.i].lbl.split(' ').join('_')
    // eslint-disable-next-line no-param-reassign
    props.data[field.i].name = name
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
          atts={props.data[field.i]}
          formID={props.formID}
          entryID={props.entryID}
        />
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const fields = Array.prototype.slice.call(event.target)
    fields.filter(el => {
      if (el.type === 'file' && el.files.length > 0) {
        if (el.files.length > 1) {
          el.files.forEach(file => formData.append(`${el.name}[]`, file))
        } else {
          el.files.forEach(file => formData.append(el.name, file))
        }
      } else if ((el.type === 'checkbox' || el.type === 'radio') && el.checked) {
        formData.append(el.name, el.value)
      } else if (el.type === 'select') {
        formData.append(el.name, el.value)
      } else if (!(el.type === 'checkbox' || el.type === 'radio' || el.type === 'file' || el.type === 'select')) {
        formData.append(el.name, el.value)
      }
    })
    bitsFetch(formData, 'bitapps_submit_form', 'multipart/form-data')
      .then(response => {
        if (response !== undefined && response.success) {
          setMessage(response.data)
          setSnack(true)
        }
      })
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
        && <Toast msg={message} show={snack} setSnack={setSnack} />
      }
      <form ref={props.refer} id={`form-${typeof bitAppsFront !== 'undefined' && bitAppsFront.contentID}`} encType={props.file ? 'multipart/form-data' : ''} onSubmit={handleSubmit} method="POST">
        {typeof bitAppsFront !== 'undefined' && !props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && bitAppsFront.nonce} name="bitapps_token" />}
        {typeof bitAppsFront !== 'undefined' && !props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && bitAppsFront.appID} name="bitapps_id" />}
        <div
          style={style}
        // cols={{ lg: 10 }}
        // breakpoints={{ lg: 800 }}
        // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
        // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
        // rowHeight={40}
        // margin={[0, 10]}
        >
          {props.layout.map(field => {
            // eslint-disable-next-line no-param-reassign
            field.static = true
            return blk(field)
          })}
        </div>
        {!props.editMode && <button className="blk" type="submit">Submit</button>}
      </form>
    </div>
  )
}

function Toast(props) {
  /*  const toatStyles = {
     btcdSnack: {
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
     },
   } */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.show) {
        // props.setSnack(false)
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="btcd-snack flx" style={{ right: props.show ? 20 : -200 }}>
      {props.msg}
      <button onClick={() => props.setSnack(false)} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}
