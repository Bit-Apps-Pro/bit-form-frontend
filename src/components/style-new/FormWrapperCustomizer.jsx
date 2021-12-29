/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $colorScheme, $styles } from '../../GlobalStates'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { __ } from '../../Utils/i18nwrap'
import CssPropertyList from './CssPropertyList'
import editorConfig from './NewStyleEditorConfig'
import SpacingControl from './SpacingControl'
import { arrDiff } from './styleHelpers'

export default function FormWrapperCustomizer() {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const colorScheme = useRecoilValue($colorScheme)
  const formWrpStylesObj = styles.form[colorScheme]['_frm-bg']
  const formWrpStylesPropertiesArr = Object.keys(formWrpStylesObj)

  const addableCssProps = arrDiff(formWrpStylesPropertiesArr, Object.keys(editorConfig.formWrapper.properties))

  const delPropertyHandler = (property) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      delete drft.form[colorScheme]['_frm-bg'][property]
    }))
  }

  const setNewCssProp = (prop) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      drft.form[colorScheme]['_frm-bg'][prop] = editorConfig.defaultProps[prop]
    }))
  }

  const getStateNameAndPath = (property) => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: `form->${colorScheme}->_frm-bg->margin` },
        ...property === 'padding' && { padding: `form->${colorScheme}->_frm-bg->padding` },
      },
    }
  )

  return (
    <div className={css(ut.ml2, { pn: 'relative' })}>

      {formWrpStylesPropertiesArr.includes('padding') && (
        <div className={css(ut.flxcb, ut.mt2, sc.propsElemContainer)}>
          <div className={css(ut.flxc, ut.ml1)}>
            <button
              title="Delete Property"
              onClick={() => delPropertyHandler('padding')}
              className={`${css(sc.propsDelBtn)} delete-btn`}
              type="button"
            >
              <TrashIcn size="14" />
            </button>
            <span className={css(ut.fw500)}>{__('Padding', 'bitform')}</span>
          </div>
          <SpacingControl
            allowImportant
            action={{ type: 'spacing-control' }}
            subtitle="Form wrapper padding"
            objectPaths={getStateNameAndPath('padding')}
            id="padding-control"
          />
        </div>
      )}
      {formWrpStylesPropertiesArr.includes('margin') && (
        <div className={css(ut.flxcb, ut.mt2, sc.propsElemContainer)}>
          <div className={css(ut.flxc, ut.ml1)}>
            <button
              title="Delete Property"
              onClick={() => delPropertyHandler('margin')}
              className={`${css(sc.propsDelBtn)} delete-btn`}
              type="button"
            >
              <TrashIcn size="14" />
            </button>
            <span className={css(ut.fw500)}>{__('Margin', 'bitform')}</span>
          </div>
          <SpacingControl
            allowImportant
            action={{ type: 'spacing-control' }}
            subtitle="Form wrapper margin"
            objectPaths={getStateNameAndPath('margin')}
            id="margin-control"
          />
        </div>
      )}

      <div className={css(ut.m10)}>
        {/* <SimpleColorPicker
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
        </div> */}
      </div>

      <CssPropertyList properties={addableCssProps} setProperty={setNewCssProp} />

    </div>
  )
}
