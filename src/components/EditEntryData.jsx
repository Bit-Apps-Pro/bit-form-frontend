import { useState, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars'
import Modal from './Modal'
import bitsFetch from '../Utils/bitsFetch'
import Bitforms from '../user-frontend/Bitforms'
import LoaderSm from './Loaders/LoaderSm';

export default function EditEntryData(props) {
  console.log('%c $render EditEntryData', 'background:#ff8686;padding:3px;border-radius:5px')
  const { formID, entryID, allResp, setAllResp, setSnackbar } = props

  const [showEdit, setshowEdit] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState({ layout: null, fields: null })
  const [error, setError] = useState(null)
  const [formStyle, setFormStyle] = useState('')
  const [formLayoutStyle, setFormLayoutStyle] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    setshowEdit(true)
    // eslint-disable-next-line no-undef
    fetch(`${bits.styleURL}/bitform-${formID}.css`)
      .then(response => response.text())
      .then(styleData => setFormStyle(styleData))

    // eslint-disable-next-line no-undef
    fetch(`${bits.styleURL}/bitform-layout-${formID}.css`)
      .then(response => response.text())
      .then(styleData => setFormLayoutStyle(styleData))

    bitsFetch({ formID, entryID }, 'bitforms_edit_form_entry')
      .then(res => {
        if (res !== undefined && res.success) {
          setData({ layout: res.data.layout, fields: res.data.fields, fieldToCheck: res.data.fieldToCheck, conditional: res.data.conditional, fieldsKey: res.data.fieldsKey })
        }
      })
  }, [entryID, formID])

  const updateData = (event) => {
    event.preventDefault()
    const formData = new FormData(ref.current)

    const queryParam = { formID, entryID: props.entryID }
    bitsFetch(formData, 'bitforms_update_form_entry', 'multipart/form-data', queryParam)
      .then(response => {
        if (response !== undefined && response.success) {
          if (response.data.cron) {
            fetch(`${window.location.origin}/wp-cron.php?doing_wp_cron&${response.data.cron}`)
          }
          setSnackbar({ show: true, msg: response.data.message })
          const tmp = [...allResp]
          for (let i = 0; i < tmp.length; i += 1) {
            if (tmp[i].entry_id === props.entryID) {
              tmp[i] = response.data.updatedData
              break
            }
          }
          setAllResp(tmp)
          props.close(false)
        } else if (response.data && response.data.data) {
          setError(response.data.data)
        }
        setisLoading(false)
      })
  }

  function SaveBtn() {
    return (
      <button onClick={updateData} disabled={isLoading} type="button" className="btn btn-md blue btcd-mdl-hdr-btn">
        Update
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
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
      {formStyle && (
        <>
          <style>{formStyle}</style>
          <style>{formLayoutStyle}</style>
          <style>
            {`
              .drag:not(.no-drg), .drag:active {
                cursor: default;
              }
            `}
          </style>
        </>
      )}
      <Scrollbars style={{ height: 'calc(100% - 17px)' }}>
        {data.layout !== null && (
          <Bitforms
            refer={ref}
            editMode
            layout={data.layout}
            data={data.fields}
            formID={formID}
            entryID={props.entryID}
            fieldToCheck={data.fieldToCheck}
            conditional={data.conditional}
            fieldsKey={data.fieldsKey}
            error={error}
          />
        )}
      </Scrollbars>
    </Modal>
  )
}
