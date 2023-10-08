//回调模式
function sendMEssage(name, onFulffiled, onRejected) {
    console.log(`tom=>${name}:我喜欢你。`)
    console.log(`等待${name}回复...`)

    //模拟：回复需要时间
    setTimeout(() => {
        if (Math.random() <= 0.1) {
            //成功
            onFulffiled(`${name}=>：我也喜欢你`)
        } else {
            onRejected(`${name}:你是个好人`)
        }
    }, 1000)
}
sendMEssage('张三',
    res => {
        console.log('成功:', res)
    },
    rej => {
        console.log('失败：', rej)
    }
)

//js的典型回调函数
// setTimeout(() => { }, timout)
// setInterval(() => { }, timout)
// dom.addEventListener('click', () => { })

/**
 * Promise A+ 规定
 * 1、所有异步场景，都可以看作是一个异步任务，每个异步任务，在js中应该表现为一个对象，在js中成为Promise对象，也叫做任务对象。
 * 发送短信表白、登录、延时弹窗：Promise对象
 * 
 * 
 * 2、每个任务对象，都应有两个阶段，三个状态
 * 
 * 未决阶段（unsettled ）        已决阶段（ settled）
 *    
 * 挂起状态（pending）    =>    完成状态（fulfilled）
 *                               失败状态（rejected）
 * 
 * 根据常理，它们之间存在以下逻辑：
 * 。任务总是从未决阶段变到已决阶段，无法逆行
 * 。任务总是从挂起状态到完成或失败状态，无法逆行
 * 。时间不能倒流，历史不能改写，任务一旦完成，状态就固定下来，永远无法改变
 * 
 * 
 * 3、挂起=>完成：resolve;挂起=>失败：reject，任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因
 * 
 * 4、可以针对任务进行后继处理，针对完成状态的后继处理成为onFulfilled,针对失败后继处理称之为onRejected
 */

async function m() {
    const n = await 1
    console.log(n);
}

function mCopy() {
    return Promise.resolve(1).then(n => {
        console.log(n);
    })
}

//回调模式
function sendMEssage(name, onFulffiled, onRejected) {
    console.log(`tom=>${name}:我喜欢你。`)
    console.log(`等待${name}回复...`)

    //模拟：回复需要时间
    setTimeout(() => {
        if (Math.random() <= 0.1) {
            //成功
            onFulffiled(`${name}=>：我也喜欢你`)
        } else {
            onRejected(`${name}:你是个好人`)
        }
    }, 1000)
}
sendMEssage('张三',
    res => {
        console.log('成功:', res)
    },
    rej => {
        console.log('失败：', rej)
    }
)

//js的典型回调函数
// setTimeout(() => { }, timout)
// setInterval(() => { }, timout)
// dom.addEventListener('click', () => { })

/**
 * Promise A+ 规定
 * 1、所有异步场景，都可以看作是一个异步任务，每个异步任务，在js中应该表现为一个对象，在js中成为Promise对象，也叫做任务对象。
 * 发送短信表白、登录、延时弹窗：Promise对象
 * 
 * 
 * 2、每个任务对象，都应有两个阶段，三个状态
 * 
 * 未决阶段（unsettled ）        已决阶段（ settled）
 *    
 * 挂起状态（pending）    =>    完成状态（fulfilled）
 *                               失败状态（rejected）
 * 
 * 根据常理，它们之间存在以下逻辑：
 * 。任务总是从未决阶段变到已决阶段，无法逆行
 * 。任务总是从挂起状态到完成或失败状态，无法逆行
 * 。时间不能倒流，历史不能改写，任务一旦完成，状态就固定下来，永远无法改变
 * 
 * 
 * 3、挂起=>完成：resolve;挂起=>失败：reject，任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因
 * 
 * 4、可以针对任务进行后继处理，针对完成状态的后继处理成为onFulfilled,针对失败后继处理称之为onRejected
 */

async function m() {
    const n = await 1
    console.log(n);
}

function mCopy() {
    return Promise.resolve(1).then(n => {
        console.log(n);
    })
}



