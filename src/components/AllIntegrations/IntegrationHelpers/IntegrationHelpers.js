export default function saveIntegConfig(allIntegrations, setIntegration, allIntegURL, deskConf, history, saveForm, id, edit) {
  const integrations = [];

  if (edit) {
    integrations[id] = { ...allIntegrations[id], ...deskConf }
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  } else {
    const newInteg = [...integrations]
    newInteg.push(deskConf)
    newInteg.push({ newItegration: true })
    setIntegration(newInteg)
    history.push(allIntegURL)
  }
}
