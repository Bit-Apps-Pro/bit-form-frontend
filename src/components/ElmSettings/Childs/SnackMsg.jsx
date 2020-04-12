import React, { useEffect } from 'react'

function SnackMsg({ snack, setSnackbar }) {
  const { show, msg } = snack
  useEffect(() => {
    setTimeout(() => { setSnackbar({ show: false, msg }) }, 2500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <div className={`btcd-snack flx ${show && 'btcd-snack-a'}`}>
      {msg}
      <button onClick={() => setSnackbar({ show: false, msg })} className="btcd-snack-cls" type="button">&times;</button>
    </div>
  )
}

export default SnackMsg
