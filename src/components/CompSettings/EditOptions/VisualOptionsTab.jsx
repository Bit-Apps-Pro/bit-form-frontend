import { arrayMoveImmutable } from 'array-move'
import produce from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import VirtualList from 'react-tiny-virtual-list'
import CloseIcn from '../../../Icons/CloseIcn'
import CopyIcn from '../../../Icons/CopyIcn'
import DragIcn from '../../../Icons/DragIcn'
import TrashIcn from '../../../Icons/TrashIcn'
import ut from '../../../styles/2.utilities'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Button from '../../Utilities/Button'
import TableCheckBox from '../../Utilities/TableCheckBox'
import Tip from '../../Utilities/Tip'
import { flattenOptions, newOptKey } from './editOptionsHelper'

const SortContainer = SortableContainer(({ children }) => children)

const DragHandle = SortableHandle(({ className }) => (
  <span className={`handle ${className}`}><DragIcn size={14} /></span>
))

const SortableItem = SortableElement(({ value, optIndx, type, option, setOption, lblKey, valKey, setScrolIndex, optKey, checkByDefault }) => {
  const { css } = useFela()

  const isGroupStart = 'type' in value && value.type.includes('group') && value.type.includes('start')
  const isGroupEnd = 'type' in value && value.type.includes('group') && value.type.includes('end')

  const isGroupChild = () => {
    if (isGroupStart || isGroupEnd) return false
    for (let i = optIndx - 1; i >= 0; i -= 1) {
      const opt = option[i]
      if ('type' in opt && opt.type.includes('end')) {
        return false
      }

      if ('type' in opt && opt.type.includes('start')) {
        return true
      }
    }

    return false
  }

  const addOption = () => {
    const newOption = produce(option, draft => {
      const id = newOptKey(optKey)
      // eslint-disable-next-line no-param-reassign
      draft.splice(optIndx + 1, 0, { id, [lblKey]: `Option ${id}` })
    })

    setOption(newOption)
    setScrolIndex(optIndx + 1)
  }

  const setOpt = (e, ind, typ) => {
    const newOption = produce(option, draft => {
      // eslint-disable-next-line no-param-reassign
      draft[ind][typ] = e.target.value
    })

    setOption(newOption)
    setScrolIndex(optIndx)
  }

  const setGroupTitle = e => {
    const newOption = produce(option, draft => {
      // eslint-disable-next-line no-param-reassign
      draft[optIndx].groupLbl = e.target.value
    })

    setOption(newOption)
    setScrolIndex(optIndx)
  }

  const rmvOption = (ind) => {
    if (isGroupStart) return rmvGroup()
    const tmpOption = [...option]
    tmpOption.splice(ind, 1)
    setOption(tmpOption)
    setScrolIndex(optIndx - 1)
  }

  const rmvGroup = () => {
    const tmpOption = [...option]
    let toBeRemovedOptions = 0
    for (let i = optIndx; i < tmpOption.length; i += 1) {
      if ('type' in tmpOption[i] && tmpOption[i].type.includes('end')) {
        toBeRemovedOptions += 1
        break
      }
      toBeRemovedOptions += 1
    }

    tmpOption.splice(optIndx, toBeRemovedOptions)
    setOption(tmpOption)
    setScrolIndex(optIndx - 1)
  }

  const cloneOption = () => {
    if (isGroupStart) return cloneGroup()

    const tmpOption = [...option]
    const clonedOpt = { [lblKey]: `Copy of ${value[lblKey]}`, [valKey]: value[valKey] ? `Copy of ${value[valKey]}` : '', id: newOptKey(optKey) }
    tmpOption.splice(optIndx + 1, 0, clonedOpt)
    setOption(tmpOption)
    setScrolIndex(optIndx + 1)
  }

  const cloneGroup = () => {
    const tmpOption = [...option]
    const toBeClonedOptions = [{ ...tmpOption[optIndx], id: newOptKey(optKey), groupLbl: `Copy of ${tmpOption[optIndx].groupLbl}` }]
    for (let i = optIndx + 1; i < tmpOption.length; i += 1) {
      if ('type' in tmpOption[i] && tmpOption[i].type.includes('end')) {
        toBeClonedOptions.push({ ...tmpOption[i], id: newOptKey(optKey) })
        break
      }
      const clonedOpt = { id: newOptKey(optKey), [lblKey]: `Copy of ${tmpOption[i][lblKey]}`, [valKey]: tmpOption[i][valKey] ? `Copy of ${value[valKey]}` : '' }
      toBeClonedOptions.push(clonedOpt)
    }

    tmpOption.splice(optIndx + toBeClonedOptions.length, 0, ...toBeClonedOptions)
    setOption(tmpOption)
    setScrolIndex(optIndx + toBeClonedOptions.length * 2 - 1)
  }

  function setReq(e, i) {
    const tmpOption = deepCopy([...option])
    if (e.target.checked) {
      tmpOption[i].req = true
    } else {
      delete tmpOption[i].req
    }
    setOption(tmpOption)
    setScrolIndex(optIndx)
  }

  function setCheck(e, i) {
    const tmp = deepCopy([...option])

    if (type === 'radio') {
      const alreadyChecked = tmp.find(opt => opt.check)
      if (alreadyChecked) delete alreadyChecked.check
    }
    if (e.target.checked) {
      tmp[i].check = true
    } else {
      delete tmp[i].check
    }
    setOption(tmp)
    setScrolIndex(optIndx)
  }

  return (
    <div className={css(optionStyle.container, isGroupStart ? optionStyle.groupstart : '', isGroupChild() ? optionStyle.groupchild : '', isGroupEnd ? optionStyle.groupend : '')}>
      {!isGroupEnd && (
        <div className={css(optionStyle.inputContainer)}>
          <div className="flx">
            <DragHandle className={css(optionStyle.drag)} />
          </div>
          {isGroupStart && (
            <div>
              <span className={css(ut.flxc, ut.ml2, ut.mr2, optionStyle.grouptitle)}>
                Group Title
              </span>
              <input type="text" className={css(optionStyle.grouptitleinput)} onChange={setGroupTitle} value={value.groupLbl} />
            </div>
          )}
          {isGroupEnd && (
            <span className={css(ut.flxc, ut.ml2)} style={{ height: 40 }}>
              {`Group ${value.type.split('-')[1]} End`}
            </span>
          )}

          {!('type' in value) && (
            <>
              <input type="text" value={value[lblKey]} onChange={e => setOpt(e, optIndx, lblKey)} width={140} className={css(optionStyle.input)} />
              <input type="text" value={value[valKey]} onChange={e => setOpt(e, optIndx, valKey)} placeholder={`${value[lblKey]}`} width={140} className={css(optionStyle.input)} />
            </>
          )}
          {!isGroupStart && checkByDefault && (
            <span className={css(ut.flxc, ut.pb1, ut.ml1)}>
              <Tip msg="Check by Default">
                <TableCheckBox checked={value.check !== undefined} onChange={(e) => setCheck(e, optIndx)} className="" />
              </Tip>
            </span>
          )}
          {type === 'check' && (
            <span className={css(ut.flxc, ut.pb1, ut.ml1)}>
              <Tip msg="Required">
                <TableCheckBox checked={value.req !== undefined} className="m-0 " onChange={(e) => setReq(e, optIndx)} />
              </Tip>
            </span>
          )}
          <div className={`${css(optionStyle.action)} acc ${isGroupStart && 'group-acc'} ${value.req && 'active'}`}>

            <div className={`${css(ut.flxc, ut.dyn)} btnIcn`}>
              <Tip msg={`Add Option ${isGroupStart ? 'in Group' : ''}`}>
                <button type="button" onClick={() => addOption(optIndx)} className={css(optionStyle.btn)}>
                  <span className={css(optionStyle.addbtnside)}><CloseIcn size="16" stroke="2" /></span>
                </button>
              </Tip>
              <Tip msg={`Clone ${isGroupStart ? 'Group' : 'Option'}`}>
                <button type="button" onClick={() => cloneOption()} className={css(optionStyle.btn)}>
                  <CopyIcn size="16" stroke="2" />
                </button>
              </Tip>
              <Tip msg={`Delete ${isGroupStart ? 'Group' : 'Option'}`}>
                <button type="button" onClick={() => rmvOption(optIndx)} className={css(optionStyle.btn)}>
                  <TrashIcn size="23" />
                </button>
              </Tip>
            </div>
          </div>
        </div>
      )}

    </div>
  )
})

