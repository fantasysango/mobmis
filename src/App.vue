<template>
  <Transaction />
  <img alt="Vue logo" src="./common/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@components/HelloWorld.vue';
import Transaction from '@/views/Transaction/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Transaction,
  }
});
</script>
