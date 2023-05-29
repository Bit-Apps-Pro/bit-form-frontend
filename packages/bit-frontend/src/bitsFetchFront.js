/* eslint-disable no-undef */

export default async function bitsFetchFront(contentId, data, action, contentType = null, queryParam = null) {
  if (!bf_globals) return false
  console.log(bf_globals[contentId]?.ajaxURL, bf_globals[contentId]?.nonce, { data })
  const uri = new URL(bf_globals[contentId]?.ajaxURL)
  uri.searchParams.append('action', action)
  // uri.searchParams.append('_ajax_nonce', bf_globals[contentId]?.nonce)

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
    headers: { 'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType },
    body: data instanceof FormData ? data : JSON.stringify(data),
  })
    .then(res => res.json())

  return response
}
