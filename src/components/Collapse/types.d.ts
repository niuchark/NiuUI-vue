import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[] // 给每一项绑定一个值（值为字符串或者数字）
  accordion?: boolean // 是否手风琴模式
}
export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}
export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey')
