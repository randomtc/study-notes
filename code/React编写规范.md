### 结构目录

```text
Hooks-Admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
|     |—— fonts           # 字体文件
|     |—— images          # 图片资源
|     |—— styles          # 公共css样式
│  ├─ components          # 全局组件
|     |—— index.ts        # 全局组件统一导出路径
│  ├─ config              # 全局配置项
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 自定义 Hooks
|     |—— index.ts        # 自定义 Hooks统一导出路径
│  ├─ layouts             # 框架布局
│  ├─ pages               # 项目所有页面
│  ├─ routers             # 路由管理
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
|     |—— index.ts        # 工具库统一导出路径
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```

### jsx

- 事件统一使用 <br/>
  `<div onClick={id => onDele(id)}>`

- 函数统一使用 const 声明 <br/>
  `const fn = () => { }`

- jsx 中 函数表达部分只能写一行 超过则令起函数声明

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
