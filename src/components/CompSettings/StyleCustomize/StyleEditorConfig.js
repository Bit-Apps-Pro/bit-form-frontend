const styleEditorConfig = {
  formbg: {
    background: { responsive: true, picture: true },
    border: { responsive: true, hover: true, type: true, radius: true, color: true, width: true },
    padding: { responsive: true },
    margin: { responsive: true },
    shadow: { responsive: true, hover: true, type: true, color: true, style: true },
  },
  form: {
    background: { hover: true, responsive: true, backdropFilter: true },
    border: { responsive: true, hover: true, type: true, radius: true, color: true, width: true },
    padding: { responsive: true },
    margin: { responsive: true },
    shadow: { responsive: true, hover: true, type: true, color: true, style: true },
  },
  field_block: {
    gap: { responsive: true },
    color: { hover: true },
    direction: {},
    padding: { responsive: true },
    background: { hover: true, responsive: true, backdropFilter: true },
    border: { responsive: true, hover: true, type: true, radius: true, color: true, width: true },
    shadow: { responsive: true, hover: true, type: true, color: true, style: true },
  },
  field: {
    color: { hover: true, focus: true, placeholder: true, important: true },
    background: { focus: true, hover: true, responsive: true, backdropFilter: true, important: true },
    border: { focus: true, responsive: true, hover: true, type: true, radius: true, color: true, width: true, important: true },
    padding: { focus: true, responsive: true, important: true },
    margin: { focus: true, responsive: true, important: true },
    font: { size: true, important: true },
    shadow: { focus: true, responsive: true, hover: true, type: true, color: true, style: true, important: true },
  },
  field_label: {
    color: { checkBoxColor: true, important: true },
    font: { size: true, important: true },
  },
}

export default styleEditorConfig
