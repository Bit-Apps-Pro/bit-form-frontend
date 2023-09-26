import { useFela } from 'react-fela'
import CloseIcn from '../../../Icons/CloseIcn'
import ut from '../../../styles/2.utilities'
import Downmenu from '../../Utilities/Downmenu'
import ColorPreview from '../ColorPreview'
import Important from '../Important'
import { MouseEvent } from 'react'

type colorPickerProps = {
  id: string,
  value: string,
  onChangeHandler: (value: string) => void,
  clearHandler: (value: MouseEvent<HTMLButtonElement>) => void,
  allowImportant: boolean,
}

export default function ColorPicker({ id, value, onChangeHandler , clearHandler, allowImportant }: colorPickerProps) {
  const { css } = useFela()
  return (
    <div data-testid={`${id}-hover`} className={css(ut.flxcb, ut.mt2, style.containerHover)}>
      <div className={css(ut.flxc)}>
        {allowImportant && value && (
          <Important
            className={css({ mr: 3 })}
            stateObjName={stateObjName}
            propertyPath={propertyPath}
            id={id}
          />
        )}
        <div
          className={css(style.preview_wrp)}
          title={value}
        >
          <Downmenu
            onShow={() => {}}
            onHide={() => {}}
          >
            <button
              type="button"
              className={css(style.pickrBtn)}
              data-testid={`${id}-modal-btn`}
            >
              <ColorPreview bg={value} h={24} w={24} className={css(ut.mr2)} />
              <span className={css(style.clrVal)}>{value || 'Pick Color'}</span>
            </button>
          </Downmenu>

          {value && (
            <button
              title="Clear Value"
              onClick={clearHandler}
              className={css(style.clearBtn)}
              type="button"
              aria-label="Clear Color"
              data-testid={`${id}-clear-btn`}
            >
              <CloseIcn className="" size="12" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const style = {
  delBtn: {
    se: 20,
    flx: 'center',
    b: 'none',
    p: 0,
    mr: 1,
    tn: '.2s all',
    curp: 1,
    brs: '50%',
    tm: 'scale(0)',
    bd: 'none',
    cr: 'var(--red-100-61)',
    pn: 'absolute',
    lt: -15,
    ':hover': { bd: '#ffd0d0', cr: '#460000' },
  },
  containerHover: { '&:hover .delete-btn': { tm: 'scale(1)' } },
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 3,
    flx: 'center-between',
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
  },
  clearBtn: {
    brs: '50%',
    p: 4,
    w: 17,
    h: 17,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)', bd: '#d3d1d1' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },

  clrVal: {
    w: 73,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ta: 'left',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },

}
