import { useAtomValue } from 'jotai'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { $bits } from '../GlobalStates/GlobalStates'
import ExternalLinkIcn from '../Icons/ExternalLinkIcn'
import ut from '../styles/2.utilities'

export default function FormPreviewBtn() {
  const { css } = useFela()
  const { formID } = useParams()
  const bits = useAtomValue($bits)

  return (
    <a href={`${bits.siteURL}/bitform-form-view/${formID}`} target="_blank" className={css(style.shareIcn)} rel="noreferrer">
      <span>Preview</span>
      <ExternalLinkIcn size={13} className={css(ut.ml1)} />
    </a>
  )
}

const style = {
  title: {
    fs: 14,
    mb: 5,
    fw: 600,
  },
  shareIcn: {
    bd: 'none',
    px: 15,
    py: 7,
    oe: 'none',
    b: 'none',
    cr: 'var(--white-100)',
    flx: 'align-center',
    fs: 12,
    fw: 400,
    tn: 'background 0.2s',
    my: 5,
    brs: 8,
    curp: 1,
    ':hover': { bd: 'var(--b-35-33)', cr: 'var(--white-100)' },
    ':visited': { bd: 'var(--b-35-33)', cr: 'var(--white-100)' },
  },
  downmenu: {
    w: 200,
    px: 5,
    py: 8,
  },
  downmenuinput: {
    w: '100% !important',
    fs: 12,
  },
}
