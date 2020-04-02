/* eslint-disable no-undef */
import React, { createContext, useState } from 'react'

const SnackContext = createContext()

const SnackContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ show: false, msg: '' })
  return (
    <SnackContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackContext.Provider>
  )
}

export { SnackContext, SnackContextProvider }