export default function VisualOptionsTab({ optKey, options, option, setOption, type, lblKey, valKey, checkByDefault, hasGroup }) {
  const { css } = useFela()
  const [scrolIndex, setScrolIndex] = useState(0)

  useEffect(() => { setOption(flattenOptions(options, optKey)) }, [options])

  const addOption = () => {
    const tmpOption = [...option]
    const id = newOptKey(optKey)
    const newIndex = tmpOption.push({ id, [lblKey]: `Option ${id}` })
    setScrolIndex(newIndex - 1)
    setOption(tmpOption)
  }

  const addGroup = () => {
    const tmpOption = [...option]
    const totalGroup = tmpOption.filter(opt => opt?.type?.includes?.('start')) || []
    const id = newOptKey(optKey)
    const newIndex = tmpOption.push(
      { id: newOptKey(optKey), groupLbl: `Group ${totalGroup.length + 1}`, type: `group-${totalGroup.length + 1}-start` },
      { id, [lblKey]: `Option ${id}` },
      { id: newOptKey(optKey), type: `group-${totalGroup.length + 1}-end` },
    )
    setOption(tmpOption)
    setScrolIndex(newIndex - 1)
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const sortingItem = option[oldIndex]

    const newOptions = arrayMoveImmutable(option, oldIndex, newIndex)

    if ('type' in sortingItem) {
      const [, groupIndex, groupStatus] = sortingItem.type.split('-')

      if (groupStatus === 'end') {
        let startFound = 0
        for (let i = newIndex - 1; i >= 0; i -= 1) {
          if ('type' in newOptions[i] && newOptions[i].type.includes('start')) {
            if (newOptions[i].type === `group-${groupIndex}-start`) {
              startFound = 1
              break
            }
            if (newOptions[i].type !== `group-${groupIndex}-start`) return
          }
        }
        if (!startFound) return
      } else if (groupStatus === 'start') {
        let endFound = 0
        for (let i = newIndex + 1; i < newOptions.length; i += 1) {
          if ('type' in newOptions[i] && newOptions[i].type.includes('end')) {
            if (newOptions[i].type === `group-${groupIndex}-end`) {
              endFound = 1
              break
            }
            if (newOptions[i].type !== `group-${groupIndex}-end`) return
          }
        }
        if (!endFound) return
      }
    }

    setOption((items) => arrayMoveImmutable(items, oldIndex, newIndex))
    setScrolIndex(newIndex)
  }

  const generateItemSize = () => option.reduce((allItemSize, item) => {
    if ('type' in item && item.type.includes('start')) allItemSize.push(57)
    else if ('type' in item && item.type.includes('end')) allItemSize.push(25)
    else if (!('type' in item)) allItemSize.push(40)
    return allItemSize
  }, [])

  return (
    <>
      <SortContainer onSortEnd={onSortEnd} useDragHandle>
        <VirtualList
          width="100%"
          height={300}
          itemCount={option.length || 1}
          itemSize={option.length ? generateItemSize() : 0}
          className="VirtualList"
          scrollToIndex={scrolIndex}
          scrollToAlignment="auto"
          // overscanCount={20}
          renderItem={({ index, style }) => (
            <div key={option[index].id} style={style}>
              <SortableItem key={`sortable-${option[index].id}`} index={index} optIndx={index} value={option[index]} type={type} option={option} setOption={setOption} lblKey={lblKey} valKey={valKey} setScrolIndex={setScrolIndex} optKey={optKey} checkByDefault={checkByDefault} />
            </div>
          )}
        />
      </SortContainer>
      <div className="flx">
        <Button id="add-mor" className={css(optionStyle.add_btn)} onClick={() => addOption()}>
          {__('Add More +', 'bitform')}
        </Button>
        {hasGroup && (
          <Button id="add-grp" className={css(optionStyle.add_btn)} onClick={addGroup}>
            {__('Add Group +', 'bitform')}
          </Button>
        )}

      </div>
    </>
  )
}

