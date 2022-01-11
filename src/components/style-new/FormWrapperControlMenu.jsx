/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

function FormWrapperControlMenu() {
  const [styleVars, setStyleVars] = useRecoilState($styles)
  const { _frm } = styleVars.form

  const marginHandler = (value) => {
    setStyleVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle.form._frm.margin = `${value}`
    }))
  }

  const paddingHandler = (value) => {
    setStyleVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle.form._frm.padding = `${value}`
    }))
  }

  const undoHandler = (value) => {
    setStyleVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle.form._frm[value] = '0px 0px 0px 0px'
    }))
  }
  return (
    <>
      <SpaceControl isResetable={_frm?.margin} value={_frm?.margin || '0px 0px 0px 0px'} undoHandler={() => undoHandler('margin')} title="Form Wrapper Margin" onChange={val => marginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl isResetable={_frm?.padding} value={_frm?.padding || '0px 0px 0px 0px'} undoHandler={() => undoHandler('padding')} title="Form Wrapper Padding" onChange={val => paddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
export default FormWrapperControlMenu
