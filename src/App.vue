<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Icon from './components/Icon/Icon.vue'
import Item from './components/Collapse/CollapseItem.vue'
import { createMessage } from './components/Message/method'
import type { ButtonInstance } from './components/Button/types'

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['a'])

onMounted(() => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({
    message: 'hello world again',
    duration: 0,
    type: 'success',
    showClose: true
  })
  createMessage({
    message: 'hello world three',
    duration: 0,
    type: 'danger',
    showClose: true
  })
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>Niu</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br /><br />
    <Collapse v-model="openedValue">
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div>this is content aaaa</div>
      </Item>
      <Item name="b" title="Title B">
        <div>this is bbbbb test</div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </Item>
    </Collapse>
    <span class="testStyle">当前打开的折叠项：{{ openedValue }}</span>
  </main>
  <a href="#">超链接</a>
  <Icon icon="user-secret" size="5x" type="primary"></Icon>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.testStyle {
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
