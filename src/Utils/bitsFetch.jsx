/* eslint-disable no-undef */

export default async function bitsFetch(data, action, contentType = null, queryParam = null) {
  const uri = new URL(typeof bits === 'undefined' ? bitFromsFront.ajaxURL : bits.ajaxURL)
  uri.searchParams.append('action', action)
  uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())

  return response
}
