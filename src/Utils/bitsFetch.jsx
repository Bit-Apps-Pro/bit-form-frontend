import axios from 'axios'

export default async function bitsFetch(data, action) {
  const response = await axios({
    // eslint-disable-next-line no-undef
    url: bits.ajaxURL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      action,
      // eslint-disable-next-line no-undef
      _ajax_nonce: bits.nonce,
    },
    data,
  }).then(res => res.data)
    .catch(err => err.response.data)
  return response;
}
