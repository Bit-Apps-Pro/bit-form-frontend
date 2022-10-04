import { useFela } from 'react-fela'

export default function Btn({
  children,
  className,
  size = 'md',
  variant = 'default',
  width = 'auto',
  gap,
  shadow,
  disabled,
  onClick,
  dataTestId,
  id,
}) {
  const { css } = useFela()
  const shado = shadow === true ? 'shadow' : shadow
  return (
    <button
      id={id}
      data-testid={dataTestId}
      style={{ width, gap }}
      type="button"
      disabled={disabled}
      className={`${css([btnStyle.btn, btnStyle[size], btnStyle[variant], btnStyle[shado]])} ${shadow && css(btnStyle.shadow)} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
const btnStyle = {
  btn: {
    fw: 700,
    b: 'none',
    brs: 8,
    bd: 'transparent',
    cur: 'pointer',
    oe: 'none',
    flx: 'center',
    tn: '0.2s all ease',
  },
  sm: {
    p: '7px 13px',
    fs: 12,
  },
  md: {
    p: '10px 20px',
    fs: '16px',
  },
  lg: {
    p: '15px 40px',
    fs: '20px',
  },
  default: {
    bd: 'hsl(211, 100%, 50%)',
    cr: 'hsl(0, 0%, 100%)',
    ':hover': { bd: 'hsla(211, 100%, 50%, 0.802)' },
    ':focus': { bs: '0 0 0 0.2rem rgb(0 123 255 / 50%)' },
  },
  secondary: {
    cr: 'hsl(0, 0%, 100%)',
    bd: 'hsl(208, 7%, 46%)',
    ':hover': { bd: 'hsla(207, 7%, 51%, 0.851)' },
    ':focus': { bs: '0 0 0 0.2rem hsla(210, 7%, 46%, 0.494)' },
  },
  success: {
    bd: 'hsla(160, 100%, 49%, 100%)',
    cr: 'hsla(215, 63%, 18%, 67%)',
    ':hover': { bd: 'hsla(160, 100%, 49%, 0.644)' },
    ':focus': { bs: '0 0 0 0.2rem hsla(160, 100%, 49%, 0.576)' },
  },
  danger: {
    bd: 'hsl(0, 100%, 50%)',
    cr: 'hsl(0, 0%, 100%)',
    ':hover': { bd: 'rgba(255, 0, 0, 0.802)' },
    ':focus': { bs: '0 0 0 0.2rem hsla(0, 100%, 50%, 0.548)' },
  },
  'default-outline': {
    cr: 'hsl(211, 100%, 50%)',
    // bc: 'transparent',
    bc: '#fff',
    b: '1px solid hsl(211, 100%, 50%)',
    ':hover': {
      bd: 'hsl(211, 100%, 50%)',
      cr: 'hsl(0, 0%, 100%)',
    },
    ':focus': { bs: '0 0 0 0.2rem hsla(211, 100%, 50%, 10%)' },
  },
  'secondary-outline': {
    cr: 'hsl(208, 7%, 46%)',
    // bc: 'transparent',
    bc: '#fff',
    b: '1px solid hsl(208, 7%, 46%)',
    ':hover': {
      cr: 'hsl(0, 0%, 100%)',
      bc: 'hsl(208, 7%, 46%)',
    },
    ':focus': { bs: '0 0 0 0.2rem hsla(210, 7%, 46%, 0.494)' },
  },
  'success-outline': {
    cr: 'hsla(160, 100%, 49%, 100%)',
    // bc: 'transparent',
    bc: '#fff',
    b: '1px solid hsla(160, 100%, 49%, 100%)',
    ':hover': {
      bd: 'hsla(160, 100%, 49%, 100%)',
      cr: 'hsla(215, 63%, 18%, 67%)',
    },
    ':focus': { bs: '0 0 0 0.2rem hsla(160, 100%, 49%, 0.576)' },
  },
  'danger-outline': {
    cr: 'hsl(0, 100%, 50%)',
    // bc: 'transparent',
    bc: '#fff',
    b: '1px solid hsl(0, 100%, 50%)',
    ':hover': {
      bd: 'hsl(0, 100%, 50%)',
      cr: 'hsl(0, 0%, 100%)',
    },
    ':focus': { bs: '0 0 0 0.2rem hsla(0, 100%, 50%, 0.548)' },
  },
  shadow: { bs: '0 2px 4px -2px hsla(0, 0%, 0%, 40%)  ' },
  rounded: { brs: '50%', p: '8px 14px' },
}
