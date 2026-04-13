# AI 消息渲染方案对比

> 本文档对比三种 AI 消息渲染方案：当前 SSE 流式聊天方案、A2UI 协议渲染引擎、Markdown 插件系统方案。

---

## 目录

1. [方案一：当前 SSE 流式聊天方案](#方案一当前-sse-流式聊天方案)
2. [方案二：A2UI 协议渲染引擎](#方案二a2ui-协议渲染引擎)
3. [方案三：Markdown 插件系统方案](#方案三markdown-插件系统方案)
4. [方案对比](#方案对比)
5. [如何抉择](#如何抉择)
6. [后端支持的数据输出类型](#后端支持的数据输出类型)

---

## 方案一：当前 SSE 流式聊天方案

### 核心文件

```
fe/apps/web/
    hooks/useChat.ts              # 编排层：SSE 请求 + 状态管理
    hooks/useMessageState.ts      # 状态层：Reducer 管理 history / streaming
    hooks/utils/sse-client.ts     # 传输层：SSE 协议解析 + Zod 验证
    hooks/message-handlers/       # 事件层：各类 SSE 事件处理器
    pages/chat/MessageItem.tsx    # 渲染层：消息 parts 分发渲染
    types/message-types.ts        # 类型层：Message / MessagePart 联合类型
```

### 渲染核心流程

```
后端 SSE 流
    │  data: {"type":"message","content":"# 标题\n"}
    │  data: {"type":"tool_start","node":"search"}
    │  data: {"type":"candidate_matched","data":{...}}
    ↓
processSSE（sse-client.ts）
    │  逐行解析 data: 前缀
    │  Zod schema 验证每个事件
    ↓
eventHandlers（message-handlers/index.ts）
    │  按 event.type 分发到对应 handler
    │  每个 handler 接收当前 Message，返回更新后的 Message
    ↓
dispatch({ type: 'UPDATE_STREAM', updater })（useMessageState.ts）
    │  Reducer 不可变更新 streaming.message
    ↓
MessageItem（MessageItem.tsx）
    │  message.parts.map() 线性遍历
    │  按 part.type switch 分发到对应组件
    ↓
具体 UI 组件
    Text / ToolNode / CandidateGrid / CampaignCreated / SimulatedCampaign
```

### 输入格式（后端 SSE 输出）

```
data: {"type":"message","content":"正文文本内容"}
data: {"type":"tool_start","node":"search_tool","content":"搜索中"}
data: {"type":"tool_end","node":"search_tool","content":"搜索完成"}
data: {"type":"candidate_matched","data":{"candidate":{...}}}
data: {"type":"campaign_created","data":{"campaign_id":"xxx","campaign_title":"xxx"}}
data: {"type":"simulation_campaign_started","data":{"candidate":{...}}}
data: {"type":"simulation_sales_message","data":{...}}
data: {"type":"simulation_client_message","data":{...}}
data: {"type":"simulation_result_success","data":{...}}
```

### 输出格式（React State）

```typescript
type Message = {
  role: 'user' | 'assistant';
  id: string;
  parts: MessagePart[];
};

type MessagePart =
  | { type: 'text'; content: string }
  | { type: 'tool-node'; node: string; status: 'loading' | 'loaded'; content?: string }
  | { type: 'candidate-grid'; candidates: CandidateProfile[] }
  | { type: 'campaign-created'; data: CampaignCreated }
  | { type: 'confirm-button'; button: ConfirmCampaignButton }
  | { type: 'simulated-campaign'; conversations: SimulatedConversation[]; activeContactId: string };
```

### 渐进式更新机制

```
流式阶段：streaming.message 持续更新
    │
    ├─ text part：内容累积（content += delta）
    ├─ tool-node part：状态切换 loading → loaded
    ├─ candidate-grid part：candidates 数组追加
    └─ simulated-campaign part：conversations 增量更新
    │
流结束：dispatch(END_STREAM) → streaming 移入 history
```

---

## 方案二：A2UI 协议渲染引擎

> 来自 `@ant-design/x-card` 包，通用 AI → UI 协议渲染引擎。

### 核心文件

```
x-main/packages/x-card/src/A2UI/
    Box.tsx               # 容器：Context Provider + Catalog 加载
    Card.tsx              # 渲染单元：命令消费 + NodeRenderer 递归渲染
    Card.v0.8.ts          # v0.8：resolveProps / extractDataUpdates
    Card.v0.9.ts          # v0.9：resolveProps / extractDataUpdates
    format/components.ts  # 核心转换：协议数据 → ReactComponentTree
    catalog.ts            # 组件 Schema 定义与验证
    utils.ts              # 路径绑定工具：getValueByPath / setValueByPath
```

### 渲染核心流程

```
commands[] 数组（外部传入）
    │  { version: 'v0.9', createSurface: { surfaceId, catalogId } }
    │  { version: 'v0.9', updateDataModel: { path, value } }
    │  { version: 'v0.9', updateComponents: { components: [...] } }
    ↓
Box（Box.tsx）
    │  监听 commands，处理 createSurface → 加载 Catalog
    │  通过 BoxContext 广播 commandQueue 给子 Card
    ↓
Card（Card.tsx）
    │  useEffect 监听 commandQueue
    │  过滤属于自身 surfaceId 的命令
    │  批量处理所有命令（减少 re-render）
    ↓
ComponentTransformer.transform()（format/components.ts）
    │  parseV09Node()：协议组件 → ReactComponentTree
    │  componentMap.set(id, node)（增量合并，支持渐进式更新）
    │  返回 componentMap.get('root')
    ↓
resolvePropsV09()（Card.v0.9.ts）
    │  { path: "/user/name" } → getValueByPath(dataModel, "/user/name")
    │  action.event.context 中的 path 保留（写入目标，不替换）
    ↓
NodeRenderer 递归（Card.tsx）
    │  根据 type 从 components 注册表取到 React 组件
    │  children ID → 递归渲染子节点
    ↓
React 组件树（任意嵌套深度）
```

### 输入格式（v0.9 命令协议）

```typescript
// 1. 创建 Surface
{ version: 'v0.9', createSurface: { surfaceId: 'card-1', catalogId: 'https://...' } }

// 2. 更新数据模型
{ version: 'v0.9', updateDataModel: { surfaceId: 'card-1', path: '/user/name', value: 'John' } }

// 3. 更新组件（可多次增量调用）
{
  version: 'v0.9',
  updateComponents: {
    surfaceId: 'card-1',
    components: [
      { id: 'root', component: 'Container', children: ['header', 'body'] },
      { id: 'header', component: 'Text', text: { path: '/user/name' } },  // 数据绑定
      { id: 'body', component: 'Button', label: '提交',
        action: { event: { name: 'submit', context: { val: { path: '/form/val' } } } } },
    ]
  }
}

// 4. 删除 Surface
{ version: 'v0.9', deleteSurface: { surfaceId: 'card-1' } }
```

### 输出格式

```typescript
// 内部中间态：ReactComponentTree（componentMap 持久缓存）
interface ReactComponentTree {
  type: string; // 组件类型，对应 components 注册表 key
  props: Record<string, any>; // path 绑定已转为路径字符串
  children?: string[]; // 子节点 ID 列表
}

// 最终输出：React 渲染树（NodeRenderer 递归展开）
```

### 渐进式更新机制

```
componentMap（持久化 Map，useRef 维护，跨 render 不丢失）
    │
    ├─ 第 1 次 updateComponents：root + header 入 Map → 渲染骨架
    ├─ 第 2 次 updateComponents：body 入 Map，覆盖同名节点 → 补充内容
    └─ 第 N 次 updateComponents：增量合并，局部覆盖更新
    │
dataModel（useState）
    └─ updateDataModel → 路径更新 → 绑定该路径的所有组件自动重渲
```

---

## 方案三：Markdown 插件系统方案

> 位于 `fe/apps/web/pages/demo`，是对方案一的扩展增强。

### 核心文件

```
fe/apps/web/pages/demo/
    index.page.tsx                        # 页面入口：插件注册 + 流式渲染
    MarkdownPlugins/
        index.tsx                         # 公开 API：类型 + 注册函数
        registry.tsx                      # 核心：注册表 + PluginCodeBlock 适配器
    CustomPlugins/
        customCardPlugins.tsx             # customCard 插件实现
        customFormPlugins.tsx             # customForm 插件实现
        index.tsx                         # re-export
```

### 渲染核心流程

````
后端 SSE 流（普通 message 事件，content 为 Markdown 文本）
    │  data: {"type":"message","content":"```customCard\ndata:{...}\n```\n"}
    ↓
handleTextMessage（message-handlers）
    │  累积到 text part 的 content 字符串
    ↓
XMarkdown（@ant-design/x-markdown）
    │  marked 解析 Markdown → HTML
    │  code 代码块 → <code class="language-customCard">data:{...}</code>
    │  components.code = PluginCodeBlock（注入）
    ↓
PluginCodeBlock（MarkdownPlugins/registry.tsx）
    │  从 className 提取语言名 → 'customCard'
    │  registry.get('customCard') 查找已注册插件
    │  parseStandardPluginData(raw)：
    │    ├─ JSON 解析成功 → { data: T, isLoading: false }
    │    └─ JSON 未完整（流式中）→ { data: null, isLoading: true }
    ↓
plugin.render({ data, raw, isLoading })
    │  isLoading = true  → 渲染 Skeleton 占位
    │  isLoading = false → 渲染真实 UI（Card / Form / ...）
    ↓
React 组件
````

### 输入格式

**SSE 文本流（Markdown 代码块嵌入 message 事件）：**

````
data: {"type":"message","content":"# 标题\n\n正文内容\n\n"}
data: {"type":"message","content":"```customCard\n"}
data: {"type":"message","content":"data:{\"title\":\"Welcome\",\"description\":\"hello\"}\n"}
data: {"type":"message","content":"```\n"}
````

**对应完整 Markdown 源文本：**

````markdown
# 标题

正文内容

```customCard
data:{"title":"Welcome Card","description":"This is a simple custom card block."}
```

```customForm
data:[{"name": "John", "age": 16}, {"name": "Jane", "age": 25}]
```
````

### 输出格式

**插件 Props 类型：**

```typescript
interface CodePluginRenderProps<TData> {
  data: TData | null; // null 表示流式中，数据未完整
  raw: string; // 原始代码块文本（完整字符串）
  isLoading: boolean; // true = data 为 null → 显示 Skeleton
}

interface CodePlugin<TData = unknown> {
  name: string; // 代码块语言名，如 'customCard'
  render: (props: CodePluginRenderProps<TData>) => ReactNode;
}
```

### 渐进式更新机制

```
流式阶段（isLoading = true）
    │  代码块内容尚不完整，JSON 无法解析
    │  parseStandardPluginData 返回 null
    │  插件 render 收到 isLoading=true → 渲染 Skeleton
    ↓
代码块传输完整（isLoading = false）
    │  data:JSON 可被完整解析
    │  插件 render 收到真实 data → 渲染真实 UI
    ↓
Skeleton → 真实 UI（平滑切换，无闪烁）
```

### 新增插件

````tsx
// 1. 创建 CustomPlugins/helloPlugin.tsx
import type { CodePlugin, CodePluginRenderProps } from '../MarkdownPlugins';

const helloPlugin: CodePlugin<{ text: string }> = {
  name: 'hello',
  render({ data, isLoading }: CodePluginRenderProps<{ text: string }>) {
    if (isLoading) return <Skeleton.Input active />;
    return <div>Hello: {data?.text}</div>;
  },
};

// 2. 在 index.page.tsx 注册
registerPlugins([customFormPlugin, customCardPlugin, helloPlugin]);

// 3. 后端输出对应 Markdown
// ```hello
// data:{"text":"World"}
// ```
````

---

## 方案对比

| 维度 | 方案一：SSE 聊天流 | 方案二：A2UI 协议 | 方案三：MD 插件系统 |
| --- | :-: | :-: | :-: |
| **核心抽象** | Message.parts 线性列表 | ReactComponentTree 树形 | Markdown code block 插件 |
| **数据载体** | SSE event.type 字段 | A2UI 命令协议对象 | Markdown 代码块语言名 + `data:JSON` |
| **流式渲染** | ⭐⭐⭐⭐⭐ 逐事件原生更新 | ⭐⭐⭐⭐ 多次 updateComponents 增量合并 | ⭐⭐⭐⭐⭐ XMarkdown 原生，Skeleton 过渡 |
| **Markdown 混排** | ⭐⭐ 需单独处理 text part | ⭐⭐ 需额外封装 | ⭐⭐⭐⭐⭐ 天然支持，代码块嵌入正文 |
| **数据绑定** | ⭐⭐ 无，直接值 | ⭐⭐⭐⭐⭐ 路径绑定 + 双向绑定 | ⭐⭐ 无，单向渲染 |
| **组件嵌套** | ⭐⭐ 扁平 parts，不支持嵌套 | ⭐⭐⭐⭐⭐ 树形，任意嵌套 | ⭐⭐⭐ 单组件，不支持嵌套 |
| **扩展新组件** | ⭐⭐⭐ 改 handler + MessagePart 类型 | ⭐⭐⭐⭐⭐ 注册组件即可 | ⭐⭐⭐⭐⭐ registerPlugin 一行注册 |
| **消息持久化** | ⭐⭐⭐⭐⭐ Message 结构直接存储 | ⭐⭐ 需序列化整个组件树 | ⭐⭐⭐⭐⭐ Markdown 文本直接存储 |
| **前后端协议复杂度** | ⭐⭐⭐ 固定 type 字段，需前后端同步 | ⭐⭐ 需实现 A2UI 命令生成 | ⭐⭐⭐⭐⭐ 仅约定 `data:JSON` 格式 |
| **实现复杂度** | ⭐⭐⭐ 中等，维护 handler 列表 | ⭐⭐ 高，需引入命令协议层 | ⭐⭐⭐⭐⭐ 低，插件独立解耦 |
| **调试友好度** | ⭐⭐⭐⭐ SSE 事件可直接 inspect | ⭐⭐⭐ 命令队列需额外 log | ⭐⭐⭐⭐⭐ Markdown 源文本直接可读 |

---

## 如何抉择

### 决策树

```
业务需求分析
    │
    ├─ 是否需要在 Markdown 正文中嵌入自定义展示组件？
    │       │
    │       ├─ 是 → ✅ 方案三（MD 插件系统）
    │       │         文本 + 卡片混排，流式友好，后端只需输出 Markdown
    │       │
    │       └─ 否 ↓
    │
    ├─ 是否需要 AI 动态生成复杂嵌套 UI（含表单交互、数据双向绑定）？
    │       │
    │       ├─ 是 → ✅ 方案二（A2UI 协议）
    │       │         完全由 AI 控制 UI 结构，支持嵌套组件树
    │       │
    │       └─ 否 ↓
    │
    └─ 是否是已知结构的业务事件（候选人匹配、营销活动创建）？
            │
            ├─ 是 → ✅ 方案一（SSE 聊天流）
            │         类型固定，稳定维护，现有代码即可
            │
            └─ 否 → ✅ 方案三（MD 插件系统）扩展性最好
```

### 场景推荐

| 使用场景                             | 推荐方案   | 理由                                      |
| ------------------------------------ | ---------- | ----------------------------------------- |
| 当前聊天页（候选人卡片、营销活动）   | **方案一** | 结构固定，类型已知，维护成本低            |
| AI 回复中嵌入轻量展示型卡片          | **方案三** | Markdown 存储，无需改后端协议             |
| AI 动态生成复杂表单 / 仪表盘         | **方案二** | 嵌套组件树 + 数据绑定 + 远程 Catalog      |
| 快速新增一种展示型自定义组件         | **方案三** | 一个 plugin 文件，registerPlugin 注册即用 |
| 用户与 AI 生成 UI 交互（填写、点击） | **方案二** | action + dataModel 双向绑定               |

### 混合使用建议

三种方案**不互斥，可以组合使用**：

```
聊天页（方案一为基础）
    │
    ├─ text part → XMarkdown 渲染 Markdown
    │       └─ Markdown 中自定义代码块 → 方案三（MD 插件）处理
    │
    ├─ candidate-grid part → CandidateGrid 组件（方案一 handler）
    ├─ campaign-created part → CampaignCreatedCard（方案一 handler）
    │
    └─ 未来需要复杂 AI 生成 UI → 接入方案二（A2UI），作为独立 part 类型渲染
```

---

## 后端支持的数据输出类型

### 方案一：SSE 事件类型

前端 `SSEContentItemSchema`（Zod）定义的合法事件，**新增类型需前后端同时改造**：

| 事件类型 | 数据结构 | 前端处理 |
| --- | --- | --- |
| `message` | `{ type, content: string }` | 累积到 text part |
| `tool_start` | `{ type, node: string, content?: string }` | 新增 tool-node part（loading 态） |
| `tool_end` | `{ type, node: string, content?: string }` | 更新 tool-node part（loaded 态） |
| `candidate_matched` | `{ type, data: { candidate: {...} } }` | 追加到 candidate-grid part |
| `campaign_created` | `{ type, data: { campaign_id, campaign_title } }` | 新增 campaign-created part |
| `simulation_campaign_started` | `{ type, data: { candidate: SSECandidate } }` | 新增 simulated-campaign part |
| `simulation_sales_message` | `{ type, data: { candidate, step_number, outreach, timestamp } }` | 追加 sales 消息到 conversation |
| `simulation_client_message` | `{ type, data: { candidate, step_number, outreach, reply_content } }` | 追加 client 回复 |
| `simulation_result_success` | `{ type, data: { candidate, status, outreach? } }` | 标记对话成功，添加草稿消息 |

**SSE 传输格式示例：**

```
data: {"type":"message","content":"# 标题\n\n"}
data: {"type":"tool_start","node":"search","content":"搜索候选人"}
data: {"type":"candidate_matched","data":{"candidate":{"id":"xxx","lead":{...}}}}
```

---

### 方案二：A2UI 命令协议

后端需实现 A2UI 命令序列生成器，**前端通过 `commands` prop 传入**：

| 命令类型 | 数据结构 | 说明 |
| --- | --- | --- |
| `createSurface` | `{ surfaceId, catalogId }` | 初始化渲染容器，异步加载 Catalog |
| `updateComponents` | `{ surfaceId, components: BaseComponent_v0_9[] }` | 增量更新组件树（可多次调用） |
| `updateDataModel` | `{ surfaceId, path: string, value: any }` | 路径写入数据模型 |
| `deleteSurface` | `{ surfaceId }` | 销毁渲染容器，清空状态 |

**组件数据绑定支持：**

```typescript
// 字面值（静态）
{ id: 'title', component: 'Text', text: 'Hello' }

// 数据绑定（动态，从 dataModel 读取）
{ id: 'name', component: 'Text', text: { path: '/user/name' } }

// 含 action（用户交互写回 dataModel）
{
  id: 'btn', component: 'Button', label: '提交',
  action: { event: { name: 'submit', context: { val: { path: '/form/val' } } } }
}
```

---

### 方案三：Markdown 代码块格式

后端**仅需在 message content 的 Markdown 文本中嵌入代码块**，无需其他协议改造：

| 代码块类型 | 数据格式 | 说明 |
| --- | --- | --- |
| 对象型（单卡片） | ` ```customCard\ndata:{...JSON...}\n``` ` | `data:` 后接 JSON 对象 |
| 数组型（列表） | ` ```customForm\ndata:[...JSON...]\n``` ` | `data:` 后接 JSON 数组 |
| 自定义扩展 | ` ```<pluginName>\ndata:<valid JSON>\n``` ` | 插件名 = 代码块语言名，前端注册即可 |

**SSE 流式传输示例（逐块推送）：**

````
data: {"type":"message","content":"以下是查询结果：\n\n"}
data: {"type":"message","content":"```customCard\n"}
data: {"type":"message","content":"data:{\"title\":\"结果\","}
data: {"type":"message","content":"\"description\":\"查询成功\"}\n"}
data: {"type":"message","content":"```\n"}
````

> **流式处理：** 代码块传输期间 JSON 不完整，`parseStandardPluginData` 返回 `null`，插件自动渲染 Skeleton；代码块完整后切换为真实 UI，**无需后端任何特殊处理**。

---

### 各方案后端改造成本对比

| 方案 | 后端改造内容 | 前端改造内容 | 前后端协议耦合度 |
| --- | --- | --- | :-: |
| 方案一：SSE 聊天流 | 新增 event type 字段和数据结构 | 新增 MessagePart 类型 + handler 函数 | 🔴 高（类型枚举硬编码） |
| 方案二：A2UI 协议 | 实现 A2UI 命令生成器（createSurface / updateComponents 等） | 组件注册到 Box.components | 🟡 中（命令协议约定） |
| 方案三：MD 插件系统 | 在 `message` 事件的 content 中输出 Markdown 代码块 | `registerPlugin(plugin)` 一行注册 | 🟢 低（仅约定 `data:JSON` 格式） |
