import React, { useState, useEffect, useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import Modal from './Modal'
import bitsFetch from '../Utils/bitsFetch'
import Bitforms from '../user-frontend/Bitforms'

export default function EditEntryData(props) {
  console.log('%c $render EditEntryData', 'background:#ff8686;padding:3px;border-radius:5px')
  const { formID, entryID, allResp, setAllResp, setSnackbar } = props

  const [showEdit, setshowEdit] = useState(false)
  const [data, setData] = useState({ layout: null, fields: null })
  const ref = useRef(null)

  useEffect(() => {
    setshowEdit(true)
    bitsFetch({ formID, entryID }, 'bitforms_edit_form_entry')
      .then(res => {
        if (res !== undefined && res.success) {
          setData({ layout: res.data.layout, fields: res.data.fields })
        }
      })
  }, [entryID, formID])

  const updateData = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const fields = Array.prototype.slice.call(ref.current)
    // eslint-disable-next-line array-callback-return
    fields.filter(el => {
      if (el.type === 'file' && el.files.length > 0) {
        if (el.files.length > 1) {
          el.files.forEach(file => formData.append(`${el.name}[]`, file))
        } else {
          el.files.forEach(file => formData.append(el.name, file))
        }
      } else if ((el.type === 'checkbox' || el.type === 'radio') && el.checked) {
        if (formData.getAll(el.name).indexOf(el.value) === -1) {
          formData.append(el.name, el.value)
        }
      } else if (el.type === 'select-multiple') {
        if ('slim' in el && 'data' in el.slim && 'data' in el.slim.data && el.slim.data.data.length > 0) {
          const selectedData = el.slim.data.data
          const name = el.name.substr(el.name.length - 2, el.name.length) === '[]' ? el.name : `${el.name}[]`
          selectedData.forEach(optionData => {
            if (optionData.selected && formData.getAll(name).indexOf(optionData.selected) === -1) {
              formData.append(name, optionData.value)
            }
          })
        } else if (formData.getAll(el.name).indexOf(el.value) === -1) {
          formData.append(el.name, el.value)
        }
      } else if (el.type === 'select-one' || el.type === 'select') {
        if (formData.getAll(el.name).indexOf(el.value) === -1) {
          formData.append(el.name, el.value)
        }
      } else if (!(el.type === 'checkbox' || el.type === 'radio' || el.type === 'file' || el.type === 'select')) {
        if (formData.getAll(el.name).indexOf(el.value) === -1) {
          formData.append(el.name, el.value)
        }
      }
    })

    const queryParam = { formID, entryID: props.entryID }
    bitsFetch(formData, 'bitforms_update_form_entry', 'multipart/form-data', queryParam)
      .then(response => {
        if (response !== undefined && response.success) {
          setSnackbar({ show: true, msg: response.data.message })
          const tmp = [...allResp]
          for (let i = 0; i < tmp.length; i += 1) {
            if (tmp[i].entry_id === props.entryID) {
              console.log('update', response.data.updatedData)
              tmp[i] = response.data.updatedData
              break
            }
          }
          setAllResp(tmp)
          props.close(false)
        }
      })
  }

  function SaveBtn() {
    return (
      <button onClick={updateData} type="button" className="btn btn-md blue btcd-mdl-hdr-btn">Update</button>
    )
  }

  return (
    <Modal
      hdrActn={<SaveBtn />}
      lg
      show={showEdit}
      setModal={props.close}
      title="Edit"
    >
      <Scrollbars style={{ height: 'calc(100% - 17px)' }}>
        {data.layout !== null && (
          <Bitforms
            refer={ref}
            editMode
            layout={data.layout}
            data={data.fields}
            formID={formID}
            entryID={props.entryID}
          />
        )}
      </Scrollbars>
    </Modal>
  )
}
