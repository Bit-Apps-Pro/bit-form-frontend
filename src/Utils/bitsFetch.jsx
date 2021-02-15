/* eslint-disable no-undef */

export default async function bitsFetch(data, action, contentType = null, queryParam = null) {
  console.log('bitFromsFront', bitFromsFront)
  const uri = new URL(typeof bits === 'undefined' ? bitFromsFront?.ajaxURL : bits.ajaxURL)
  uri.searchParams.append('action', action)
  uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

  // append query params in url
  if (queryParam) {
    for (const key in queryParam) {
      if (key) {
        uri.searchParams.append(key, queryParam[key])
      }
    }
  }

  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      //  'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    body: data instanceof FormData ? data : JSON.stringify(data),
  })
    .then(res => res.json())

  return response
}
