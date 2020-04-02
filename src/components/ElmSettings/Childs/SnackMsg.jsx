import React, { useEffect, useContext, memo } from 'react'
import { SnackContext } from '../../../Utils/SnackContext'

function SnackMsg() {
  const { snackbar, setSnackbar } = useContext(SnackContext)
  const { show, msg } = snackbar
  useEffect(() => {
    setTimeout(() => { setSnackbar({ show: false, msg: '' }) }, 2500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <div className="btcd-snack flx" style={{ right: show ? 30 : -400 }}>
      {msg}
      <button onClick={() => setSnackbar({ show: false, msg: '' })} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}

export default SnackMsg
