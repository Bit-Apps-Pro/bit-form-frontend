import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Important from './Important'
import { getValueByObjPath, showDraggableModal } from './styleHelpers'

export default function FilterControler({ subtitle, action, value, objectPaths, id, allowImportant }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const [styles, setStyles] = useRecoilState($styles)

  const { object, paths } = objectPaths

  const val = getValueByObjPath(styles, paths?.filter)

  const clearHandler = () => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (object === 'styles') {
        assignNestedObj(drft, paths?.filter, '')
      }
    }))
  }

  return (
    <div className={css(ut.flxc, { cg: 3 })}>
      {allowImportant && (<Important propertyPath={paths?.filter} />)}
      <div className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
        <button
          onClick={e => showDraggableModal(e, setDraggableModal, { component: 'filter-control', subtitle, action, value, objectPaths, id })}
          type="button"
          className={css(c.pickrBtn)}
          title={val}
        >
          {val || 'Configure'}
        </button>
        {(val) && (
          <button title="Clear Value" onClick={clearHandler} className={css(c.clearBtn)} type="button" aria-label="Clear Filter">
            <CloseIcn size="12" />
          </button>
        )}
      </div>
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 7,
    flx: 'center-between',
    h: 30,
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
  },
  preview: {
    w: 25,
    h: 25,
    b: '1px solid gray',
    brs: 7,
    curp: 1,
    mr: 7,
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
    bd: 'transparent',
    ws: 'nowrap',
    to: 'ellipsis',
    p: 0,
    h: 28,
    w: 94,
    dy: 'block',
    ow: 'hidden',
    ta: 'start',
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}
