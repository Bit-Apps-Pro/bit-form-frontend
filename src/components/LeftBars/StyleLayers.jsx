import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'

export default function StyleLayers() {
  const { css } = useFela()
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
