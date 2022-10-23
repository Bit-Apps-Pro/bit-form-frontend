export default function addHoneypotField(form, honeypotFldName) {
  if (honeypotFldName) {
    form.appendChild(createBfElement('input', { type: 'text', name: 'b_h_t', value: honeypotFldName }, 'd-none'))
    form.appendChild(createBfElement('input', { type: 'text', name: honeypotFldName, value: '', required: true }, 'd-none'))
  }
}
