<template>
  <div class="Transaction-container">
    <van-nav-bar class="TheHeader-container" :fixed="true" :placeholder="true">
      <template #title>待办列表</template>
    </van-nav-bar>
    <TodoTab />
    <router-view />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import TodoTab from './components/TodoTab.vue';

export default defineComponent({
  name: 'Transaction',
  components: {
    TodoTab,
  },
  setup() {
    const activeTab = ref(0);
    return {
      activeTab,
    };
  }
});
</script>

<style scoped lang="scss">
.Transaction-container {
  // padding-top: var(--van-nav-bar-height);
  ::v-deep .van-nav-bar--fixed {
    position: fixed;
  }
  ::v-deep .van-button--round {
    min-width: 6em;
  }
  ::v-deep input,
  ::v-deep textarea {
    font-weight: normal;
  }
}
</style>
