<template>
  <button
    ref="_ref"
    class="n-button"
    :class="{
      [`n-button--${type}`]: type,
      [`n-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>
import type { ButtonProps } from './type'
import { ref } from 'vue'
defineOptions({
  name: 'NButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

// 如果使用组件的人想拿到组件内部的button实例做一些操作该怎么办呢？
// 暴露组件实例
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>
<style lang="scss" scoped></style>
