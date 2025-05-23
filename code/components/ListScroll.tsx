import React from 'react'

const ListScroll = () => {
    const topDiv: any = React.useRef();
    const timeRef: any = React.useRef()
    const [data, setData] = React.useState([1, 2, 3, 4, 5])
    React.useEffect(() => {
        openScroll()
        return () => clearInterval(timeRef.current)
    }, [])
    const openScroll = () => {
        console.log(1111)

        let num = 0
        timeRef.current = setInterval(() => {
            let newData = [...data]
            // console.log(divRef.current)
            num = num + 15
            topDiv.current.style.marginTop = `-${num}px`

            if (num > 1000) {
                newData.splice(0, 5)
                newData.push(1, 2, 3, 4, 5)
                setData(newData)
                num = 0
                clearInterval(timeRef.current)
                openScroll()
            }
        }, 100)
    }
    return (
        <div
            style={{
                width: 200,
                height: 200,
                backgroundColor: 'red',
                overflow: 'auto'
            }}
        >
            <div ref={topDiv}>
                {[...data, ...data].map((item: any) => (
                    <div
                        style={{
                            width: 200,
                            height: 200,
                            fontSize: 38,
                            color: 'white'
                        }}
                        key={`1+${item}`}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListScroll
