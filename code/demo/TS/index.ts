const num: number = 25
const arr: number[] = [2, 123, 12312]
const arr1: Array<number> = [1, 2, 3, 4]


interface dataType {
    name: string
    age?: number
}
const mag: dataType[] = [
    { name: 'aaa', age: 0 },
    { name: 'vvv' },
    { name: 'aaaa', age: 12 },
]

interface anyType {
    [key: string]: any
}

interface MyArray<T> {
    [key: number]: T
}

const random: anyType[] = [
    { a: 1, b: 2, c: 'sdsd' },
    { c: 's' }
]
const arr2: MyArray<number> = [1, 45]

interface dataTypeAdd extends dataType {
    sex: number
}
const ceshi: dataTypeAdd = {
    name: '112',
    sex: 2,
    age: 13
}

enum sexType {
    '男' = 1,
    '女' = 2
}


console.log(sexType.男);

const a: string | string[] = ['1']

const strs = ['1', 'a']
strs.forEach(itm => { })

//泛型工具类
interface Props {
    id: number
    name: string
    sex?: number
}
// type cx<T, P> = { [K in keyof T]: P }
// type newcxx = cx<Props, string>

//Partial<T>  将T的所有属性都变为可选的了
type PartialProps = Partial<Props>
type newPartial<T> = { [K in keyof T]?: T[K] }

//Redadonly<T> 将T的属性都变为只读的
type RedadonlyProp = Readonly<Props>
type newReadonly<T> = { readonly [K in keyof T]: T[K] }

//Pick<T,K>从T中选择一组属性构建新类型
type newPick<T, K extends keyof T> = { [P in K]: T[P] }
type PickProps = Pick<Props, 'id' | 'sex'>

//Record<K,T>构造一个对象类型，属性键为K，属性类型为T
type RecordObj = Record<'a' | 'b', number>
type newRecord<K extends string | number | symbol, T> = { [P in K]: T }
type newRecord1<K extends keyof any, T> = { [P in K]: T }
type sss = Record<string, string | number | boolean>
const newSss: sss = { 1: '1', '3': false, a: 2 }

//映射类型in
type PropKeys = 'x' | 'y' | 'z'
type newPropKeys = { [K in PropKeys]: number }
//keyof 配合映射类型
type Props1 = { a: number, b: number, c: boolean }
type newProps1 = { [K in keyof Props1]: number }

//自己写一个copy对象的方法
type copyProps<T> = { [K in keyof T]: T[K] }
const copyProp: copyProps<Props> = { id: 1, name: 'a' }

//查询索引类型
type props2 = Props['id' | 'name']
type props3 = Props[keyof Props]

//type A = 'a' | 'b' 限制一个对象时 { 'a': 'a', 'b': 'b' }
type AB<T extends keyof any> = {
    [K in T]: K
}
const test: AB<'a' | 'b'> = { a: 'a', b: 'b' }

type CeShi<T, P> = {
    fn: (val: T) => P
}

const p = new Promise((res, req) => { })


interface Edit<T, K, X = number> {
    add: (a: K) => K
    x: X
    t: T
}
const b: Edit<string, number> = {
    add(val) { return 3 },
    x: 3,
    t: '2'
}

interface CustomSuccessData<T> {
    code: number
    msg?: string
    message?: string
    data?: T
    [keys: string]: any
}
interface Data {
    id: number
    name: string
    xiarr: number[]
}
const data1: CustomSuccessData<Data[]>[] = [
    {
        code: 2,
        data: [
            {
                id: 1,
                name: 'loi',
                xiarr: [2]
            }
        ]
    }
]


var state = {
    cred1: 'value1',
    cred2: 'value2'
}

const arr3 = ['a', 'b', 'c']

type stateValueType = typeof state
type stateKeyType = keyof typeof state;

Object.values(arr3)