/* eslint-disable no-nested-ternary */
import axios from 'axios'

export default async function bitsFetch(data, action, contentType = null, queryParam = null) {
  const response = await axios({
    // eslint-disable-next-line no-undef
    url: process.env.NODE_ENV === 'production' ? (typeof bits === 'undefined' ? bitFormsFront.ajaxURL : bits.ajaxURL) : 'http://bitapp.test/wp-admin/admin-ajax.php',
    // url: process.env.NODE_ENV === 'production' ? (typeof bits === 'undefined' ? bitFormsFront.ajaxURL : bits.ajaxURL) : 'http://192.168.1.11/wp-admin/admin-ajax.php',
    method: 'POST',
    headers: {
      'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    params: {
      action,
      // eslint-disable-next-line no-undef
      _ajax_nonce: typeof bits === 'undefined' ? '93367f5357' : bits.nonce,
      ...queryParam,
    },
    data,
    action,
  }).then(res => res.data)
    .catch(err => err.response)
  return response;
}