const optionStyle = {
  container: { flx: '' },
  groupstart: { pt: 7, pb: 5, bc: 'var(--white-0-93)' },
  groupchild: { pl: 25, bc: 'var(--white-0-93)' },
  groupend: { h: 20, bc: 'var(--white-0-93)' },
  grouptitle: { fs: 10 },
  inputContainer: {
    flx: '',
    mnw: 560,
    '&:hover > .acc':
      { flx: 'align-center' },
    '&:hover > .acc > div': { flx: 'align-center' },
    '&:hover > .acc.group-acc': { flx: '', ai: 'flex-end', pb: 0 },
  },

  grouptitleinput: {
    bc: 'transparent !important',
    b: '0px !important',
    oe: 0,
    mt: 5,

    ':hover': { bc: 'var(--white-0-0-12) !important' },
    ':focus': { b: '1px solid #ddd', bc: 'var(--white-0-0-12) !important', bs: 'none !important' },
  },

  input: {
    p: 5,
    m: 5,
    b: '1px solid rgb(215 215 215)',
    brs: '8px !important',
    fs: 12,
    w: 200,
    oe: 'none',
    ':focus': {
      bcr: 'var(--b-59)',
      bs: '0 0 0 1px var(--b-59)',
    },
  },
  label: { w: 175, dy: 'inline-block' },

  btn: {
    brs: 7,
    fs: 12,
    curp: 1,
    ta: 'right',
    b: 'none',
    p: 3,
    bd: 'none',
    ml: 5,
  },
  addbtnside: { dy: 'inline-block', tm: 'rotate(45deg)' },
  add_btn: { ml: 19, p: 5 },
  drag: {
    cr: 'var(--white-0-50)',
    dy: 'inline-block',
    w: 25,
    h: 25,
    p: 5,
    cur: 'move',

    ':hover': { cr: 'var(--white-0-0-12)' },
  },
  List: { b: '1px solid #d9dddd' },
  ListItemOdd: { flx: 'jc' },

  ListItemEven: { bc: '#f8f8f0' },
  action: {
    dy: 'none',
    pb: 5,
    '&.active': { flx: 'align-center' },
    '&:hover': {
      flx: 'align-center',
      '& .btnIcn': { flx: 'align-center' },
    },
  },
}
