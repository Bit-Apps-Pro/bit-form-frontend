import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $colorScheme } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function FieldContainerCustomizer() {
  const themeColors = useRecoilValue($themeColors)
  const themeVars = useRecoilValue($themeVars)
  const colorScheme = useRecoilValue($colorScheme)
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const formWrpStylesObj = styles.form[colorScheme]['_frm-bg']
  const formWrpStylesPropertiesArr = Object.keys(formWrpStylesObj)

  console.log(styles)

  const { '--fld-wrp-m': wrpMagin,
    '--fld-wrp-p': wrpPadding } = themeVars

  const { '--fld-wrp-bg': fwBg,
    '--fld-wrp-bdr': fwBdr,
    '--fld-wrp-sh': fwSh } = themeColors

  // const addableCssProps = Object
  //   .keys(editorConfig.formWrapper.properties)
  //   .filter(x => !formWrpStylesPropertiesArr.includes(x))

  // const setNewCssProp = (prop) => {
  //   setStyles(prvStyles => produce(prvStyles, drft => {
  //     drft.form[colorScheme]['_frm-bg'][prop] = editorConfig.defaultProps[prop]
  //   }))
  // }

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background colors"
        subtitle="Field Background Color"
        value={fwBg}
        stateObjName="themeColors"
        propertyPath="--fld-wrp-bg"
        modalId="fld-wp-bg"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          value={{ margin: wrpMagin, padding: wrpPadding }}
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={fldWrapperObj}
          id="spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fldwrpShPathObj.paths.shadow}
            stateObjName={fldwrpShPathObj.object}
          />
          <ShadowControl
            subtitle="Field Container Shadow"
            value={fwSh}
            objectPaths={fldwrpShPathObj}
            id="fld-wrp-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--fld-wrp-bdr', '--fld-wrp-bdr-width', '--fld-wrp-bdr-rad']}
            propertyPath={['--fld-wrp-bdr-width', '--fld-wrp-bdr-rad']}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Field Container Border"
            value={fwBdr}
            objectPaths={fwStylePathObj}
            id="fld-wrp-bdr"
          />
        </div>
      </ThemeStylePropertyBlock>
      {/* <CssPropertyList properties={addableCssProps} setProperty={setNewCssProp} /> */}
    </div>
  )
}

const fldWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--fld-wrp-m', padding: '--fld-wrp-p' },
}
const fldwrpShPathObj = {
  object: 'themeColors',
  paths: { shadow: '--fld-wrp-sh' },
}
const fwStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--fld-wrp-bdr', borderWidth: '--fld-wrp-bdr-width', borderRadius: '--fld-wrp-bdr-rad' },
}