//回调模式
function sendMEssage(name, onFulffiled, onRejected) {
    console.log(`tom=>${name}:我喜欢你。`)
    console.log(`等待${name}回复...`)

    //模拟：回复需要时间
    setTimeout(() => {
        if (Math.random() <= 0.1) {
            //成功
            onFulffiled(`${name}=>：我也喜欢你`)
        } else {
            onRejected(`${name}:你是个好人`)
        }
    }, 1000)
}
sendMEssage('张三',
    res => {
        console.log('成功:', res)
    },
    rej => {
        console.log('失败：', rej)
    }
)

//js的典型回调函数
// setTimeout(() => { }, timout)
// setInterval(() => { }, timout)
// dom.addEventListener('click', () => { })

/**
 * Promise A+ 规定
 * 1、所有异步场景，都可以看作是一个异步任务，每个异步任务，在js中应该表现为一个对象，在js中成为Promise对象，也叫做任务对象。
 * 发送短信表白、登录、延时弹窗：Promise对象
 * 
 * 
 * 2、每个任务对象，都应有两个阶段，三个状态
 * 
 * 未决阶段（unsettled ）        已决阶段（ settled）
 *    
 * 挂起状态（pending）    =>    完成状态（fulfilled）
 *                               失败状态（rejected）
 * 
 * 根据常理，它们之间存在以下逻辑：
 * 。任务总是从未决阶段变到已决阶段，无法逆行
 * 。任务总是从挂起状态到完成或失败状态，无法逆行
 * 。时间不能倒流，历史不能改写，任务一旦完成，状态就固定下来，永远无法改变
 * 
 * 
 * 3、挂起=>完成：resolve;挂起=>失败：reject，任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因
 * 
 * 4、可以针对任务进行后继处理，针对完成状态的后继处理成为onFulfilled,针对失败后继处理称之为onRejected
 */

async function m() {
    const n = await 1
    console.log(n);
}

function mCopy() {
    return Promise.resolve(1).then(n => {
        console.log(n);
    })
}


//回调模式
function sendMEssage(name, onFulffiled, onRejected) {
    console.log(`tom=>${name}:我喜欢你。`)
    console.log(`等待${name}回复...`)

    //模拟：回复需要时间
    setTimeout(() => {
        if (Math.random() <= 0.1) {
            //成功
            onFulffiled(`${name}=>：我也喜欢你`)
        } else {
            onRejected(`${name}:你是个好人`)
        }
    }, 1000)
}
sendMEssage('张三',
    res => {
        console.log('成功:', res)
    },
    rej => {
        console.log('失败：', rej)
    }
)

//js的典型回调函数
// setTimeout(() => { }, timout)
// setInterval(() => { }, timout)
// dom.addEventListener('click', () => { })

/**
 * Promise A+ 规定
 * 1、所有异步场景，都可以看作是一个异步任务，每个异步任务，在js中应该表现为一个对象，在js中成为Promise对象，也叫做任务对象。
 * 发送短信表白、登录、延时弹窗：Promise对象
 * 
 * 
 * 2、每个任务对象，都应有两个阶段，三个状态
 * 
 * 未决阶段（unsettled ）        已决阶段（ settled）
 *    
 * 挂起状态（pending）    =>    完成状态（fulfilled）
 *                               失败状态（rejected）
 * 
 * 根据常理，它们之间存在以下逻辑：
 * 。任务总是从未决阶段变到已决阶段，无法逆行
 * 。任务总是从挂起状态到完成或失败状态，无法逆行
 * 。时间不能倒流，历史不能改写，任务一旦完成，状态就固定下来，永远无法改变
 * 
 * 
 * 3、挂起=>完成：resolve;挂起=>失败：reject，任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因
 * 
 * 4、可以针对任务进行后继处理，针对完成状态的后继处理成为onFulfilled,针对失败后继处理称之为onRejected
 */

async function m() {
    const n = await 1
    console.log(n);
}

function mCopy() {
    return Promise.resolve(1).then(n => {
        console.log(n);
    })
}