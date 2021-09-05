<template>
  <div class="TodoDetail-container">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
      :placeholder="true"
    >
      <template #title>详情</template>
    </van-nav-bar>
    <div class="my-detail-cont">
      <div class="my-cont-base">
        <van-row
          class="my-base-row"
          v-for="(baseItem, baseIndex) in baseList"
          :key="baseIndex"
          align="center"
        >
          <van-col span="8" class="my-base-item">{{
            baseItem.title
          }}</van-col>
          <van-col span="16" class="my-item-cont">{{ baseItem.value }}</van-col>
        </van-row>
      </div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="附件" name="1">
          <van-row
            v-for="(attachItem, attchIndex) in attachList"
            :key="attchIndex"
            class="my-attach-item"
            align="center"
          >
            <van-col class="my-attch-iconwrap">
              <van-icon name="description" color="#1989fa" />
            </van-col>
            <van-col>
              <p class="my-attach-filename">{{ attachItem.fileName }}</p>
              <p class="my-attach-status">{{ attachItem.status }}</p>
            </van-col>
          </van-row>
        </van-collapse-item>
        <van-collapse-item title="审批历史" name="2">
          <van-row
            v-for="(historyItem, historyIndex) in historyList"
            :key="historyIndex"
          >
            <van-col span="8" class="my-base-item">{{
              historyItem.stepTitle
            }}</van-col>
            <van-col span="16" class="my-item-cont">
              <p>{{ historyItem.operator }}</p>
              <p>{{ historyItem.operateDate }}</p>
              <p>{{ historyItem.result }}</p>
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="my-footer">
      <van-row class="my-foot-btngroup" justify="space-between">
        <van-button type="success" size="small" @click="onSend"
          >发送</van-button
        >
        <van-button type="danger" size="small">回退</van-button>
        <van-button type="primary" size="small">转发</van-button>
      </van-row>
    </div>
    <van-popup
      v-model:show="modalVisible"
      position="bottom"
      :style="{ width: '100%', height: '100%' }"
    >
      <TodoDetailValidate @toggleModal="toggleModal" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { $toast } from '@/utils';
import { xhrGetTodoDetail } from '@/api';
import TodoDetailValidate from './TodoDetailValidate.vue';
import { ITodoItem } from '@/types';
import { TODO_DETAIL_COLUMNS } from '@/constants';

export default defineComponent({
  name: 'TodoDetail',
  components: {
    TodoDetailValidate
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    test: {
      type: Number,
    }
  },
  setup(props: any, { emit }) {
    const activeNames = ref(['1', '2']);
    const baseList = ref(
      (o =>
        Object.keys(o).map(k => ({
          key: k,
          title: o[k],
          value: ''
        })))(TODO_DETAIL_COLUMNS.formData)
    );
    const attachList = ref([] as any[]);
    const historyList = ref([] as any[]);
    const modalVisible = ref(false);
    const onClickLeft = (e = null) => {
      emit('close');
    };
    const toggleModal = (v = !modalVisible.value) => {
      modalVisible.value = v;
    };
    const onSend = (e = null) => {
      toggleModal(true);
      console.log('发送-----');
    };
    onMounted(() => {
      const { WorkFlowCode } = (props.data || {}) as ITodoItem;
      xhrGetTodoDetail({
        code: WorkFlowCode
      }).then(res => {
        if (res.flag) {
          const { formData, ftpAttachment, suggestions } = res.data;
          // 基础信息
          if (formData)
            baseList.value.forEach(d => {
              d.value = formData[d.key] || '';
            });
          // 附件
          if (ftpAttachment)
            attachList.value = ftpAttachment.map(d => ({
              fileName: d.fileFullName,
              status: '安全',
              url: d.fileAddress
            }));
          // 审批历史
          if (suggestions)
            historyList.value = suggestions.map(d => ({
              stepTitle: '档案部门验收',
              operator: d.uName,
              operateDate: d.suggestionTime,
              result: d.suggestionContent
            }));
        }
      });
    });
    return {
      activeNames,
      baseList,
      attachList,
      historyList,
      modalVisible,
      onClickLeft,
      toggleModal,
      onSend
    };
  }
});
</script>

<style scoped lang="scss">
.TodoDetail-container {
  height: 100%;
  // padding-top: var(--van-nav-bar-height);
  padding-bottom: 56px;
  overflow: auto;
  box-sizing: border-box;
}

.my-cont-base {
  padding: var(--van-collapse-item-content-padding);
  color: var(--van-collapse-item-content-text-color);
  font-size: var(--van-collapse-item-content-font-size);
  line-height: var(--van-collapse-item-content-line-height);
  background-color: var(--van-collapse-item-content-backgr);
}

.my-base-row {
  margin: .5em 0;
}

.my-attach-filename,
.my-base-item {
  color: var(--van-black);
}

.my-attch-iconwrap {
  width: 40px;
  margin-right: 20px;
  font-size: 40px;
}

.my-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: var(--van-white);
}

.my-foot-btngroup {
  padding: var(--van-collapse-item-content-padding);
}

::v-deep .van-collapse-item {
  .van-cell {
    font-weight: bold;
  }
}
</style>
