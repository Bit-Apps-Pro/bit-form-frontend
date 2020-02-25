import React, { useState, useEffect } from 'react'
import Modal from './Modal'

export default function EditEntryData(props) {
  const [showEdit, setshowEdit] = useState(false)
  console.log('%c $render EditEntryData', 'background:#ff8686;padding:3px;border-radius:5px')
  useEffect(() => {
    setshowEdit(true)
  }, [])

  return (
    <Modal
      show={showEdit}
      setModal={props.close}
      title="Edit"
      subTitle="Edit Entry Data."
    >
      sdfs
    </Modal>
  )
}
