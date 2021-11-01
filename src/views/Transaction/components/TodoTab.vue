<template>
  <div class="TodoTab-container">
    <div class="my-search">
      <div class="my-search-wrap">
        <van-cell
          title="开始日期"
          is-link
          :value="formatDate(dateRange[0])"
          title-class="ut-noflex"
          center
          @click="doPickDate(0)"
        />
        <van-cell
          title="结束日期"
          is-link
          :value="formatDate(dateRange[1])"
          title-class="ut-noflex"
          center
          @click="doPickDate(1)"
        />
        <!-- <van-cell title="项目名称">
          <van-field v-model="searchText" clearable />
        </van-cell> -->
        <van-field v-model="searchText" label="项目名称" clearable>
          <template #button>
            <van-button
              class="my-btn-search"
              size="small"
              type="primary"
              round
              @click="fetchData()"
              >查 询</van-button
            >
          </template>
        </van-field>
      </div>
      <div class="my-search-repl"></div>
    </div>
    <div class="my-items" @click="handleClick">
      <TodoItem
        v-for="(item, index) in items"
        :item="item"
        :data-index="index"
        :key="item.id"
      />
    </div>
    <van-popup
      v-model:show="pickerVisible"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :visible="pickerVisible"
        @confirm="onPickerConfirm"
        @cancel="pickerVisible = false"
      />
    </van-popup>
    <van-popup
      v-model:show="modalVisible"
      position="right"
      :safe-area-inset-bottom="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <TodoDetail
        :data="editingData"
        :visible="modalVisible"
        @close="closeDetail"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { $toast, closest } from '@/utils';
import { ITodoItem } from '@/types';
import { xhrGetTodoList } from '@/api';
import TodoItem from './TodoItem.vue';
import TodoDetail from './TodoDetail.vue';
import dayjs from 'dayjs';
import store from '@/store';

export default defineComponent({
  name: 'TodoTab',
  components: {
    TodoItem,
    TodoDetail
  },
  setup(props, { emit }) {
    const [minDate, maxDate] = [dayjs('2010-01-01').toDate(), new Date()];
    const currentDate = ref<Date | null>(null);
    const dateRange = ref<Date[]>([
      dayjs(maxDate).subtract(7, 'day').toDate(),
      maxDate
    ]);
    const searchText = ref('');
    const formatDate = (v: Date) => dayjs(v).format('YYYY-MM-DD');

    const pickerVisible = ref(false);
    const items = ref([] as ITodoItem[]);
    const setLoading = v => store.commit('setLoading', v);
    const fetchData = () => {
      setLoading(true);
      console.log('-- xhrGetTodoList');
      const [start, end] = dateRange.value;
      xhrGetTodoList({
        empCode: 10101887,
        pageIndex: 1,
        pageSize: 1000,
        start: formatDate(start),
        end: formatDate(end),
        searchText: searchText.value
      })
        .then(res => {
          if (res.flag) {
            items.value = (res.data.listData || []) as ITodoItem[];
          }
        })
        .finally(() => setLoading(false));
    };
    // 详情弹出层显隐逻辑
    const modalVisible = ref(false);
    const editingData = ref<any>(null);
    const closeDetail = (reresh = false) => {
      modalVisible.value = false;
      if (reresh) fetchData();
    };
    const enterDetail = item => {
      editingData.value = item;
      modalVisible.value = true;
    };

    const handleClick = (e: any) => {
      const el: any = closest(e.target, '[data-index]');
      if (el) {
        const index = el.dataset.index;
        const item = items.value[index];
        enterDetail(item);
      }
    };
    let activeIdx = 0;
    const onPickerConfirm = (v: Date) => {
      dateRange.value[activeIdx] = v;
      pickerVisible.value = false;
      fetchData();
    };
    const doPickDate = (idx: number) => {
      activeIdx = idx;
      currentDate.value = dateRange.value[idx];
      pickerVisible.value = true;
    };

    onMounted(() => {
      fetchData();
    });
    return {
      editingData,
      currentDate,
      pickerVisible,
      dateRange,
      searchText,
      items,
      minDate,
      maxDate,
      modalVisible,
      closeDetail,
      formatDate,
      handleClick,
      onPickerConfirm,
      doPickDate,
      fetchData
    };
  }
});
</script>

<style scoped lang="scss">
.my-search {
  ::v-deep .van-cell__right-icon {
    display: flex;
    align-items: center;
  }
}

.my-search-wrap {
  position: fixed;
  border-bottom: solid 1px var(--van-gray-3);
}

.my-search-wrap,
.my-search-repl {
  width: 100%;
  height: calc(
    (var(--van-cell-vertical-padding) * 2 + var(--van-cell-line-height)) * 3
  );
  background: #fff;
  z-index: 9;
}
.my-btn-search {
  margin: -0.3rem 0;
  position: relative;
  top: -0.1rem;
}
</style>
