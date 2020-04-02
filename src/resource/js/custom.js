
window.addEventListener('click', (e) => {
  if (e.target.id === 'arf') {
    console.log('arf')
  }
})

if (document.querySelector('.slim') != null) {
  const allSel = document.querySelectorAll('select')
  for (let i = 0; i < allSel.length; i += 1) {
    allSel.addEventListener('click', () => {

      console.log(allSel[i].parentNode.parentNode.getAttribute('btcd-id'));
    })
  }
}