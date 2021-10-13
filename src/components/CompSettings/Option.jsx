/* eslint-disable jsx-a11y/control-has-associated-label */
import { useFela } from 'react-fela'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import produce from 'immer'

import { sortableContainer, sortableElement, SortableHandle } from 'react-sortable-hoc'

import { arrayMoveImmutable } from 'array-move'

import VirtualList from 'react-tiny-virtual-list-oss'
import DragIcn from '../../Icons/DragIcn'
import AddIcon from '../../Icons/AddIcon'
import TrashIcn from '../../Icons/TrashIcn'
import { __ } from '../../Utils/i18nwrap'
import Tip from '../Utilities/Tip'
import Button from '../Utilities/Button'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import TableCheckBox from '../Utilities/TableCheckBox'
import CheckBox from '../Utilities/CheckBox'
import ut from '../../styles/2.utilities'

export default function Option({ options, type, lblKey, valKey }) {
  const { css } = useFela()

  const [option, setOption] = useState(options)
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const [scrolIndex, setScrolIndex] = useState(0)

  const fieldData = deepCopy(fields[fldKey])

  const addOption = () => {
    const tmpOption = [...option]
    tmpOption.push({ [lblKey]: `Option ${tmpOption.length + 1}`, [valKey]: `Option ${options.length + 1}` })
    fieldData.opt = tmpOption
    setScrolIndex(tmpOption.length)
    setOption(fieldData.opt)
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setOpt = (e, ind, type) => {
    const tmp = deepCopy([...option])
    tmp[ind][type] = e.target.value
    setOption(tmp)

    fieldData.opt = tmp
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const rmvOption = (ind) => {
    const tmpOption = [...option]
    tmpOption.splice(ind, 1)
    setOption(tmpOption)
    fieldData.opt = tmpOption
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setReq(e, i) {
    const tmpOption = deepCopy([...option])
    setScrolIndex(i)
    if (e.target.checked) {
      tmpOption[i].req = true
    } else {
      delete tmpOption[i].req
    }
    fieldData.opt = tmpOption
    setOption(fieldData.opt)
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setCheck(e, i) {
    const tmp = deepCopy([...option])
    setScrolIndex(i)

    if (type === 'radio') {
      for (let index = 0; i < tmp.length; index += 1) {
        delete tmp[index].check
      }
    }
    if (e.target.checked) {
      tmp[i].check = true
    } else {
      delete tmp[i].check
    }
    fieldData.opt = tmp
    setOption(tmp)
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const DragHandle = SortableHandle(() => (
    <span className="handle"><DragIcn size={8} /></span>
  ))

  const SortableItem = sortableElement(({ value, ind }) => (
    <div>
      <div key={`opt-${ind + 8}`} className={css(optionStyle.container)}>
        <div className={css(optionStyle.inputContainer)}>
          <div className="flx">
            <button type="button" className={`${css(optionStyle.btn, optionStyle.drag)} dragOption mr-2`}><DragHandle /></button>
            <label>
              <Tip msg="Check by Default">
                <TableCheckBox checked={value.check !== undefined} onChange={(e) => setCheck(e, ind)} className="" />
              </Tip>
            </label>
          </div>
          <input type="text" value={value[lblKey]} onChange={e => setOpt(e, ind, lblKey)} width={140} className={css(optionStyle.input)} />
          <input type="text" value={value[valKey]} onChange={e => setOpt(e, ind, valKey)} placeholder={`${value[lblKey]}`} width={140} className={css(optionStyle.input)} />
        </div>
        <div className={`${css(optionStyle.action)} acc ${value.req && 'active'}`}>
          {type === 'check' && (
            <label className="req-check">
              <Tip msg="Required">
                <CheckBox checked={value.req !== undefined} className="m-0 " onChange={(e) => setReq(e, ind)} />
              </Tip>
            </label>
          )}
          <div className={`${css(ut.flxc, ut.dyn)} btnIcn`}>
            <button type="button" onClick={addOption} className={css(optionStyle.btn)}><AddIcon size="23" /></button>
            <button type="button" onClick={() => rmvOption(ind)} className={css(optionStyle.btn)}><TrashIcn size="23" /></button>
          </div>
        </div>
      </div>
    </div>
  ))

  const SortableContainer = sortableContainer(({ children }) => children)

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setOption((items) => arrayMoveImmutable(items, oldIndex, newIndex))
    fieldData.opt = arrayMoveImmutable(option, oldIndex, newIndex)
    setScrolIndex(newIndex)
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <>
      <div className={css(optionStyle.wrapper)}>
        <SortableContainer onSortEnd={onSortEnd} useDragHandle=".drag">
          <VirtualList
            width="100%"
            height={200}
            itemCount={option.length}
            itemSize={40} // Also supports variable heights (array or function getter)
            className="VirtualList"
            scrollToIndex={scrolIndex}
            scrollToAlignment="center"
            overscanCount={10}
            renderItem={({ index, style }) => (
              <div key={index} style={style}>
                <SortableItem key={`key=${index}`} index={index} value={option[index]} ind={index} />
              </div>
            )}
          />

        </SortableContainer>
        <div className="flx">
          <Button className={css(optionStyle.add_btn)} onClick={addOption}>
            {__('Add More +', 'bitform')}
          </Button>
        </div>
      </div>

    </>
  )
}
const optionStyle = {
  wrapper: { scrollBehavior: 'auto !important', '& *': { scrollBehavior: 'auto !important' } },
  container: { flx: '' },
  inputContainer: {
    flx: '',
    '&:hover + .acc':
      { flx: 'align-center' },
    '&:hover + .acc > div': { flx: 'align-center' },
  },

  input: {
    p: 5,
    m: 5,
    b: '1px solid rgb(215 215 215)',
    brs: '8px !important',
    fs: 12,
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
  },
  add_btn: { ml: 19, p: 5 },
  drag: { cur: 'move' },
  List: { b: '1px solid #d9dddd' },
  ListItemOdd: { flx: 'jc' },

  ListItemEven: { bc: '#f8f8f0' },
  action: {
    dy: 'none',
    '&.active': { flx: 'align-center' },
    '&:hover': {
      flx: 'align-center',
      '& .btnIcn': { flx: 'align-center' },
    },
  },
}
