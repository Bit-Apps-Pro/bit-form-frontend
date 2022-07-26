import { useFela } from 'react-fela'

export default function Select({ options = [], onChange, value, size = 'md', inputClass, color = 'default' }) {
  const { css } = useFela()

  const cls = {
    selectInput: {
      fs: `${size === 'sm' ? 12 : 14}px!important`,
      fw: 500,
      p: `${size === 'sm' ? '0px' : '2px 24px 2px 12px'}!important`,
      cr: 'var(--b-44-20)!important',
      bc: color === 'default' ? 'var(--white-0-95)!important' : 'var(--b-79-96)!important',
      bs: 'none!important',
      tn: 'box-shadow .3s',
      brs: '8px!important',
      b: '1px solid #e6e6e6 !important',
      mnh: 'auto!important',
      'background-size': '12px 12px!important',
      ':hover': { cr: 'var(--b-54-12)!important' },
      ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
      '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    },
  }

  const handleOnChange = (e) => {
    onChange?.(e.target.value, e)
  }

  return (
    <select className={css(cls.selectInput)} value={value} onChange={handleOnChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}
