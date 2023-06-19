import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import bitsFetch from '../Utils/bitsFetch'

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

const useSWROnce = (key, urlData, onDataFetched) => {
  const isDataFetching = useRef(false)
  const swrData = useSWR(key, url => bitsFetch(urlData, Array.isArray(url) ? url[0] : url), options)
  const { isLoading, data } = swrData

  useEffect(() => {
    if (isLoading) isDataFetching.current = true
    if (isDataFetching.current && !isLoading && data.success) {
      onDataFetched(data.data)
      isDataFetching.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return swrData
}

export default useSWROnce
