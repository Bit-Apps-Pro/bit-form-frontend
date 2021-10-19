const ALPHA_MAX = 100
const RGB_MAX = 255
function clamp(value = 0, max, min = 0) {
  // eslint-disable-next-line no-nested-ternary
  return value < min ? min : value > max ? max : value
}
export const normalizeRgb = ({ r, g, b }) => ({
  r: clamp(r, RGB_MAX, 0),
  g: clamp(g, RGB_MAX, 0),
  b: clamp(b, RGB_MAX, 0),
})
export const rgb2Hsv = (rgb) => {
  const { r, g, b } = normalizeRgb(rgb)
  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const cmax = Math.max(red, green, blue)
  const cmin = Math.min(red, green, blue)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let v = 0

  if (delta) {
    if (cmax === red) {
      h = (green - blue) / delta
    }
    if (cmax === green) {
      h = 2 + (blue - red) / delta
    }
    if (cmax === blue) {
      h = 4 + (red - green) / delta
    }
    if (cmax) s = delta / cmax
  }

  // eslint-disable-next-line no-bitwise
  h = (60 * h) | 0
  if (h < 0) h += 360
  // eslint-disable-next-line no-bitwise
  s = (s * 100) | 0
  // eslint-disable-next-line no-bitwise
  v = (cmax * 100) | 0
  return { h, s, v }
}

/**
* @func hsl2hsv
* @desc Return an HSV color from an HSL color
* @param {Number} h - Hue Angle (0 - 360)
* @param {Number} s - Saturation (0 - 100)
* @param {Number} l - Lightness (0 - 100)
* @return {ArrayHSV}
* @example
* hsl2hsv(0, 100, 50)
* @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
*/

export function hsl2hsv(hslH, hslS, hslL) {
  const hsv1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100
  const hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (hslL + hsv1) * 100
  const hsvV = hslL + hsv1
  return [hslH, hsvS, hsvV]
}
/**
* @func hsv2hsl
* @desc Return an HSL color from an HSV color
* @param {Number} h - Hue Angle (0 - 360)
* @param {Number} s - Saturation (0 - 100)
* @param {Number} v - Value (0 - 100)
* @return {ArrayHSL}
* @example
* hsv2hsl(0, 0, 0) // => [0, 100, 50]
* @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
*/
export function hsv2hsl(hsvH, hsvS, hsvV) {
  const hslL = (200 - hsvS) * hsvV / 100
  const [hslS, hslV] = [
    hslL === 0 || hslL === 200 ? 0 : hsvS * hsvV / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
    hslL * 5 / 10,
  ]
  return [hsvH, hslS, hslV]
}

export const rgb2Hex = ({ r, g, b }, withHash = true) => (
  (withHash ? '#' : '')
  // eslint-disable-next-line no-bitwise
  + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
)

export const hsl2Rgb = ({ h, s, l }) => {
  const sat = s / 100
  const light = l / 100
  let C = sat * (1 - Math.abs(2 * light - 1))
  const H = h / 60
  let X = C * (1 - Math.abs((H % 2) - 1))
  let m = light - C / 2
  const precision = 255

  // eslint-disable-next-line no-bitwise
  C = ((C + m) * precision) | 0
  // eslint-disable-next-line no-bitwise
  X = ((X + m) * precision) | 0
  // eslint-disable-next-line no-bitwise
  m = (m * precision) | 0
  if (H >= 0 && H < 1) {
    return { r: C, g: X, b: m }
  }
  if (H >= 1 && H < 2) {
    return { r: X, g: C, b: m }
  }
  if (H >= 2 && H < 3) {
    return { r: m, g: C, b: X }
  }
  if (H >= 3 && H < 4) {
    return { r: m, g: X, b: C }
  }
  if (H >= 4 && H < 5) {
    return { r: X, g: m, b: C }
  }
  if (H >= 5 && H < 6) {
    return { r: C, g: m, b: X }
  }
  return { r: 0, g: 0, b: 0 }
}
export const rgba2RgbStr = ({ r, g, b, a }) => (typeof a === 'number' && isNaN(a) === false
  ? `rgba(${r}, ${g}, ${b}, ${clamp(a, ALPHA_MAX, 0) / 100})`
  : `rgb(${r}, ${g}, ${b})`)

export const rgba2Str = (value) => (value.a < ALPHA_MAX ? rgba2RgbStr(value) : rgb2Hex(value))

