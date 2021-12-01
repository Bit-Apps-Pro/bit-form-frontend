import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import ut from '../../styles/2.utilities'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'

export default function StyleLayers() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const history = useHistory()

  const styleHandler = ({ target: { value: customstyle } }) => {
    history.push(`/form/builder/${formType}/${formID}/theme-customize/${customstyle}`)
  }

  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Layers & asdasd</h4>
      <div className={css(ut.divider)} />

      <LayerAccordion title="Texfield">
        <LayerAccordion title="Container" offset={1}>
          <LayerAccordion title="Label & Sub Label Container" offset={2}>
            asdasdasdf asdf asdfasdfasdf
          </LayerAccordion>
        </LayerAccordion>
      </LayerAccordion>
      <LayerAccordion title="Checkbox">
        asdasdasdf asdf asdfasdfasdf
      </LayerAccordion>
      <button type="button" value="theme-customization" onClick={styleHandler}>Form Theme Customization</button>
      {' '}
      <br />
      <button type="button" value="field-container" onClick={styleHandler}>Field Container</button>
      {' '}
      <br />
      <button type="button" value="label-subtitle-container" onClick={styleHandler}>Label Subtitle Container</button>
      {' '}
      <br />
      <button type="button" value="label" onClick={styleHandler}>Label</button>
      {' '}
      <br />
      <button type="button" value="subtitle" onClick={styleHandler}>Sub Title</button>
      {' '}
      <br />
      <button type="button" value="helper-text" onClick={styleHandler}>Helper Text</button>
      {' '}
      <br />
      <button type="button" value="error-messages" onClick={styleHandler}>Error Messages</button>
    </div>
  )
}

const s = {
  con: {
    ff: 'Roboto, sans-serif',
    mxw: 250,
    h: '100%',
    bs: '0 0 0 1px var(--b-44-87)',
    ow: 'hidden',
    '& .toggle-icn': { oy: '0' },
    ':hover': { '& .toggle-icn': { oy: '1' } },
  },
  title: {
    ff: '"Montserrat", sans-serif',
    mt: 7,
    bs: 'none',
    mb: 10,
    mx: 8,
  },
}
