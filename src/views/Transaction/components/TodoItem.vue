<template>
  <div class="TodoItem-container">
    <van-row align="center">
      <van-col span="20"
        ><h3 class="ut-text-overflow">{{ item.workFlowName }}</h3></van-col
      >
      <van-col span="4" style="text-align: right">
        <van-button round plain size="small">发送</van-button>
      </van-col>
    </van-row>
    <p class="my-desc">{{ item.sendUser }}</p>
    <van-row>
      <van-col span="8">单据名称</van-col>
      <van-col>{{ item.formLable }}</van-col>
    </van-row>
    <van-row>
      <van-col span="8">当前节点</van-col>
      <van-col>{{ item.nowActivity }}</van-col>
    </van-row>
    <van-row>
      <van-col span="8">发送时间</van-col>
      <van-col>{{ formatDate(item.sendDateTime) }}</van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
// import { ITodoItem } from '@/types';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formatDate = (v: number) => dayjs(v).format('YYYY-MM-DD HH:mm:ss');
    return {
      formatDate
    };
  }
});
</script>

<style scoped lang="scss">
.TodoItem-container {
  padding: 10px 15px;
  border-bottom: solid 1px var(--van-gray-3);
  .my-title {
  }
  .my-desc {
    font-size: $fsSmall;
    color: var(--van-gray-7);
  }
}
</style>
