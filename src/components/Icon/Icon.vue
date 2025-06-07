<template>
  <!-- 因为设置了禁止透传，所以父组件给Icon组件传递的动画类不能透传到i标签上面；v-bind="$attrs"解决 -->
  <!--  $attrs：除了props传递的属性和emit以外的所有属性，和$props是互补关系 -->
  <i
    class="n-icon"
    :class="{ [`n-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <!-- v-bind="$props"可以将父组件传递给当前组件的所有属性直接绑定到font-awesome-icon上面 -->
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>
<script setup lang="ts">
// import type { IconProps } from './types'
import type { MyFontAwesomeIconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'NIcon',
  inheritAttrs: false // 禁止透传，否则属性会透传到i标签上
})

const props = defineProps<MyFontAwesomeIconProps>()
// 过滤掉自己添加的type和color属性后再添加到原生的icon组件上（因为icon组件本身不支持这些属性）
// 防止父组件更新props后，filteredProps没有更新（因为只在setup时赋值一次），所以要用计算属性包裹
const filteredProps = computed(() => omit(props, ['type', 'color']))
// 为了支持自定义icon颜色（不局限于primary这些），使用计算属性得到color后添加到内联样式style属性上（优先级更高）
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
