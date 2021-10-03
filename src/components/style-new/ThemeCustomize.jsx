import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import ut from '../../styles/2.utilities'
import SimpleColorPicker from './SimpleColorPicker'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()

  return (
    <div className={css(cls.mainWrapper)}>
      <h4 className={css(cls.title)}>Theme Customize</h4>
      <Link to={`/form/builder/${formType}/${formID}/themes`} className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}>Themes / </Link>
      <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <br />
        <div className={css(cls.container)}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Primary Color</span>
            <SimpleColorPicker />
          </div>
        </div>
      </div>
    </div>
  )
}

const cls = {
  title: { mt: 10, mb: 2 },
  breadcumbLink: { fs: 11, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 14 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  container: { ml: 12, mr: 15 }
}