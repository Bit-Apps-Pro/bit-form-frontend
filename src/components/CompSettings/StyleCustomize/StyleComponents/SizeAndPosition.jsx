import { useFela } from 'react-fela'
import ut from '../../../../styles/2.utilities'
import FieldStyle from '../../../../styles/FieldStyle.style'
import SimpleAccordion from '../ChildComp/SimpleAccordion'

function SizeAndPosition() {
  const { css } = useFela()

  return (
    <SimpleAccordion
      title="Sizes & Positions"
      className={css(FieldStyle.fieldSection)}
    >
      <div className={css(s.fd)}>
        <label className={css(ut.w5, s.label)} htmlFor="x">
          <span className={css(s.name)}>X</span>
          <input aria-label="" placeholder="" className={css(ut.w8, s.input)} id="x" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="w">
          <span className={css(s.name)}>W</span>
          <input aria-label="" placeholder="" className={css(ut.w8, s.input)} id="w" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="y">
          <span className={css(s.name)}>Y</span>
          <input aria-label="" placeholder="" className={css(ut.w8, s.input)} id="y" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="h">
          <span className={css(s.name)}>H</span>
          <input aria-label="" placeholder="" className={css(ut.w8, s.input)} id="h" type="number" />
        </label>
      </div>
    </SimpleAccordion>
  )
}

export default SizeAndPosition
const s = {
  fd: {
    flx: 'center',
    flxp: 1,
    m: 10,
  },
  label: {
    pn: 'relative',
    mb: 20,
  },
  name: {
    pn: 'absolute',
    tp: 8,
    lt: 10,
    fw: 500,
  },
  input: {
    pl: '30px !important',
    oe: 'none !important',
    b: 'none !important',
    tn: 'background o.2s',
    brs: '8px !important',
    '&:hover': { bd: 'var(--white-0-81-32)' },
    '&:focus': { b: '1px solid var(--b-59) !important' },
  },
}
