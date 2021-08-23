<template>
  <div class="TodoDetailValidate-container">
    <van-nav-bar class="my-header" fixed>
      <template #title>
        <div class="my-btngroup">
          <van-button size="small" @click="onCancel">取消</van-button>
          <van-button type="primary" size="small" @click="onConfirm"
            >确定</van-button
          >
        </div>
      </template>
    </van-nav-bar>
    <div class="my-detail-cont">
      <div class="my-cont-base">
        <van-row align="center">
          <van-col span="16">{{ approvers.join('、') }}</van-col>
          <van-col span="8">设置审批对象</van-col>
        </van-row>
      </div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="审批意见" name="1">
          <van-field
            v-model="comments"
            rows="3"
            autosize
            type="textarea"
            placeholder="请填写审批意见"
            style="padding: 0;"
          />
        </van-collapse-item>
        <van-collapse-item title="内容合规点" name="2">
          <div
            class="my-question-item"
            v-for="(item, index) in questions"
            :key="index"
          >
            <van-row align="center">
              <van-col span="16">{{index + 1}}、{{ item.question }}</van-col>
              <van-col span="8">
                <van-radio-group v-model="item.answer" direction="horizontal">
                  <van-radio :name="1">是</van-radio>
                  <van-radio :name="0">否</van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
            <van-field
              v-model="item.note"
              rows="1"
              autosize
              label="备注："
              type="textarea"
              placeholder="请输入"
            />
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { $toast } from '@/utils';
import { xhrGetTodoDetail } from '@/api';

export default defineComponent({
  name: 'TodoDetailValidate',
  setup(props: any, { emit }) {
    const activeNames = ref(['1', '2']);
    const approvers = ref(['张三', '李四']);
    const comments = ref('');
    const questions = ref([
      {
        question: '内容合规点1',
        answer: 1,
        note: ''
      },
      {
        question: '内容合规点2内容合规点2内容合规点2内容合规点2内容合规点2',
        answer: 0,
        note: ''
      }
    ]);
    const doClose = () => emit('toggleModal', false);
    const onConfirm = (e = null) => {
      doClose();
    };
    const onCancel = (e = null) => {
      doClose();
    };
    onMounted(() => {
      // 
    });
    return {
      activeNames,
      approvers,
      comments,
      questions,
      onConfirm,
      onCancel
    };
  }
});
</script>

<style scoped lang="scss">
.TodoDetailValidate-container {
  height: 100%;
  padding-top: var(--van-nav-bar-height);
  padding-bottom: 56px;
  overflow: auto;
  box-sizing: border-box;
}

.my-header {
  ::v-deep .van-nav-bar__title {
    width: 100%;
    max-width: 100%;
    padding: 0 var(--van-cell-horizontal-padding);
  }
}

.my-btngroup {
  display: flex;
  justify-content: space-between;
}

.my-cont-base {
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}

.my-item-title {
  color: var(--van-black);
}
</style>
