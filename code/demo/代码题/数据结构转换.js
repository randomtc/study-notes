let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
]
// 输出：
// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                     // 结果 ,,,
//                 ]
//             }
//         ]
//     }
// ]

function arrToTree(arr, pid = 0) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.pid === pid) {
            newArr.push(item)
            const children = arrToTree(arr, item.id)
            if (children.length > 0) {
                newArr.children = children
            }
        }
    }
    return newArr
}


console.log(arrToTree(arr));

