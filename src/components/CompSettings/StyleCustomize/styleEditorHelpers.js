import { select } from '../../../Utils/globalHelpers'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal) => {
  const settingsMenu = select('#settings-menu')
  const x = settingsMenu.getBoundingClientRect().right - (settingsMenu.getBoundingClientRect().left + window.scrollX) + 5
  const y = e.target.getBoundingClientRect().top + window.scrollY
  setDraggableModal({ show: true, type: 'border-style', position: { x, y } })
}
