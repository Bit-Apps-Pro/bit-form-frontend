import { useFela } from 'react-fela'

export default function Btn({
  children,
  className,
  size = 'md',
  variant = 'primary',
  width = 'auto',
  gap,
  shadow,
  disabled,
  onClick,
  dataTestId,
  rounded,
  id,
}) {
  const { css } = useFela()
  return (
    <button
      id={id}
      data-testid={dataTestId}
      style={{ width, gap }}
      type="button"
      disabled={disabled}
      className={`${css([
        btnStyle.btn,
        btnStyle[size],
        btnStyle[variant],
        shadow && btnStyle.shadow,
        rounded && btnStyle.rounded,
      ])} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
const btnStyle = {
  btn: {
    // fw: 700,
    b: 'none',
    brs: 8,
    bd: 'transparent',
    cur: 'pointer',
    oe: 'none',
    flx: 'center',
    tn: '0.2s all ease',
    ':active': { tm: 'scale(0.97)' },
    ':focus-visible': {
      oe: '3px solid var(--blue)',
      'outline-offset': '2px',
    },
    ':active:focus-visible': {
      'outline-offset': '0',
    },
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
    bd: 'hsl(0, 0%, 93%)',
    cr: 'hsl(0, 0%, 30%)',
    ':hover': { bd: 'hsl(0, 0%, 90%)' },
  },
  primary: {
    bd: 'hsl(211, 100%, 50%)',
    cr: 'hsl(0, 0%, 100%)',
    ':hover': { bd: 'hsl(211, 100%, 40%)' },
    ':active': { bd: 'hsl(211, 100%, 30%)' },
  },
  secondary: {
    cr: 'hsl(0, 0%, 100%)',
    bd: 'hsl(208, 7%, 46%)',
    ':hover': { bd: 'hsla(207, 7%, 51%, 0.851)' },
  },
  success: {
    bd: 'hsla(160, 100%, 49%, 100%)',
    cr: 'hsla(215, 63%, 18%, 67%)',
    ':hover': { bd: 'hsla(160, 100%, 49%, 0.644)' },
  },
  danger: {
    bd: 'hsl(0, 100%, 64%)',
    cr: 'hsl(0, 0%, 100%)',
    ':hover': { bd: 'hsl(0, 100%, 54%)' },
    ':active': { bd: 'hsl(0, 100%, 44%)' },
    ':focus-visible': { 'outline-color': 'hsl(0, 100%, 64%)' },
  },
  'primary-outline': {
    cr: 'hsl(211, 100%, 50%)',
    bc: '#fff',
    b: '1px solid hsl(211, 100%, 50%)',
    ':hover': {
      bd: 'hsl(211, 100%, 50%)',
      cr: 'hsl(0, 0%, 100%)',
    },
  },
  'secondary-outline': {
    cr: 'hsl(208, 7%, 46%)',
    bc: '#fff',
    b: '1px solid hsl(208, 7%, 46%)',
    ':hover': {
      cr: 'hsl(0, 0%, 100%)',
      bc: 'hsl(208, 7%, 46%)',
    },
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
  },
  'danger-outline': {
    cr: 'hsl(0, 100%, 50%)',
    bc: '#fff',
    b: '1px solid hsl(0, 100%, 50%)',
    ':hover': {
      bd: 'hsl(0, 100%, 50%)',
      cr: 'hsl(0, 0%, 100%)',
    },
    ':focus-visible': { bs: '0 0 0 0.2rem hsla(0, 100%, 50%, 0.548)' },
  },
  disabled: {
    cr: 'hsl(0, 0%, 100%)',
    bd: 'hsla(0, 0%, 76%, 63%)',
    cur: 'not-allowed',
    ':hover': { bd: 'hsla(240, 1%, 50%, 59%)' },
  },
  shadow: { bs: '0 2px 4px -2px hsla(0, 0%, 0%, 40%)  ' },
  rounded: { brs: '50px' },
}
