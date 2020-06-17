export const hideWpMenu = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  if (process.env.NODE_ENV === 'production') {
    document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = 0
    document.getElementById('wpadminbar').style.display = 'none'
    document.getElementById('adminmenumain').style.display = 'none'
    document.getElementById('adminmenuback').style.display = 'none'
    document.getElementById('adminmenuwrap').style.display = 'none'
    document.getElementById('wpfooter').style.display = 'none'
    document.getElementById('wpcontent').style.marginLeft = 0
  }
}

export const showWpMenu = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'auto'
  if (process.env.NODE_ENV === 'production') {
    document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = '32px'
    document.getElementById('wpadminbar').style.display = 'block'
    document.getElementById('adminmenumain').style.display = 'block'
    document.getElementById('adminmenuback').style.display = 'block'
    document.getElementById('adminmenuwrap').style.display = 'block'
    document.getElementById('wpcontent').style.marginLeft = null
    document.getElementById('wpfooter').style.display = 'block'
  }
}

 export const getNewId = flds => {
  let largestNumberFld = 0
  let num = 0
  for (const fld in flds) {
    if (fld !== null && fld !== undefined) {
      num = Number(fld.match(/[0-9]/g).join(''))
      if (typeof num === 'number' && num > largestNumberFld) {
        largestNumberFld = num
      }
    }
  }
  return largestNumberFld + 1
}
