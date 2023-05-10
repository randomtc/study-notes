import React from "react"
import { useGetWindowsSize } from "./useGetWindowsSize"
const useSetColSpan = () => {
  const bodyWidth = useGetWindowsSize()?.bodyWidth
  const [span, setSpan] = React.useState<number>()
  const calculateSpan = React.useCallback((width: number) => {
    if (width < 840) {
      return 20
    } else if (width < 1400) {
      return 12
    } else if (width < 1700) {
      return 8
    } else {
      return 6
    }
  }, [])
  React.useEffect(() => {
    setSpan(calculateSpan(bodyWidth as number))
  }, [bodyWidth, calculateSpan])
  const returnSpan = React.useMemo(() => span, [span])
  return returnSpan
}

export default useSetColSpan
