<template>
  <div class="Transaction-container">
    <van-nav-bar class="TheHeader-container" :fixed="true">
      <template #title>待办列表</template>
    </van-nav-bar>
    <TodoTab @toggleDetail="toggleDetail" />
    <van-popup
      v-model:show="modalVisible"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <TodoDetail @toggleDetail="toggleDetail" />
    </van-popup>
    <router-view />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import TodoTab from './components/TodoTab.vue';
import TodoDetail from './components/TodoDetail.vue';

export default defineComponent({
  name: 'Transaction',
  components: {
    TodoTab,
    TodoDetail
  },
  setup() {
    const activeTab = ref(0);
    const modalVisible = ref(false);
    const toggleDetail = (v = !modalVisible.value) => {
      modalVisible.value = v;
    };
    return { activeTab, modalVisible, toggleDetail };
  }
});
</script>

<style scoped lang="scss">
.Transaction-container {
  padding-top: var(--van-nav-bar-height);
  ::v-deep .van-nav-bar--fixed {
    position: fixed;
  }
}
</style>
