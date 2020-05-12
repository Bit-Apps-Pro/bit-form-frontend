/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import SlimSelect from 'slim-select'
import { Responsive, WidthProvider } from 'react-grid-layout'
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'

export default function Bitforms(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  const FormLayout = WidthProvider(Responsive);
  const blk = (field) => {
    const name = props.data[field.i].lbl === null ? null : field.i + props.data[field.i].lbl.split(' ').join('_')
    props.data[field.i].name = name
    console.log(field)
    return (
      <div
        key={field.i}
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
      // const fields = Array.prototype.slice.call(event.target)
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
    bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
      .then(response => {
        if (response !== undefined && response.success) {
          setMessage(response.data)
          setSnack(true)
          // window.location = '/'
        }
      })
  }

  const setFileIcn = () => {
    // attach icon file
    const fInputs = document.querySelectorAll('.btcd-f-input>div>input')
    // eslint-disable-next-line no-restricted-syntax
    for (const inp of fInputs) {
      // eslint-disable-next-line max-len
      inp.parentNode.querySelector('.btcd-inpBtn>img').src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4='
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

    setTimeout(() => { setFileIcn() }, 1)
  }, [])

  return (
    <div>
      {
        snack
        && <Toast msg={message} show={snack} setSnack={setSnack} />
      }
      <form id={`form-${process.env.NODE_ENV === 'production' && bitFormsFront.contentID}`} encType={props.file ? 'multipart/form-data' : ''} onSubmit={handleSubmit} method="POST">
        <input type="hidden" value={process.env.NODE_ENV === 'production' && bitFormsFront.nonce} name="bitforms_token" />
        <input type="hidden" value={process.env.NODE_ENV === 'production' && bitFormsFront.appID} name="bitforms_id" />
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
        {!props.editMode && <button className="blk" type="submit">Submit</button>}
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
