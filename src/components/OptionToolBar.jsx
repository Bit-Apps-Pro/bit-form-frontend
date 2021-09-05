/* eslint-disable jsx-a11y/control-has-associated-label */
import { useFela } from 'react-fela'
import AddIcon from '../Icons/AddIcon'
import EllipsisIcon from '../Icons/EllipsisIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import TabletIcon from '../Icons/TabletIcon'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import FormBuilderHistory from './FormBuilderHistory'

export default function OptionToolBar({ setResponsiveView }) {
  const { css } = useFela()
  return (
    <div className={css(OptionToolBarStyle.optionToolBar)}>
      <div className={css(OptionToolBarStyle.form_section)}>
        <div className={`${css(OptionToolBarStyle.field_btn)} __active`}>
          <AddIcon size="25" />
          <span className={css(OptionToolBarStyle.txt)}>Form Fields</span>
        </div>
        <div className={css(OptionToolBarStyle.option_section)}>
          <div className={css(OptionToolBarStyle.devices)}>
            <button onClick={() => setResponsiveView('lg')} className={`${css(OptionToolBarStyle.device_btn)} active`} type="button"><LaptopIcn w="35" h="32" /></button>
            <button onClick={() => setResponsiveView('md')} className={css(OptionToolBarStyle.device_btn)} type="button"><TabletIcon w="25" h="23" /></button>
            <button onClick={() => setResponsiveView('sm')} className={css(OptionToolBarStyle.device_btn)} type="button"><MobileIcon size="25" /></button>
            <button className={css(OptionToolBarStyle.device_btn)} type="button"><EllipsisIcon size="30" /></button>
          </div>
          <div className={css(OptionToolBarStyle.border_right)} />
          <FormBuilderHistory />
        </div>
      </div>
      <div className="theme-section" />
    </div>
  )
}
