/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $colorScheme } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj, deleteNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import CssPropertyList from './CssPropertyList'
import IndividualShadowControl from './IndividualShadowControl'
import editorConfig from './NewStyleEditorConfig'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import TransitionControl from './TransitionControl'

export default function FormWrapperCustomizer() {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const colorScheme = useRecoilValue($colorScheme)
  const formWrpStylesObj = styles.form[colorScheme]['_frm-bg']
  const formWrpStylesPropertiesArr = Object.keys(formWrpStylesObj)

  const addableCssProps = Object
    .keys(editorConfig.formWrapper.properties)
    .filter(x => !formWrpStylesPropertiesArr.includes(x))

  const getPropertyPath = (cssProperty) => `form->${colorScheme}->_frm-bg->${cssProperty}`

  const delPropertyHandler = (property) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      if (Array.isArray(property)) {
        property.forEach(prop => deleteNestedObj(drft, getPropertyPath(prop)))
      } else {
        deleteNestedObj(drft, getPropertyPath(property))
      }
    }))
  }

  const setNewCssProp = (prop) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      assignNestedObj(drft, getPropertyPath(prop), editorConfig.defaultProps[prop])
    }))
  }

  const getStateNameAndPath = (property) => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: getPropertyPath('margin') },
        ...property === 'padding' && { padding: getPropertyPath('padding') },
      },
    }
  )

  const clearHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath(property), '')
    }))
  }

  const fwStylePathObj = {
    object: 'styles',
    borderObjName: 'styles',
    paths: { border: getPropertyPath('border'), borderWidth: getPropertyPath('border-width') },
  }

  return (
    <div className={css(ut.ml2, { pn: 'relative' })}>
      {
        formWrpStylesPropertiesArr.includes('background') && (
          <SimpleColorPicker
            title="Background"
            subtitle="Background Color"
            value={formWrpStylesObj?.background}
            modalId="field-container-backgroung"
            stateObjName="styles"
            propertyPath={getPropertyPath('background')}
            deleteable
            delPropertyHandler={() => delPropertyHandler('background')}
            clearHandler={() => clearHandler('background')}
            allowImportant
          />
        )
      }
      {
        formWrpStylesPropertiesArr.includes('color') && (
          <SimpleColorPicker
            title="Color"
            subtitle="Color"
            value={formWrpStylesObj?.color}
            modalId="field-container-color"
            stateObjName="styles"
            propertyPath={getPropertyPath('color')}
            deleteable
            delPropertyHandler={() => delPropertyHandler('color')}
            clearHandler={() => clearHandler('color')}
            allowImportant
          />
        )
      }
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
      {formWrpStylesPropertiesArr.includes('box-shadow') && (
        <IndividualShadowControl
          title="Box-shadow"
          subtitle="Box-shadow"
          value={formWrpStylesObj?.['box-shadow']}
          modalId="field-container-box-shadow"
          stateObjName="styles"
          propertyPath={getPropertyPath('box-shadow')}
          deleteable
          delPropertyHandler={() => delPropertyHandler('box-shadow')}
          clearHandler={() => clearHandler('box-shadow')}
          allowImportant
        />
      )}
      {formWrpStylesPropertiesArr.includes('border') && (
        <div className={css(ut.flxcb, ut.mt2, sc.propsElemContainer)}>
          <div className={css(ut.flxc, ut.ml1)}>
            <button
              title="Delete Property"
              onClick={() => delPropertyHandler(['border', 'border-width'])}
              className={`${css(sc.propsDelBtn)} delete-btn`}
              type="button"
            >
              <TrashIcn size="14" />
            </button>
            <span className={css(ut.fw500)}>{__('Border', 'bitform')}</span>
          </div>
          <ResetStyle
            propertyPath={[getPropertyPath('border'), getPropertyPath('border-width')]}
            stateObjName="styles"
          />
          <BorderControl
            subtitle="Field Container Border"
            value={formWrpStylesObj?.border}
            objectPaths={fwStylePathObj}
            id="fld-wrp-bdr"
          />
        </div>
      )}
      {formWrpStylesPropertiesArr.includes('transition') && (
        <TransitionControl
          title="Transition"
          subtitle="Transition"
          value={formWrpStylesObj?.transition}
          modalId="field-container-transition"
          stateObjName="styles"
          propertyPath={getPropertyPath('transition')}
          deleteable
          delPropertyHandler={() => delPropertyHandler('transition')}
          clearHandler={() => clearHandler('transition')}
          allowImportant
        />
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