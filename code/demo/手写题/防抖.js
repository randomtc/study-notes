function debounce(fun, delay) {
    let timer;
    return function (...args) {
        clearInterval(timer)
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}