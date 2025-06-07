import type { MessageContext, withoutDestoryMessageProps } from './types'
import { render, h, shallowReactive } from 'vue'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'
const { nextZIndex } = useZIndex() // 使用自定义的useZIndex钩子函数来获取zIndex

let seed = 1
// 消息组件实例对象数组，记录当前存在的所有实例对象
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: withoutDestoryMessageProps) => {
  // 每个消息实例对象设置一个唯一id标识
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    // 销毁组件
    render(null, container)
  }

  // 手动删除的方法，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    // 找到当前id对应的实例对象
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      // 调用实例对象的vm属性上的exposed暴露出来的visible属性，设置为不可见
      // visible设置为false之后message组件内部的watch监听到了就会调用destroy方法
      instance.vm.exposed!.visible.value = false
    }
  }

  // 包含销毁组件方法的props，用来传递给message组件
  const messageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }

  // 创建一个虚拟vnode并且挂载到dom节点上
  const vnode = h(MessageConstructor, messageProps)
  render(vnode, container)
  // 加!为非空断言操作符，表示一个变量不为空或者null
  document.body.appendChild(container.firstElementChild!)

  // 获取虚拟vnode上面的组件实例
  // 这里的vnode.component是一个ComponentInternalInstance类型的对象
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: messageProps,
    destory: manualDestroy // 将手动删除的方法添加到instance上，再将实例返回，app.vue就可以调用这个方法来手动删除组件
  }
  instances.push(instance)

  return instance // 返回instance实例
}

// 获取最后一个实例的方法
export const getLastInstance = () => {
  return instances[instances.length - 1]
}

// 获取上一个组件的bottomOffset
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  console.log('idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1] // 拿到当前组件的前一项
    return prev.vm.exposed!.bottomOffset.value // 拿到前一项instance的vm属性（该属性记录了组件实例）上的暴露出去的bottomOffset属性
  }
}
