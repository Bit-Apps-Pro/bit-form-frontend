export default function setStyleProperty(elm, prop, value) {
  if (elm.style) elm.style.setProperty(prop, value, 'important')
}
