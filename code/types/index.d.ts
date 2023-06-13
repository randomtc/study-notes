declare type E<T extends HTMLElement> = React.SyntheticEvent<T> //e参数类型
declare type Item<T> = Record<string | number | symbol, any> | T //遍历项类型
