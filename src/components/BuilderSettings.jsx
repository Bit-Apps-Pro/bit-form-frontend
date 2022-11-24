/* eslint-disable jsx-a11y/anchor-is-valid */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $breakpoint, $builderSettings } from '../GlobalStates/GlobalStates'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import ut from '../styles/2.utilities'
import { deleteNestedObj } from '../Utils/FormBuilderHelper'
import SizeControl from './CompSettings/StyleCustomize/ChildComp/SizeControl'
import { assignNestedObj, getNumFromStr, getStrFromStr, unitConverter } from './style-new/styleHelpers'
import Cooltip from './Utilities/Cooltip'
import Input from './Utilities/Input'
import Select from './Utilities/Select'

export default function BuilderSettings() {
  const { css } = useFela()
  const { formID } = useParams()
  const [staticStylesState, setStaticStyleState] = useRecoilState($staticStylesState)
  const breakpoints = useRecoilValue($breakpoint)
  const [brkpnt, setBrkpnt] = useState(breakpoints)
  const [{ atomicClassPrefix, darkModeConfig }, setBuilderSettings] = useRecoilState($builderSettings)
  let darkModePrefereceInitialValue = 'disabled'
  if (darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'system-preference'
  if (darkModeConfig.darkModeSelector) darkModePrefereceInitialValue = 'selector'
  if (darkModeConfig.darkModeSelector && darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'selector-and-system-preference'
  const breakPoints = {
    lg: 'lgLightStyles',
    md: 'mdLightStyles',
    sm: 'smLightStyles',
  }
  const [darkModePreference, setDarkModePreference] = useState(darkModePrefereceInitialValue)
  const formWidth = staticStylesState.styleMergeWithAtomicClasses[breakPoints[brkpnt]]?.form?.[`._frm-bg-${formID}`]?.width

  const handleDarkModePreference = (value) => {
    setDarkModePreference(value)
    if (value.match(/system-preference|selector-and-system-preference/g)) {
      setBuilderSettings(prv => ({
        ...prv,
        darkModeConfig: {
          ...prv.darkModeConfig,
          preferSystemColorScheme: true,
          darkModeSelector: value === 'system-preference'
            ? ''
            : prv.darkModeConfig.darkModeSelector,
        },
      }))
      return
    }
    setBuilderSettings(prv => ({
      ...prv,
      darkModeConfig: {
        ...prv.darkModeConfig,
        preferSystemColorScheme: false,
        darkModeSelector: value === 'disabled'
          ? ''
          : prv.darkModeConfig.darkModeSelector,
      },
    }))
  }

  const handleClassPrefix = (value) => {
    setBuilderSettings(prv => ({ ...prv, atomicClassPrefix: value }))
  }

  const handleDarkModeSelector = (value) => {
    setBuilderSettings(prv => ({
      ...prv,
      darkModeConfig: {
        ...prv.darkModeConfig,
        darkModeSelector: value,
      },
    }))
  }
  const handleValues = ({ value: val, unit }) => {
    const preUnit = getStrFromStr(formWidth)
    const convertValue = unitConverter(unit, val, preUnit)
    setStaticStyleState(preStyle => produce(preStyle, draft => {
      const brcpnt = breakPoints[brkpnt]
      const path = `styleMergeWithAtomicClasses->${brcpnt}->form->._frm-bg-${formID}->width`
      const value = convertValue + unit
      if (val === '') {
        deleteNestedObj(draft, path)
      } else {
        assignNestedObj(draft, path, value)
      }
    }))
  }

  return (
    <div className={css(ut.mt2, ut.p1)}>
      <div className={css({ flx: 'align-center', gap: '10px' })}>
        <SettingsBlock title="Form width">
          <SizeControl
            className={css(style.select)}
            width={250}
            inputHandler={handleValues}
            sizeHandler={({ unitKey, unitValue }) => handleValues({ value: unitValue, unit: unitKey })}
            value={(formWidth && getNumFromStr(formWidth)) || ''}
            unit={(formWidth && getStrFromStr(formWidth)) || ''}
            sliderWidth="40%"
            actualValue="auto"
          />

          <Select
            color="primary"
            value={brkpnt || 'md'}
            onChange={(value, e) => setBrkpnt(e)}
            options={[
              { label: 'sm', value: 'sm' },
              { label: 'md', value: 'md' },
              { label: 'lg', value: 'lg' },
            ]}
            w={60}
            className={css({ fs: 14, ml: 10 })}
          />
          <Cooltip>
            Add form width.
            {' '}
            <a className={css(ut.cooltipLearnMoreLink)} href="#">Learn More</a>
          </Cooltip>
        </SettingsBlock>
      </div>
      <SettingsBlock title="Atomic Class Prefix">
        <Input
          placeholder="Class Prefix"
          value={atomicClassPrefix}
          onChange={handleClassPrefix}
          onBlur={() => handleClassPrefix(atomicClassPrefix.trim())}
          w={250}
        />
        <Cooltip>
          Add prefix to atomic classes.
          {' '}
          <a className={css(ut.cooltipLearnMoreLink)} href="#">Learn More</a>
        </Cooltip>
      </SettingsBlock>

      <SettingsBlock title="Dark Mode">
        <Select
          color="primary"
          value={darkModePreference}
          onChange={handleDarkModePreference}
          options={[
            { label: 'Disabled', value: 'disabled' },
            { label: 'User system preference', value: 'system-preference' },
            { label: 'Parent selector', value: 'selector' },
            { label: 'Parent selector & user system preference', value: 'selector-and-system-preference' },
          ]}
          w={250}
        />
        {darkModePreference.match(/selector|selector-and-system-preference/g) && (
          <Input
            value={darkModeConfig.darkModeSelector}
            onChange={handleDarkModeSelector}
            onBlur={() => handleDarkModeSelector(darkModeConfig.darkModeSelector.trim())}
            className={css(ut.ml2)}
            w={250}
            placeholder="Selector"
          />
        )}

        <Cooltip>
          Set when dark mode style should be applied.
          <br />
          It may based on user system preference or parent class or attribute.
          <br />
          <a href="doclink for dark mode selector">Learn More</a>
        </Cooltip>

      </SettingsBlock>

    </div>
  )
}

const SettingsBlock = ({ title, children }) => {
  const { css } = useFela()
  return (
    <div className={css(ut.mt2, ut.flxc)}>
      <div className={css(ut.w1, { w: 150 })}>{title}</div>
      <div className={css(ut.flxc)}>
        {children}
      </div>
    </div>
  )
}

const style = {
  select: {
    brs: '8px',
    bd: 'var(--b-79-96) !important',
    h: '35px',
    b: '1px solid rgb(230, 230, 230) !important',
  },
}