const getColorFromRGBA = ({ r, g, b, a }) => {
  const { h, s, v } = rgb2Hsv({ r, g, b })
  const hex = rgb2Hex({ r, g, b }, false)
  const str = rgba2Str({ r, g, b, a })
  return { r, g, b, a, h, s, v, hex, str }
}

/**
 * If `str` is in valid `rgb()` or `rgba()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
// eslint-disable-next-line no-underscore-dangle
function _rgba(str) {
  if (!str) {
    return undefined
  }

  const match = str.match(/^rgb(a?)\(([\d., ]+)\)$/)
  if (match) {
    const hasAlpha = !!match[1]
    const expectedPartCount = hasAlpha ? 4 : 3
    const parts = match[2].split(/ *, */).map(Number)

    if (parts.length === expectedPartCount) {
      return {
        r: parts[0],
        g: parts[1],
        b: parts[2],
        a: hasAlpha ? parts[3] * 100 : ALPHA_MAX,
      }
    }
  }
}

/**
 * Uses the browser's getComputedStyle() to determine what the passed-in color is.
 * This assumes _rgba, _hex6, _hex3, and _hsla have already been tried and all failed.
 * This works by attaching an element to the DOM, which may fail in server-side rendering
 *   or with headless browsers.
 */
// eslint-disable-next-line no-underscore-dangle
function _browserCompute(str) {
  if (typeof document === 'undefined') {
    // don't throw an error when used server-side
    return undefined
  }
  const elem = document.createElement('div')
  elem.style.backgroundColor = str
  // This element must be attached to the DOM for getComputedStyle() to have a value
  elem.style.position = 'absolute'
  elem.style.top = '-9999px'
  elem.style.left = '-9999px'
  elem.style.height = '1px'
  elem.style.width = '1px'
  document.body.appendChild(elem)
  const eComputedStyle = getComputedStyle(elem)
  const computedColor = eComputedStyle && eComputedStyle.backgroundColor
  document.body.removeChild(elem)
  // computedColor is always an RGB(A) string, except for invalid colors in IE/Edge which return 'transparent'

  // browsers return one of these if the color string is invalid,
  // so need to differentiate between an actual error and intentionally passing in this color
  if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
    // eslint-disable-next-line default-case
    switch (str.trim()) {
      // RGB and HSL were already checked at the start of the function
      case 'transparent':
      case '#0000':
      case '#00000000':
        return { r: 0, g: 0, b: 0, a: 0 }
    }
    return undefined
  }

  return _rgba(computedColor)
}

/**
 * If `str` is in `hsl()` or `hsla()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
// eslint-disable-next-line no-underscore-dangle
function _hsla(str) {
  const match = str.match(/^hsl(a?)\(([\d., ]+)\)$/)
  if (match) {
    const hasAlpha = !!match[1]
    const expectedPartCount = hasAlpha ? 4 : 3
    const parts = match[2].split(/ *, */).map(Number)

    if (parts.length === expectedPartCount) {
      const rgba = hsl2Rgb({ h: parts[0], s: parts[1], l: parts[2] })
      rgba.a = hasAlpha ? parts[3] * 100 : ALPHA_MAX
      return rgba
    }
  }
}

/**
 * If `str` is in valid 3-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
// eslint-disable-next-line no-underscore-dangle
function _hex3(str) {
  if (str[0] === '#' && str.length === 4 && /^#[\da-fA-F]{3}$/.test(str)) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: ALPHA_MAX,
    }
  }
}

/**
 * If `str` is in valid 6-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
// eslint-disable-next-line no-underscore-dangle
function _hex6(str) {
  if (str[0] === '#' && str.length === 7 && /^#[\da-fA-F]{6}$/.test(str)) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: ALPHA_MAX,
    }
  }
}

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
export function cssColor(color) {
  if (!color) {
    return undefined
  }

  // Need to check the following valid color formats: RGB(A), HSL(A), hex, named color

  // First check for well formatted RGB(A), HSL(A), and hex formats at the start.
  // This is for perf (no creating an element) and catches the intentional "transparent" color
  //   case early on.
  const easyColor = _rgba(color) || _hex6(color) || _hex3(color) || _hsla(color)
  if (easyColor) {
    return easyColor
  }

  // if the above fails, do the more expensive catch-all
  return _browserCompute(color)
}
export function str2Color(inputColor) {
  const color = cssColor(inputColor)

  if (!color) {
    return
  }

  return {
    ...getColorFromRGBA(color),
    str: inputColor,
  }
}
