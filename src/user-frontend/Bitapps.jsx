/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import SlimSelect from 'slim-select'
import { Responsive, WidthProvider } from 'react-grid-layout'
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'

export default function Bitapps(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  const FormLayout = WidthProvider(Responsive);
  const blk = (field) => {
    const name = props.data[field.i].lbl === null ? null : field.i + props.data[field.i].lbl.split(' ').join('_')
    props.data[field.i].name = name
    return (
      <div
        key={field.i}
        className="blk"
        btcd-id={field.i}
        data-grid={field}
        role="button"
      >
        <CompGen atts={props.data[field.i]} />
      </div>
    )
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const fields = Array.prototype.slice.call(event.target)
      .filter(el => {
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
          // window.location = '/'
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
  return (
    <div style={{ width: '100%' }} className="layout-wrapper">
      {
        snack
        && <Toast msg={message} show={snack} setSnack={setSnack} />
      }
      <form id={`form-${bitAppsFront.contentID}`} encType={props.file ? 'multipart/form-data' : ''} onSubmit={handleSubmit} method="POST">
        <input type="hidden" value={bitAppsFront.nonce} name="bitapps_token" />
        <input type="hidden" value={bitAppsFront.appID} name="bitapps_id" />
        <FormLayout
          cols={{ lg: 10 }}
          breakpoints={{ lg: 800 }}
          // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
          rowHeight={40}
          margin={[0, 10]}
        >
          {props.layout.map(field => {
            // eslint-disable-next-line no-param-reassign
            field.static = true
            return blk(field)
          })}
        </FormLayout>
        <button className="blk" type="submit">Submit</button>
      </form>
    </div>
  )
}

function Toast(props) {
  const toatStyles = {
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
  }
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
