import { useFela } from 'react-fela'
import ColorPicker from '@atomik-color/component'

export default function SimpleColorPickerMenu() {
  const { css } = useFela()

  return (
    <div className={css(c.preview_wrp)}>
      <ColorPicker showParams showPreview />
    </div>
  )
}

const c = {
  preview_wrp: {
    '& div[role="group"]': { p: 4, b: 0 },
    '& input': {
      brs: 8,
      b: '1px solid lightgray',
      p: '3px 8px',
      mnh: '10px !important',
      fs: 12,
      mb: 3,
      bs: 'none',
      ':focus': { focusShadow: 1, b: '1px solid var(--b-50)' },
    },
    '& .common-module_transBackground__2AOKu': {
      brs: 8,
      ow: 'hidden',
    }
  },
}
