export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  nativeType?: NativeType
  autofocus?: boolean
  icon?: string
  loading?: boolean
}

// 描述一下页面中拿到的button组件实例的类型，该类型中有一个ref属性，该属性是组件内部暴露出去的html原生button类型
export interface ButtonInstance {
  ref: HTMLButtonElement
}
