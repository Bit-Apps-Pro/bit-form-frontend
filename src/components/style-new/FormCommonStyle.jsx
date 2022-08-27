/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import ut from '../../styles/2.utilities'
import { addToBuilderHistory, assignNestedObj, deleteNestedObj, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import BackgroundControl from './BackgroundControl'
import BorderControl from './BorderControl'
import CssPropertyList from './CssPropertyList'
import IndividualShadowControl from './IndividualShadowControl'
import editorConfig from './NewStyleEditorConfig'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import StylePropertyBlock from './StylePropertyBlock'
import TransitionControl from './TransitionControl'

export default function FormCommonStyle({ element, componentTitle }) {
  const { css } = useFela()
  const { fieldKey, formID } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  const elemn = `.${element}-${formID}`
  const formWrpStylesObj = styles.form[elemn]
  const formWrpStylesPropertiesArr = Object.keys(formWrpStylesObj)

  const addableCssProps = Object
    .keys(editorConfig[element].properties)
    .filter(x => !formWrpStylesPropertiesArr.includes(x))

  const getPropertyPath = (cssProperty) => `form->${elemn}->${cssProperty}`

  const delPropertyHandler = (property) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      if (Array.isArray(property)) {
        property.forEach(prop => deleteNestedObj(drft, getPropertyPath(prop)))
      } else {
        deleteNestedObj(drft, getPropertyPath(property))
      }
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, `Delete ${property}`, '', { styles: getLatestState('styles') }))
  }

  const setNewCssProp = (prop) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      assignNestedObj(drft, getPropertyPath(prop), editorConfig.defaultProps[prop])
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, prop, editorConfig.defaultProps[prop], { styles: getLatestState('styles') }))
  }

  const clearHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (Array.isArray(property)) {
        property.forEach(prop => assignNestedObj(drft, getPropertyPath(prop), ''))
      } else {
        assignNestedObj(drft, getPropertyPath(property), '')
      }
    }))
    if (Array.isArray(property)) {
      addToBuilderHistory(generateHistoryData(element, fieldKey, `${property[0]} Clear`, '', { styles: getLatestState('styles') }))
    } else {
      addToBuilderHistory(generateHistoryData(element, fieldKey, `${property} Clear`, '', { styles: getLatestState('styles') }))
    }
  }

  const getCssProps = (prop) => {
    const objPaths = {
      object: 'styles',
      paths: {},
    }

    const configProperty = editorConfig[element].properties[prop]
    let propertyKeys = [prop]
    if (typeof configProperty === 'object') {
      propertyKeys = Object.keys(configProperty)
      propertyKeys.map(propName => {
        objPaths.paths[propName] = getPropertyPath(propName)
      })
    } else {
      objPaths.paths[prop] = getPropertyPath(prop)
    }

    const bgPropArr = [
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'backdrop-filter',
    ]

    switch (prop) {
      case 'background-color':
        return (
          <SimpleColorPicker
            title="Background Color"
            subtitle={`${componentTitle} Background Color`}
            value={formWrpStylesObj?.['background-color']}
            modalId={`${element}-cnr-bdc`}
            stateObjName="styles"
            propertyPath={objPaths.paths?.['background-color']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('background-color')}
            clearHandler={() => clearHandler('background-color')}
            allowImportant
            canSetVariable
          />
        )

      case 'background':
        return (
          <BackgroundControl
            title="Background"
            subtitle={`${componentTitle} Background`}
            value={formWrpStylesObj?.['background-image']}
            modalId={`${element}-cnr-bd`}
            stateObjName="styles"
            objectPaths={objPaths}
            deleteable
            delPropertyHandler={() => delPropertyHandler([...bgPropArr, 'background'])}
            clearHandler={() => clearHandler(bgPropArr)}
            allowImportant
          />
        )
      case 'color':
        return (
          <SimpleColorPicker
            title="Color"
            subtitle={`${componentTitle} Color`}
            value={formWrpStylesObj?.color}
            modalId={`${element}-cnr-clr`}
            stateObjName="styles"
            propertyPath={objPaths.paths.color}
            deleteable
            delPropertyHandler={() => delPropertyHandler('color')}
            clearHandler={() => clearHandler('color')}
            allowImportant
            canSetVariable
          />
        )
      case 'padding':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('padding')}
            title="Padding"
          >
            <SpacingControl
              mainTitle="Padding"
              allowImportant
              action={{ type: 'spacing-control' }}
              subtitle={`${componentTitle} Padding`}
              objectPaths={objPaths}
              id={`${element}-paddn-ctrl`}
            />
          </StylePropertyBlock>
        )
      case 'margin':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('margin')}
            title="Margin"
          >
            <SpacingControl
              mainTitle="Margin"
              allowImportant
              action={{ type: 'spacing-control' }}
              subtitle={`${componentTitle} Margin`}
              objectPaths={objPaths}
              id={`${element}-mrg-ctrl`}
            />
          </StylePropertyBlock>
        )
      case 'box-shadow':
        return (
          <IndividualShadowControl
            title="Box-shadow"
            subtitle={`${componentTitle} Box Shadow`}
            value={formWrpStylesObj?.['box-shadow']}
            modalId={`${element}-cnr-box-shd`}
            stateObjName="styles"
            propertyPath={objPaths.paths['box-shadow']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('box-shadow')}
            clearHandler={() => clearHandler('box-shadow')}
            allowImportant
          />
        )
      case 'border':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('border')}
            title="Border"
          >
            <span className={css(ut.flxc)}>
              <ResetStyle
                propertyPath={[String(Object.values(objPaths.paths))]}
                stateObjName="styles"
              />
              <BorderControl
                subtitle={`${componentTitle} Border`}
                objectPaths={objPaths}
                id={`${element}-bdr-ctrl`}
              />
            </span>
          </StylePropertyBlock>
        )
      case 'transition':
        return (
          <TransitionControl
            title="Transition"
            subtitle={`${componentTitle} Transition`}
            value={formWrpStylesObj?.transition}
            modalId={`${element}-cnr-trnsn`}
            stateObjName="styles"
            propertyPath={getPropertyPath('transition')}
            deleteable
            delPropertyHandler={() => delPropertyHandler('transition')}
            clearHandler={() => clearHandler('transition')}
            allowImportant
          />
        )
      default:
        break
    }
  }
  return (
    <div className={css(ut.ml2, { pn: 'relative' })}>
      {formWrpStylesPropertiesArr.map((prop, indx) => (
        <div key={`css-property-${indx + 3 * 2}`}>
          {getCssProps(prop)}
        </div>
      ))}
      {
        addableCssProps.length > 0
        && (
          <CssPropertyList id={`${element}-prop`} properties={addableCssProps} setProperty={setNewCssProp} />
        )
      }
    </div>
  )
}
