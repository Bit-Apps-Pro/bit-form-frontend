/* eslint-disable react/jsx-props-no-spreading */
import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $proModal } from '../../GlobalStates/GlobalStates'
import { IS_PRO } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import proHelperData from '../../Utils/StaticData/proHelperData'
import Cooltip from './Cooltip'
import ProBadge from './ProBadge'

export default function SingleToggle({
  id, className, tip, title, isChecked, name, action = () => { }, disabled, isPro, proProperty,
}) {
  const { css } = useFela()
  const setProModal = useSetRecoilState($proModal)
  const allowToggleAction = !isPro || IS_PRO
  return (
    <div className={`flx flx-between ${className}`}>
      <span className={`font-w-m ${css(c.titleWrp)}`}>
        {title}
        {isPro && !IS_PRO && (<ProBadge width="18" proProperty={proProperty} />)}
        {tip && (
          <Cooltip width="200" icnSize="17" className="hover-tip">
            <div className="txt-body">{__(tip)}</div>
          </Cooltip>
        )}
      </span>
      <label data-testid={`${id}-sngl-tgl`} className={css(c.toggle_control)} htmlFor={`s-ck-${id || title || name}-${isChecked}`}>
        <input
          id={`s-ck-${id || title || name}-${isChecked}`}
          {...allowToggleAction && { onChange: action || (() => { }) }}
          {...!allowToggleAction && { onChange: () => { setProModal({ show: true, ...proHelperData[proProperty] }) } }}
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
  titleWrp: {
    flx: 'align-center',
    fw: 600,
    '& .hover-tip': { oy: 0 },
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
    bd: 'var(--white-0-86)',
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
