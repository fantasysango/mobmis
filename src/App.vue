<template>
  <div v-if="isLoading" class="gb-loading-wrap">
    <van-loading />
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store'

export default defineComponent({
  name: 'App',
  computed: {
    isLoading() {
      return store.state.isLoading
    }
  }
});
</script>