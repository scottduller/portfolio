import { useEffect } from 'react'
import { debounce } from 'lodash'

const useResizeDebounce = (callback: () => void, delay: number) => {
  const handler = debounce(callback, delay)

  useEffect(() => {
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useResizeDebounce
