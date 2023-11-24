function getName(name: string): string {
    return `12${name}`
}

function aaa(p: any) {
    console.log(p)
}

function fn1<T>(x: T): T {
    // console.log(x);
    return x
}
fn1({ 0: [2, 4], yu: 'sdwsd' })
fn1('asqsq')
const fun = <T,>(x: T): T => {
    return x
}
fun<number>(5)

type aa = {
    name: string
    fly(a: number): number
}
type aa1 = {
    x: number
}
const aSx: aa & aa1 = {
    name: '1',
    fly(a) { return 1 },
    x: 2
}

const scsd: Array<number> = [1, 2]
interface newArray<T> {
    [idx: number]: T
}
const sdofs: newArray<number> = [3, 4]

interface A {
    fn: (val: number) => string
}
interface B {
    fn: (val: string) => string
}
type ab = A & B

let aB: ab = {
    fn(a) { return '3' }
}
aB.fn(3)
aB.fn('3')

interface Length { length: number }
//添加约束
function id3<T extends Length>(val: T): void {
    // val.length
}
id3([1, 2])
id3('12')
id3({ length: 10, name: 'we' })


function getPro<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
getPro({ name: 'qa', age: 18 }, 'age')
getPro('abc', 'split')
getPro('qwdqws', 3) //q


interface IdFunc<T> {
    id: (val: T) => T,
    ids: () => T[]
}
const obj: IdFunc<number> = {
    id(val) { return val },
    ids: () => [1, 2]
}

function id<T>(val: T): T {
    return val
}
const newid = <T,>(val: T): T => val

//泛型的约束收缩类型
function id1<T>(val: T[]): T[] {
    // val.length
    return val
}
type ty = {
    name: 'age'
}
function fn4(obj: Record<string, ty>, key: string) {
    return obj[key]
}
