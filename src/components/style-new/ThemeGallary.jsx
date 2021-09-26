import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import EditIcn from '../../Icons/EditIcn'
import EyeIcon from '../../Icons/EyeIcon'

export default function ThemeGallary() {
  const { css } = useFela()
  const { formType, formID } = useParams()

  return (
    <div className={css(themeGalStyle.wrp)}>
      <h4 className={css(themeGalStyle.title)}>Themes</h4>
      <div className={css(themeGalStyle.thm_container)}>
        <div className={css(themeGalStyle.thm_wrp)}>
          <div className={css(themeGalStyle.thm_btn)}>
            <div data-thm-ctrl-wrp className={css(themeGalStyle.thm_control_wrp)}>
              <button type="button" className={css(themeGalStyle.thm_ctrl_btn)} aria-label="Theme Preview">
                <EyeIcon size="20" />
              </button>
              <Link to={`/form/builder/${formType}/${formID}/theme-customize`} type="button" className={css(themeGalStyle.thm_ctrl_btn)} aria-label="Theme Customize">
                <EditIcn size="20" stroke="2.2" />
              </Link>
            </div>
            <img
              className={css(themeGalStyle.thmImg)}
              width="120"
              height="147.64"
              alt="Theme thumbnail"
              src="https://raw.githubusercontent.com/Bit-Apps-Pro/bitform-resourses/main/theme-thumbnails/defaultTheme.svg"
            />
          </div>
          <span className={css(themeGalStyle.thm_name)}>Default</span>
        </div>
      </div>
    </div>
  )
}

const themeGalStyle = {
  wrp: { bd: 'var(--white-100)' },
  title: {
    mt: 10,
    mb: 5,
  },
  thmImg: { dy: 'block' },
  thm_container: {
    flx: 1,
    flxp: 'jc',
  },
  thm_wrp: {
    w: 124,
    h: 170,
    flxi: 1,
    fd: 'column',
    mx: 5,
    mt: 10,
  },
  thm_btn: {
    pn: 'relative',
    curp: 1, 
    b: '2px solid var(--white-0-83)',
    brs: 8,
    p: 0,
    bd: 'var(--white-100)',
    ow: 'hidden',
    ':hover': {
      bcr: 'var(--white-0-50)',
      '& div[data-thm-ctrl-wrp]': { oy: '1 !important', visibility: 'visible' },
    },
  },
  thm_name: {
    fs: 13,
    mt: 4,
  },
  thm_control_wrp: {
    pn: 'absolute',
    w: '100%',
    h: '100%',
    bd: '#1a1b318c',
    backdropFilter: 'blur(2px)',
    flx: 'center',
    oy: 0,
    visibility: 'hidden',
    tn: 'opacity .3s',
  },
  thm_ctrl_btn: {
    p: 0,
    brs: '50%',
    w: 30,
    h: 30,
    b: '1px solid gray',
    flx: 'center',
    mx: 2,
    curp: 1, 
    cr: 'var(--b-54-12)',
    bd: 'var(--white-0-95)',
    ':hover': {
      cr: 'var(--b-50)',
      bd: 'var(--white-100)',
    },
  },
}
