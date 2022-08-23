const generateBackslashPattern = str => (str || '').split('$_bf_$').join('\\')
export default generateBackslashPattern
