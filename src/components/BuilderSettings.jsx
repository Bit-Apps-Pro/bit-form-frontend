import { useFela } from 'react-fela'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import ut from '../styles/2.utilities'
import Select from './Utilities/Select'
import Input from './Utilities/Input'
import Cooltip from './Utilities/Cooltip'
import { $builderSettings } from '../GlobalStates/GlobalStates'

export default function BuilderSettings() {
  const { css } = useFela()
  const [{ atomicClassPrefix, darkModeConfig }, setBuilderSettings] = useRecoilState($builderSettings)
  let darkModePrefereceInitialValue = 'disabled'
  if (darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'system-preference'
  if (darkModeConfig.darkModeSelector) darkModePrefereceInitialValue = 'selector'
  if (darkModeConfig.darkModeSelector && darkModeConfig.preferSystemColorScheme) darkModePrefereceInitialValue = 'selector-and-system-preference'

  const [darkModePreference, setDarkModePreference] = useState(darkModePrefereceInitialValue)

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

  return (
    <div className={css(ut.mt2, ut.p1)}>
      <SettingsBlock title="Atomic Class Prefix">
        <Input
          placeholder="Class Prefix"
          value={atomicClassPrefix}
          onChange={handleClassPrefix}
          onBlur={() => handleClassPrefix(atomicClassPrefix.trim())}
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
        />
        {darkModePreference.match(/selector|selector-and-system-preference/g) && (
          <Input
            value={darkModeConfig.darkModeSelector}
            onChange={handleDarkModeSelector}
            onBlur={() => handleDarkModeSelector(darkModeConfig.darkModeSelector.trim())}
            className={css(ut.ml2)}
            w={150}
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

const s = {}
