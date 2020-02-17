import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BitappsContext } from '../../../Utils/BitappsContext'
import bitsFetch from '../../../Utils/bitsFetch'

export default function MenuBtn(props) {
  const { allFormsData, snackBar } = useContext(BitappsContext)
  const { allFormsDispatchHandler } = allFormsData
  const { message, view } = snackBar
  const { setsnackView } = view
  const { setsnackMessage } = message
  const handleMenuClose = (e) => {
    const el = e.target
    setTimeout(() => {
      el.parentNode.children[1].classList.remove('btcd-m-a')
    }, 500)
  }

  const hadleClick = (e) => {
    if (e.target.parentNode.children[1].classList.contains('btcd-m-a')) {
      e.target.parentNode.children[1].classList.remove('btcd-m-a')
      e.target.blur()
    } else {
      e.target.parentNode.children[1].classList.add('btcd-m-a')
    }
  }
  const handleDelete = () => {
    bitsFetch({ id: props.formID }, 'bitapps_delete_aform').then(response => {
      if (response.success) {
        allFormsDispatchHandler({ type: 'remove', data: props.index })
        setsnackMessage('Form deleted!!')
        setsnackView(true)
      }
    })
  }
  const handleDuplicate = () => {
    console.log(props.formID)
    bitsFetch({ id: props.formID }, 'bitapps_duplicate_aform').then(response => {
      if (response.success) {
        const { data } = response
        allFormsDispatchHandler({ type: 'add', data: { formID: data.id, status: true, formName: data.form_name, shortcode: `bitapps id='${data.id}'`, entries: 0, views: 0, conversion: (0).toPrecision(3), created_at: data.created_at } })
        setsnackMessage('Form duplicated successfully')
        setsnackView(true)
      }
    })
  }

  return (
    <div className="btcd-menu">
      <button className="btcd-menu-btn btcd-mnu sh-sm" onClick={hadleClick} onBlur={handleMenuClose} aria-label="toggle menu" type="button" />
      <div className="btcd-menu-list">
        <Link to={`/builder/edit/${props.formID}`} type="button" aria-label="actions">
          <span className="btcd-icn icn-edit" />
          {'  '}
          Edit
        </Link>
        <button type="button" aria-label="actions" onClick={handleDuplicate}>
          <span className="btcd-icn icn-copy" />
          {'  '}
          Duplicate
        </button>
        <button type="button" aria-label="actions" onClick={handleDelete}>
          <span className="btcd-icn icn-trash-2" />
          {'  '}
          Delete
        </button>
      </div>
    </div>
  )
}
