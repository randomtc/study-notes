/**
 * @param  request     网络请求
 * @param  params      请求参数
 * @param  success     成功后的操作
 * @param  tip         提示信息
 * @param  loading     请求状态
 */
import React from "react"
import { message } from "antd"

interface ConfirmType {
  request?: (params?: Record<string, any>) => Promise<any> | void
  params: Record<string, any>
  success?: () => void
  tip?: string | null
}

interface UseConfirmReturn {
  setConfirm: React.Dispatch<React.SetStateAction<ConfirmType>>
  loading: boolean
}

const useConfirm = (): UseConfirmReturn => {
  const [confirm, setConfirm] = React.useState<ConfirmType>({
    request: () => {},
    params: {},
    success: () => {},
    tip: null,
  })
  const [loading, setLoading] = React.useState<boolean>(false)

  const sendRequest = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await confirm?.request?.(confirm?.params)
      if (res?.code === 200) {
        confirm?.success!()
        message.success(confirm?.tip ?? "操作成功")
      } else {
        console.error(res)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setConfirm({ params: {} })
      setLoading(false)
    }
  }, [confirm])

  React.useEffect(() => {
    if (Object.keys(confirm?.params).length) {
      sendRequest()
    }
  }, [confirm, sendRequest])

  return { setConfirm, loading }
}

export default useConfirm
