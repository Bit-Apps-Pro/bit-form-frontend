import React, { useEffect } from 'react'
import SlimSelect from 'slim-select'
import { Responsive, WidthProvider } from 'react-grid-layout'
import CompGen from '../components/CompGen'

export default function Bitapps(props) {
  const FormLayout = WidthProvider(Responsive);
  const blk = (field) => (
    <div
      key={field.i}
      className="blk"
      btcd-id={field.i}
      data-grid={field}
      role="button"
      tabIndex={0}
    >
      <CompGen atts={props.data[field.i]} />
    </div>
  )
  useEffect(() => {
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
      // eslint-disable-next-line no-unused-vars
        const s = new SlimSelect({
          select: `[btcd-id="${allSel[i].parentNode.parentNode.getAttribute(
            'btcd-id',
          )}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute('placeholder'),
          limit: Number(allSel[i].getAttribute('limit')),
        })

        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[i].nextSibling.children[1].children[1].style.maxHeight = `${Number(allSel[i].getAttribute('data-max-show')) * 2}pc`
          }
        }
      }
    }
  }, [])
  console.log('LAY', props.data['b-0'])
  return (
    <div style={{ width: '100%' }} className="layout-wrapper">
      <form encType={props.file ? 'multipart/form-data' : ''}>
        <FormLayout
          layouts={props.layout}
          cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
          rowHeight={40}
          margin={[0, 0]}
        >
          {props.layout.map(field => {
            // eslint-disable-next-line no-param-reassign
            field.static = true
            return blk(field)
          })}
        </FormLayout>
      </form>
    </div>
  )
}
