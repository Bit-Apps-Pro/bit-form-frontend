function pushFileToFormData(formData, fld, files) {
  if (files?.length > 1) {
    const uploadedFileNames = []
    for (let i = 0; i < files.length; i += 1) {
      const { serverId } = files[i]
      if (serverId) {
        uploadedFileNames.push(serverId)
      } else {
        formData.append(`${fld}[]`, files[i]?.file)
      }
    }
    uploadedFileNames.length && formData.append(fld, uploadedFileNames.join(','))
  } else {
    const file = !files[0]?.serverId ? files[0]?.file : files[0]?.serverId
    if (file) formData.append(fld, file)
  }
  return formData
}

export default function advancedFileHandle(props, formData) {
  const inits = props.inits || {}
  const fileFields = Object.keys(inits).filter(
    (fldKey) => props.fields?.[fldKey]?.typ === 'advanced-file-up',
  )
  for (let i = 0; i < fileFields?.length; i += 1) {
    const fldName = props.fields[fileFields[i]].fieldName
    if (formData.has(fldName)) {
      formData.delete(fldName)
      if (inits[fldName]?.on_select_upload) {
        formData.append(fldName, inits[fldName].uploaded_files)
      } else {
        formData = pushFileToFormData(
          formData,
          fldName,
          inits[fileFields[i]].files,
        )
      }
    }
  }
  return formData
}
