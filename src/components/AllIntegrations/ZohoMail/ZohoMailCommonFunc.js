export default function handleInput(e, mailConf, setMailConf, formID, setisLoading, setSnackbar, isNew, error, setError) {
  const newConf = { ...mailConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  setMailConf({ ...newConf })
}
