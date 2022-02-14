import { useFela } from 'react-fela'
import CloseIcn from '../../Icons/CloseIcn'
import { firstLetterUpper } from '../../Utils/Helpers'
import Downmenu from '../Utilities/Downmenu'

export default function CssPropertyList({ properties, setProperty }) {
  const { css } = useFela()

  const decorateLabel = (label) => firstLetterUpper(label.split('-').join(' '))

  return (
    <div className={css(s.wrp)}>
      <Downmenu>
        <button
          className={css(s.addBtn)}
          type="button"
          aria-label="Add Style Property"
        >
          <CloseIcn size="12" className={css({ tm: 'rotate(45deg)' })} />
        </button>
        <ul className={css(s.con)}>
          {properties?.map((prop, indx) => (
            <li key={`css-property- list-${indx * 2}`} className={css(s.item)}>
              <button
                type="button"
                className={css(s.itemBtn)}
                onClick={() => setProperty(prop)}
              >
                {decorateLabel(prop)}
              </button>
            </li>
          ))}
        </ul>
      </Downmenu>
    </div>
  )
}
const s = {
  wrp: { mt: 10, flx: 'center', '& .tippy-content': { p: 0 } },
  addBtn: {
    se: 25,
    b: 'none',
    brs: '50%',
    p: 0,
    flxi: 'center',
    bd: 'var(--white-0-95)',
    curp: 1,
    tn: 'transform 0.2s',
    ':hover': { tm: 'scale(1.1)', cr: 'var(--b-50)' },
    ':active': { tm: 'scale(0.95)' },
  },
  con: { m: 0, p: 4 },
  item: { dy: 'block', m: 0 },
  itemBtn: {
    m: 0,
    brs: 6,
    curp: 1,
    tn: 'background .3s',
    py: 3,
    px: 10,
    fw: 500,
    b: 'none',
    w: '100%',
    bd: 'none',
    ta: 'left',
    ':hover': { bd: 'var(--white-0-95)' },
  },
}
