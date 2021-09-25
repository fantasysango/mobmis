<template>
  <div class="Transaction-container">
    <van-nav-bar class="TheHeader-container" :fixed="true" :placeholder="true">
      <template #title>待办列表</template>
    </van-nav-bar>
    <TodoTab @enterDetail="enterDetail" />
    <van-popup
      v-model:show="modalVisible"
      position="right"
      :safe-area-inset-bottom="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <TodoDetail :data="editingData" :visible="modalVisible" @close="toggleDetail(false)" />
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
    const editingData = ref<any>(null);
    const toggleDetail = (v = !modalVisible.value) => {
      modalVisible.value = v;
    };
    const enterDetail = item => {
      editingData.value = item;
      toggleDetail(true);
    };
    return {
      activeTab,
      modalVisible,
      editingData,
      toggleDetail,
      enterDetail
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
}
</style>
