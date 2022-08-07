import { getRecoil } from 'recoil-nexus'
import merge from 'deepmerge-alt'
import { diff } from 'deep-object-diff'
import { $fields } from '../GlobalStates/GlobalStates'
import { deepCopy } from './Helpers'

export function observeElement(element, property, callback, delay = 0) {
  const elementPrototype = Object.getPrototypeOf(element)
  if (Object.prototype.hasOwnProperty.call(elementPrototype, property)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      elementPrototype,
      property,
    )
    Object.defineProperty(element, property, {
      configurable: true,
      get(...args) {
        return descriptor.get.apply(this, args)
      },
      set(...args) {
        const oldValue = this[property]
        descriptor.set.apply(this, args)
        const newValue = this[property]
        if (typeof callback === 'function') {
          setTimeout(callback.bind(this, oldValue, newValue), delay)
        }
        return newValue
      },
    })
  }
}

export const loadScript = ({ src, integrity, id, scriptInGrid = false, attr, callback = null }) => new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src
  if (integrity) {
    script.integrity = integrity
    script.crossOrigin = 'anonymous'
  }
  script.id = id
  if (attr) {
    Object.entries(attr).forEach(([key, val]) => {
      script.setAttribute(key, val)
    })
  }
  script.onload = () => {
    resolve(true)
    if (callback) callback()
  }
  script.onerror = () => {
    resolve(false)
  }

  removeScript(id, scriptInGrid)

  let bodyElm = document.body

  if (scriptInGrid) {
    bodyElm = document.getElementById('bit-grid-layout')?.contentWindow?.document.body
  }

  bodyElm.appendChild(script)
})

export const removeScript = (id, scriptInGrid = false) => {
  let bodyElm = document.body

  if (scriptInGrid) {
    bodyElm = document.getElementById('bit-grid-layout')?.contentWindow?.document.body
  }

  const alreadyExistScriptElm = bodyElm ? bodyElm.querySelector(`#${id}`) : null

  if (alreadyExistScriptElm) {
    bodyElm.removeChild(alreadyExistScriptElm)
  }
}

export const select = (selector) => document.querySelector(selector)
export const selectInGrid = (selector) => document.getElementById('bit-grid-layout')?.contentWindow?.document.querySelector(selector)
export const selectAllInGrid = (selector) => document.getElementById('bit-grid-layout')?.contentWindow?.document.querySelectorAll(selector)

export function escapeHTMLEntity(string) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  const reUnescapedHtml = /[&<>"']/g
  const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : (string || '')
}

export function unescapeHTMLEntity(string) {
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }

  const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g
  const reHasEscapedHtml = RegExp(reEscapedHtml.source)

  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    : (string || '')
}

export const getCustomClsName = (fk, element) => {
  const fields = getRecoil($fields)
  return fields[fk]?.customClasses?.[element] ?? ''
}

export const getCustomAttributes = (fk, element) => {
  const fields = getRecoil($fields)
  const attr = fields[fk]?.customAttributes?.[element]
  if (!attr) return
  const obj = {}
  if (attr) {
    const attrLen = attr.length
    let i = 0
    while (i < attrLen) {
      if (attr[i].key && attr[i].value) {
        obj[attr[i].key] = attr[i].value
      }
      i += 1
    }
  }
  return obj
}

export const getDataDevAttrArr = (fk, element) => {
  const fields = getRecoil($fields)
  const attr = fields[fk]?.customAttributes?.[element]
  const dataDevObj = { [`data-dev-${element}`]: fk }
  if (!([element] in fields[fk].customAttributes)) return dataDevObj
  if (attr) {
    const attrLen = attr.length
    let i = 0
    while (i < attrLen) {
      if (attr[i].key && attr[i].value) {
        dataDevObj[[attr[i].key]] = attr[i].value
      }
      i += 1
    }
  }
  return dataDevObj
}
/*
  find diff between 2 arr by given targeted arr
  used native for loop for perf
*/
export function targetArrDiff(arr1, arr2) {
  const diff = []
  const arr2len = arr2.length
  for (let i = 0; i < arr2len; i += 1) {
    if (arr1.indexOf(arr2[i]) === -1) {
      diff.push(arr2[i])
    }
  }
  return diff
}

/*
  find difference between obejct of depth 1 level
*/
export function getOneLvlObjDiff(currentObj, targetObj) {
  const diffObj = {}
  const currentObjKeys = Object.keys(currentObj)
  const targetObjKeys = Object.keys(targetObj)
  const currentObjKeysLength = currentObjKeys.length

  for (let i = 0; i < currentObjKeysLength; i += 1) {
    const currObjKey = currentObjKeys[i]
    if (Object.prototype.hasOwnProperty.call(targetObj, currObjKey)) {
      if (currentObj[currObjKey] !== targetObj[currObjKey]) {
        diffObj[currObjKey] = targetObj[currObjKey]
      }
    }
  }

  const diffKeys = targetArrDiff(currentObjKeys, targetObjKeys)
  for (let i = 0; i < diffKeys.length; i += 1) {
    diffObj[diffKeys[i]] = targetObj[diffKeys[i]]
  }
  return diffObj
}

/*
  merge multiple nested object
*/
export function mergeNestedObj(...args) {
  if (
    args.length === 2
    && typeof args[0] === 'object'
    && typeof args[1] === 'object'
  ) {
    return merge(...args)
  }
  let mergedObj = {}
  for (let i = 0; i < args.length - 1; i += 1) {
    if (typeof args[i] === 'object') {
      mergedObj = merge(mergedObj, merge(args[i], args[i + 1]))
    }
  }
  return mergedObj
}

/*
  remove all keys of value undefined from object
*/
export function cleanObj(object) {
  const clonedObj = deepCopy(object)

  const cleanse = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      const type = typeof value
      if (type === 'object') {
        cleanse(value)
        // remove if now "empty" object
        if (!Object.keys(value).length) {
          delete obj[key] // eslint-disable-line no-param-reassign
        }
      } else if (type === 'undefined' || type === 'null') {
        delete obj[key] // eslint-disable-line no-param-reassign
      }
    })
    return obj
  }

  return cleanse(clonedObj)
}

// export function getObjectDiff(originalObj, updatedObj, { ignoreUndefined = true } = {}) {
//   const diffObj = diff(originalObj, updatedObj)
//   // remove undefined keys form nested object
//   if (ignoreUndefined) {
//     return cleanObj(diffObj)
//   }
//   return diffObj
// }

export function getObjectDiff(...args) {
  if (args.length === 2) {
    return cleanObj(diff(args[0], args[1]))
  }
  let diffObj = {}
  for (let i = 0; i < args.length - 1; i += 1) {
    if (typeof args[i] === 'object') {
      diffObj = cleanObj(diff(diffObj, cleanObj(diff(args[i], args[i + 1]))))
    }
  }
  return diffObj
}
