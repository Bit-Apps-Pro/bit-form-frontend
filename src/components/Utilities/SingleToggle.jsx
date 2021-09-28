import { useFela } from 'react-fela'

export default function SingleToggle({ className, title, isChecked, name, action, disabled }) {
  const { css } = useFela()
  return (
    <div className={`flx flx-between ${className}`}>
      <span className="font-w-m">{title}</span>
      <label className={css(c.toggle_control)} htmlFor={`s-ck-${title || name}-${isChecked}`}>
        <input
          id={`s-ck-${title || name}-${isChecked}`}
          onChange={action}
          className={css(c.input)}
          type="checkbox"
          name={name || 'check'}
          value="check"
          checked={isChecked}
          disabled={disabled}
        />
        <span className={`${css(c.control)} control`} />
      </label>
    </div>
  )
}

const c = {
  toggle_control: {
    dy: 'block',
    pn: 'relative',
    cu: 'pointer',
    us: 'none',
    w: 32,
    h: 22,
    // ':hover': { '& .control::after': { bs: '0 0 0 5px #8cbaff59' } },
  },
  input: {
    pn: 'absolute',
    oy: 0,
    cur: 'pointer',
    h: 0,
    w: 0,
    ':focus': { '& ~ .control::after': { bs: '0 0 0 5px #8cbaff59' } },
    ':focus-visible ~ .control': { bs: '0 0 0 2px white, 0 0 0 4px blue' },
    ':checked~.control': { bd: 'var(--b-50)' },
    ':checked~.control:after': { lt: 12 },
  },
  control: {
    pn: 'absolute',
    tp: '0',
    lt: '0',
    h: 22,
    w: 32,
    brs: 25,
    bd: 'var(--white-0-0-32)',
    tn: 'background-color 0.15s ease-in, box-shadow .2s',
    ':after': {
      bd: 'white',
      pn: 'absolute',
      tp: '50%',
      lt: 3,
      bs: '0 1px 3px 0 #353535',
      tm: 'translateY(-50%)',
      ct: '""',
      w: 18,
      h: 18,
      brs: 25,
      tn: 'left 0.25s cubic-bezier(0.79, 0.63, 0.72, 1.76) 0s, box-shadow 0.3s ease 0s',
    },
  },
}
