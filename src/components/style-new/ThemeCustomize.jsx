import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import ut from '../../styles/2.utilities'
import ChevronLeft from '../../Icons/ChevronLeft'
import SimpleColorPicker from './SimpleColorPicker'
import { $styles } from '../../GlobalStates'
import SingleToggle from '../Utilities/SingleToggle'
import produce from 'immer'
import { changeFormDir } from './styleHelpers'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  // const [h,s,l/]
  const globalPrimaryColor = styles.themeVars['--global-primary-color']
  const direction = styles.themeVars['--dir']
  // console.log()



  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
  }

  return (
    <div className={css(cls.mainWrapper)}>
      <span className={css({ flxi: 'center', mt: 10 })}>
        <Link to={`/form/builder/${formType}/${formID}/themes`} className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}>
          <ChevronLeft size="14" />
          {' '}
          Themes /
          {' '}
        </Link>
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      </span>
      <h4 className={css(cls.title)}>Theme Customize</h4>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <br />
        <div className={css(cls.container)}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Form Background</span>
            <SimpleColorPicker subtitle="Theme Primary Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Primary Color</span>
            <SimpleColorPicker value={globalPrimaryColor} action={{ type: 'global-primary-color' }} />
          </div>

          <div className={css(cls.divider)} />


        </div>
        <div className={css({ mr: 15 })}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
            <SingleToggle isChecked={direction === 'rtl'} action={handleDir} />
          </div>
        </div>
      </div>
    </div>
  )
}

const cls = {
  title: { mt: 5, mb: 2 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 14 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  container: { ml: 12, mr: 15 },
}
