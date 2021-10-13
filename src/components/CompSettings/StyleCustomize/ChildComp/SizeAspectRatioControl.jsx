import { useState } from 'react'
import { useFela } from 'react-fela'
import ut from '../../../../styles/2.utilities'
import sizeAspectRatioControlStyle from '../../../../styles/sizeAspectRatioControl.style'
import SizeControl from './SizeControl'

export default function SizeAspectRatioControl({ options, className }) {
  const { css } = useFela()
  const [aspectRatioMode, setAspectRatioMode] = useState(false)

  const calculatePaddedNewAspectRatio = (rW, rH, cW, cH) => {
    // original width * new height / original height = new width;
    // original height * new width / original width = new height;
  }

  return (
    <div className={`${css(ut.flxc)} ${className}`}>
      <button type="button" className={css(sizeAspectRatioControlStyle.button, aspectRatioMode ? sizeAspectRatioControlStyle.active : '')} onClick={() => setAspectRatioMode(mode => !mode)}>
        <svg width="29" height="29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#a)" fill="currentColor">
            <path d="M11.209 16.75v-1.083a.541.541 0 1 0-1.084 0v1.083a1.625 1.625 0 1 1-3.25 0v-1.083a.541.541 0 1 0-1.083 0v1.083a2.708 2.708 0 1 0 5.417 0Zm0-5.417V10.25a2.708 2.708 0 1 0-5.417 0v1.083a.542.542 0 0 0 1.083 0V10.25a1.625 1.625 0 0 1 3.25 0v1.083a.542.542 0 1 0 1.084 0Z" />
            <path d="M8.5 10.792a.542.542 0 0 0-.542.541v4.334a.542.542 0 1 0 1.083 0v-4.334a.541.541 0 0 0-.541-.541Z" />
          </g>
          <path d="M1 .5h5a2 2 0 0 1 2 2v3M1 28h5a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div>
        {options.map(opt => (
          <SizeControl className={css(ut.mt1)} label={opt.label} width="100px" />
        ))}
      </div>
    </div>
  )
}
