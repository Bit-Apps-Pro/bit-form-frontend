import { useEffect } from 'react'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { isVarEmpty } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'

const defaultOpts = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

const checkData = (data: DataResponseType) => data?.success && !data?.data?.errors && !isVarEmpty(data.data)

const useSWROnce = (key: string | string[], urlData: object, options: IOptionsType = {}) => {
  const shouldFetch = ('fetchCondition' in options) ? options.fetchCondition : true
  const swrKey = shouldFetch ? key : null

  const swrData = useSWR(
    swrKey,
    (url: string | string[]) => {
      const resp = bitsFetch(urlData, Array.isArray(url) ? url[0] : url)
      if (options.onLoading && swrData.isLoading) {
        options.onLoading()
      }
      return resp
    },
    {
      ...defaultOpts,
      ...options,
      onSuccess: data => options.onSuccess && checkData(data) && options.onSuccess(data.data),
    },
  )

  useEffect(() => {
    if (!checkData(swrData.data)) return
    const { data } = swrData.data
    if (options.onMount) {
      options.onMount(data)
    } else if (options.onSuccess) {
      options.onSuccess(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return swrData
}

export default useSWROnce

type DataResponseType = {
  success: boolean
  data: {
    errors?: object
  } | any
}

type IOptionsType = SWRConfiguration & {
  fetchCondition?: boolean
  onLoading?: () => void
  onSuccess?: (data: any) => void
  onMount?: (data: any) => void
}
