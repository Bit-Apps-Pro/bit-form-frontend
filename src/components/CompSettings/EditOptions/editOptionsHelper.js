/* eslint-disable no-param-reassign */
export const newOptKey = optKey => {
  const key = optKey.current
  optKey.current += 1
  return key
}

export const flattenOptions = (optns, optKey) => {
  const newOpts = []
  let groupCount = 1
  optns.forEach(opt => {
    if (opt.type === 'group') {
      newOpts.push({ id: newOptKey(optKey), groupLbl: opt.title, type: `group-${groupCount}-start` })
      opt.childs.map(ot => {
        newOpts.push({ id: newOptKey(optKey), ...ot })
      })
      newOpts.push({ id: newOptKey(optKey), type: `group-${groupCount}-end` })
      groupCount += 1
    } else {
      newOpts.push({ id: newOptKey(optKey), ...opt })
    }
  })

  return newOpts
}

export const formatOptions = (optns, lblKey) => {
  const newOpts = []

  for (let i = 0; i < optns.length; i += 1) {
    if ('type' in optns[i] && optns[i].type.includes('start')) {
      const groupIndex = optns[i].type.split('-')[1]
      const { groupLbl } = optns[i]
      const childs = []
      for (let j = i + 1; j < optns.length; j += 1) {
        if ('type' in optns[j] && optns[j].type === `group-${groupIndex}-end`) {
          i = j
          break
        } else {
          const opt = { ...optns[j] }
          delete opt.id
          childs.push(opt)
        }
      }
      if (childs.length) {
        newOpts.push({ title: groupLbl, type: 'group', childs })
      }
    } else {
      const opt = { ...optns[i] }
      delete opt.id
      newOpts.push(opt)
    }
  }

  if (!newOpts.length) {
    return [{ [lblKey]: 'Option 1' }, { [lblKey]: 'Option 2' }, { [lblKey]: 'Option 3' }]
  }

  return newOpts
}

export const convertOptionsToText = (optns, lblKey, valKey) => {
  let optionsText = ''
  optns.map(opt => {
    if (opt.type === 'group') {
      optionsText += `group-start:${opt.title}${'\r\n'}`
      opt.childs.map(ot => {
        optionsText += `${ot[lblKey]}${ot[valKey] ? `:${ot[valKey]}` : ''}${'\r\n'}`
      })
      optionsText += `group-end:${opt.title}${'\r\n'}`
    } else {
      optionsText += `${opt[lblKey]}${opt[valKey] ? `:${opt[valKey]}` : ''}${'\r\n'}`
    }
  })

  return optionsText
}

export const convertTextToOptions = (optionTxt, optKey, lblKey, valKey) => {
  const allOptions = optionTxt.split(/\r?\n/)
  const newOpts = []
  let id = 1
  let groupCount = 1

  allOptions.forEach(opt => {
    if (opt.includes('group-start')) {
      if (groupCount === 1 && !optionTxt.includes('group-end:')) return
      const [, groupLbl] = opt.split('group-start:')
      newOpts.push({ id, type: `group-${groupCount}-start`, groupLbl })
      id += 1
    } else if (opt.includes('group-end')) {
      newOpts.push({ id, type: `group-${groupCount}-end` })
      id += 1
      groupCount += 1
    } else if (opt) {
      const [lbl, val] = opt.split(':')
      newOpts.push({ id, [lblKey]: lbl, [valKey]: val })
      id += 1
    }
  })

  optKey.current = id

  return newOpts
}
