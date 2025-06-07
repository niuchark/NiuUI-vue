import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode
  duration?: number // 几秒后自动关闭
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  onDestory: () => void // 传入一个销毁组件的函数
  id: string
  zIndex: number
  offset?: number
  transitionName?: string
}

// MessageContext接口定义了消息组件的上下文信息
export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destory: () => void
}

// 这里的withoutDestoryMessageProps是一个类型，它从MessageProps中排除了onDestory、id和zIndex属性
export type withoutDestoryMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>
