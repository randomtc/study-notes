### jsx
- 事件统一使用 <br/>
`<div onClick={id => onDele(id)}>`

- 函数统一使用const声明 <br/>
`const fn = () => { }`

- jsx中js部分只能写一行js超过则令起函数声明
 ```ts
     const App = () => {
        const [bool, setBool] = useState<boolean>(false)

        const onSetBool = () => {
            if (Math.random() > 0.5) {
                setBool(!bool)
            }
        }
        
        return (
            <>
                <div onClick={() => setBool(!bool)}>单行写法</div>

                <div onClick={() => onSetBool()}>js超过一行写法</div>
            </>
        )
    }
 ```
