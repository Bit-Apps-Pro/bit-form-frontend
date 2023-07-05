import { useEffect } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { isVarEmpty } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'

const defaultOpts = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

const checkData = data => data?.success && !data?.data?.errors && !isVarEmpty(data.data)

const useSWROnce = (key, urlData, options = {}) => {
  const shouldFetch = ('fetchCondition' in options) ? options.fetchCondition : true
  const swrKey = shouldFetch ? key : null

  const swrData = useSWR(
    swrKey,
    url => {
      const resp = bitsFetch(urlData, Array.isArray(url) ? url[0] : url)
      if (swrData.isLoading) {
        toast.promise(resp, {
          loading: 'Loading...',
          success: 'Data loaded!',
          error: 'Error loading data',
        })
      }
      return resp
    },
    {
      ...defaultOpts,
      ...options,
      onSuccess: data => checkData(data) && options.onSuccess(data.data),
    },
  )

  useEffect(() => {
    if (!checkData(swrData.data)) return
    const { data } = swrData.data
    if (options.onMount) {
      options.onMount(data)
    } else {
      options.onSuccess(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return swrData
}

export default useSWROnce
