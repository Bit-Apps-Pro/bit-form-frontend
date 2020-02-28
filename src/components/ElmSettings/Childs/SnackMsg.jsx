import React, { useEffect, useContext, useState } from 'react'
import { BitappsContext } from '../../../Utils/BitappsContext'

export default function SnackMsg() {
  const { snackMsg } = useContext(BitappsContext)
  const { snackbar, setSnackbar } = snackMsg
  const [show, setshow] = useState(false)
  useEffect(() => {
    setTimeout(() => { setshow(true) }, 1)
    setTimeout(() => { setshow(false) }, 2000)
    setTimeout(() => { setSnackbar({ show: false, msg: '' }) }, 2500)
  }, [])

  return (
    <div className="btcd-snack flx" style={{ right: show ? 30 : -400 }}>
      {snackbar.msg}
      <button onClick={() => setSnackbar({ show: false, msg: '' })} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}
