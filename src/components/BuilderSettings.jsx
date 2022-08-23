import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $builderSettings } from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import ut from '../styles/2.utilities'
import SizeControl from './CompSettings/StyleCustomize/ChildComp/SizeControl'
import { getNumFromStr, getStrFromStr, unitConverter } from './style-new/styleHelpers'
import Cooltip from './Utilities/Cooltip'
import Input from './Utilities/Input'
import Select from './Utilities/Select'

export default function BuilderSettings() {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const [{ atomicClassPrefix, darkModeConfig }, setBuilderSettings] = useRecoilState($builderSettings)
  let darkModePrefereceInitialValue = 'disabled'
  if (darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'system-preference'
  if (darkModeConfig.darkModeSelector) darkModePrefereceInitialValue = 'selector'
  if (darkModeConfig.darkModeSelector && darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'selector-and-system-preference'

  const [darkModePreference, setDarkModePreference] = useState(darkModePrefereceInitialValue)
  const formWidth = styles.form['._frm-bg']?.width

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
    const convertvalue = unitConverter(unit, val, preUnit)
    setStyles(preStyle => produce(preStyle, draft => {
      draft.form['._frm-bg'].width = convertvalue + unit
    }))
  }

  return (
    <div className={css(ut.mt2, ut.p1)}>
      <SettingsBlock title="Add form width">
        <SizeControl
          customStyle={style}
          width={250}
          inputHandler={handleValues}
          sizeHandler={({ unitKey, unitValue }) => handleValues({ value: unitValue, unit: unitKey })}
          value={formWidth && getNumFromStr(formWidth)}
          unit={formWidth && getStrFromStr(formWidth)}
        />
        <Cooltip>
          Add form width.
          {' '}
          <a className={css(ut.cooltipLearnMoreLink)} href="doclink for form width">Learn More</a>
        </Cooltip>
      </SettingsBlock>
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
          <a className={css(ut.cooltipLearnMoreLink)} href="doclink for class prefix">Learn More</a>
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
  borderRadius: '8px',
  background: 'var(--b-79-96) !important',
  height: '35px',
  border: '1px solid rgb(230, 230, 230) !important',
}
