/**
 * @param  request     网络请求
 * @param  params      请求参数
 * @param  success     成功后的操作
 * @param  tip         提示信息
 * @param  loading     请求状态
 */
import { useEffect, useState } from "react"
import { message } from "antd"

interface Confirm {
  request?: (params?: Record<string, any>) => Promise<any> | void
  params: Record<string, any>
  success?: () => void
  tip?: string | null
}

interface UseConfirmReturn {
  setConfirm: React.Dispatch<React.SetStateAction<Confirm>>
  loading: boolean
}

const useConfirm = (): UseConfirmReturn => {
  const [confirm, setConfirm] = useState<Confirm>({
    request: () => {},
    params: {},
    success: () => {},
    tip: null,
  })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (Object.keys(confirm?.params).length) {
      sendRequest()
    }
  }, [confirm])

  async function sendRequest() {
    setLoading(true)
    try {
      const res = await confirm?.request!(confirm?.params)
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
  }

  return { setConfirm, loading }
}

export default useConfirm
