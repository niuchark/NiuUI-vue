<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="n-message"
      v-show="visible"
      role="alert"
      :class="{ [`n-message--${type}`]: type, 'is-close': showClose }"
      ref="messageRef"
      :style="offsetStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="n-message__content">
        <slot>
          <!-- 因为message可能不存在所以要加一个判断 -->
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="n-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import type { MessageProps } from './types.d'
import { ref, onMounted, defineProps, withDefaults, computed } from 'vue'
import RenderVnode from '../Common/RenderVnode'
import { getLastBottomOffset } from './method'
import Icon from '../Icon/Icon.vue'
import useEventListener from '../../hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up' // 默认向上渐隐消失
})

// 拿到消息组件实例
const messageRef = ref<HTMLDivElement | null>(null)
// 开始计算偏移高度
// 当前div的高度
const height = ref(0)
// 上一个消息卡片的bottomOffset
const lastBottomOffset = computed(() => getLastBottomOffset(props.id))
// 当前消息卡片的topOffset
const topOffset = computed(() => props.offset + lastBottomOffset.value)
// 计算当前消息卡片的bottomOffset
const bottomOffset = computed(() => topOffset.value + height.value)
// 当前消息卡片距离顶部的偏移量，即topOffset，转化成样式对象
const offsetStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

// 控制消息组件的显示与隐藏
const visible = ref(false)
let timer: any
function startTimer() {
  // 如果duration为0则不自动关闭
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

// Esc键按下时关闭消息组件
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

// 动画开始和结束时的钩子函数
function destroyComponent() {
  props.onDestory()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  bottomOffset,
  visible
})
</script>
<style></style>
