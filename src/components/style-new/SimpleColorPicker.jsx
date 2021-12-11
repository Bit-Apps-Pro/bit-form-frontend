import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import ColorPreview from './ColorPreview'
import ResetStyle from './ResetStyle'
import { showDraggableModal } from './styleHelpers'
import TrashIcn from '../../Icons/TrashIcn'
import CloseIcn from '../../Icons/CloseIcn'

export default function SimpleColorPicker({ title, stateName, subtitle, value, objectPaths, modalType, modalId, deleteable, delPropertyHandler, clearHandler }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  return (
    <div className={css(ut.flxcb, ut.mt2, c.containerHover)}>
      <div className={css(ut.flxc)}>
        {deleteable && (
          <button onClick={delPropertyHandler} className={`${css(c.delBtn)} delete-btn`} type="button">
            <TrashIcn size="15" />
          </button>
        )}
        <span className={css(ut.fw500)}>{__(title, 'bitform')}</span>
      </div>
      <div className={css(ut.flxc)}>
        <ResetStyle objectKey={`--${modalType}`} stateName={stateName} />
        <div className={css(c.preview_wrp, draggableModal.id === modalId && c.active)}>
          <button
            onClick={e => showDraggableModal(e, setDraggableModal, { component: 'color-picker', subtitle, action: { type: modalType }, value, id: modalId, objectPaths })}
            type="button"
            className={css(c.pickrBtn)}
          >
            <ColorPreview bg={value} h={24} w={24} className={css(ut.mr2)} />
            <span className={css(c.clrVal)}>{value?.replaceAll(/\(|var|\)/gi, '')}</span>
          </button>
          <button onClick={clearHandler} className={css(c.clearBtn)} type="button" aria-label="Clear Color">
            <CloseIcn size="12" />
          </button>
        </div>
      </div>
    </div>
  )
}

const c = {
  containerHover: {
    '&:hover .delete-btn': {
      bd: 'var(--b-79-96)',
      brs: '50%',
      cr: 'var(--b-50)',
      oy: 1,
      tm: 'scale(1.1)',
    },
  },
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
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  delBtn: {
    b: 'none',
    p: 5,
    bd: 'transparent',
    mr: 5,
    oy: 0,
    tn: '.2s all',
    curp: 1,
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },

}
