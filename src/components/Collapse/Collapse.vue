<template>
  <div class="n-collapse">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'NCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)

// 监听modelValue的变化，更新activeNames （比如app.vue设置2s后modelvalue改变，但是子组件这里已经赋值结束了。所以要侦听变化重新赋值）
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
// 如果是手风琴模式，activeNames只能有一个值
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}

// 暴露修改activeNames的函数给其他组件使用
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
