export default function saveIntegConfig(allintegs, setIntegration, allIntegURL, deskConf, history, saveForm, id, edit) {
  const integs = [...allintegs]

  if (edit) {
    integs[id] = { ...allintegs[id], ...deskConf }
    setIntegration([...integs])
    saveForm()
    history.push(allIntegURL)
  } else {
    const newInteg = [...integs]
    newInteg.push(deskConf)
    newInteg.push({ newItegration: true })
    setIntegration(newInteg)
    history.push(allIntegURL)
  }
}
