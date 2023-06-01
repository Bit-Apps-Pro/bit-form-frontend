/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

function FormWrapperControlMenu() {
  const { element, fieldKey } = useParams()
  const [styleVars, setStyleVars] = useAtom($styles)
  const { _frm } = styleVars.form

  const marginHandler = (value) => {
    setStyleVars(preStyle => create(preStyle, drftStyle => {
      drftStyle.form._frm.margin = `${value}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Form Wrapper Margin', value, { styles: getLatestState('styles') }))
  }

  const paddingHandler = (value) => {
    setStyleVars(preStyle => create(preStyle, drftStyle => {
      drftStyle.form._frm.padding = `${value}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Form Wrapper Padding', value, { styles: getLatestState('styles') }))
  }

  const undoHandler = (value) => {
    setStyleVars(preStyle => create(preStyle, drftStyle => {
      drftStyle.form._frm[value] = '0px 0px 0px 0px'
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Undo Form Wrapper Spacing', '0px 0px 0px 0px', { styles: getLatestState('styles') }))
  }
  return (
    <>
      <SpaceControl isResetable={_frm?.margin} value={_frm?.margin || '0px 0px 0px 0px'} undoHandler={() => undoHandler('margin')} title="Form Wrapper Margin" onChange={val => marginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl isResetable={_frm?.padding} value={_frm?.padding || '0px 0px 0px 0px'} undoHandler={() => undoHandler('padding')} title="Form Wrapper Padding" onChange={val => paddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
export default FormWrapperControlMenu
