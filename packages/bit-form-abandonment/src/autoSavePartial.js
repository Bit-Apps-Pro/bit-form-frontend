// add bit_page_lifecycle event to detect page hidden and save form progress
// https://developer.chrome.com/blog/page-lifecycle-api/#developer-recommendations-for-each-state
bit_page_lifecycle.addEventListener('statechange', event => {
  console.log(`Page is now ${event.newState}`)
  if (event.newState === 'hidden' || event.newState === 'terminated') {
    saveFormProgress()
  }
})
