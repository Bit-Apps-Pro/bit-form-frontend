/* eslint-disable no-nested-ternary */
import axios from 'axios'

export default async function bitsFetch(data, action, contentType = null) {
  const response = await axios({
    // eslint-disable-next-line no-undef
    url: process.env.NODE_ENV === 'production' ? (typeof bits === 'undefined' ? bitAppsFront.ajaxURL : bits.ajaxURL) : 'http://192.168.1.11/wp-admin/admin-ajax.php',
    method: 'POST',
    headers: {
      'Content-Type': contentType === null ? 'application/x-www-form-urlencoded' : contentType,
    },
    params: {
      action,
      // eslint-disable-next-line no-undef
      // _ajax_nonce: bits.nonce,
    },
    data,
  }).then(res => res.data)
    .catch(err => err.response)
  return response;
}

export function prepareData(data) {
  const fdata = new FormData()
  const dat = Object.entries(data)
  for (let i = 0; i < dat.length; i += 1) {
    fdata.append(dat[i][0], dat[i][1])
  }
  return fdata
}
