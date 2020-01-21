import axios from "axios"

export default function bitsFetch(data,action) {
        const response = axios({
          url: bits.ajaxURL,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            action: action,
            _ajax_nonce: bits.nonce
          },
          data: data
        }).then(res => res.data)
        .catch (err => err.response.data)
        return response;
}
