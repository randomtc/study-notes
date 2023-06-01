/**
 * 函数参数
 * @param  networkRequest        网络请求
 * @param  varargs               可变参数，可使用setParame更改
 * @param  immutableArgs         不可变参数，不可使用setParame更改
 * @param  immutableArgs.notSend 控制是否发送请求 默认发送
 * -------------------------------------------------------------*
 * 返回参数
 * @param  parame                请求参数
 * @param  setParame             设置参数
 * @param  data                  请求成功数据
 * @param  trigger               重新请求的开关
 * @param  loading               请求状态
 */
import React from 'react'

interface ResData<T> {
    lists: T[]
    total?: number
    [k: string]: any
}

interface Res<T> {
    code: number
    data: ResData<T>
    message?: string
    [k: string]: any
}

interface UseGetDataReturn<T> {
    params: Record<string, any>
    setParams: React.Dispatch<React.SetStateAction<Record<string, any>>>
    data?: ResData<T> | any
    trigger: boolean
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
}

const useGetData = <T>(
    networkRequest: any,
    varargs?: Record<string, any>,
    immutableArgs?: { notSend?: boolean; [k: string]: any }
): UseGetDataReturn<T> => {
    const [params, setParams] = React.useState<Record<string, any>>({
        page: 1,
        page_size: 10,
        ...varargs
    })
    const [trigger, setTrigger] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [data, setData] = React.useState<ResData<T>>()

    const sendRequest = React.useCallback(async () => {
        setLoading(true)
        try {
            const res: Res<T> = await networkRequest({ ...params, ...immutableArgs })
            if (res?.code === 200) {
                setData(res?.data)
            } else {
                console.error(res)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [networkRequest, params, immutableArgs])

    React.useEffect(() => {
        if (!immutableArgs?.notSend) {
            sendRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, trigger])

    const returnObject: UseGetDataReturn<T> = React.useMemo(
        () => ({
            params,
            setParams,
            data,
            trigger,
            setTrigger,
            loading
        }),
        [params, data, trigger, loading, setParams, setTrigger]
    )

    return returnObject
}

export default useGetData
