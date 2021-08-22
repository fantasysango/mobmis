<template>
  <div class="TodoTab-container">
    <div class="my-items-wrap" @click="handleClick">
      <TodoItem
        v-for="(item, index) in items"
        :item="item"
        :data-index="index"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { $toast, closest } from '@/utils';
import { ITodoItem } from '@/types';
import { xhrGetTodoList } from '@/api';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoTab',
  components: {
    TodoItem
  },
  setup(props, { emit }) {
    const items = ref([] as ITodoItem[]);
    const fetchData = () => {
      xhrGetTodoList({}).then(res => {
        if (res.code > 0) {
          items.value = res.data.list || [];
        }
      });
    };
    const handleClick = (e: any) => {
      const el: any = closest(e.target, '[data-index]');
      if (el) {
        const index = el.dataset.index;
        const item = items.value[index];
        $toast(item.name);
        emit('toggleDetail', true);
      }
    };
    onMounted(() => {
      fetchData();
    });
    return {
      items,
      handleClick
    };
  }
});
</script>

<style scoped lang="scss">
</style>
