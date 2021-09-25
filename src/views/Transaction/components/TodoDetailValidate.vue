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
          <van-col span="16" class="my-col-pad">{{ approverNames }}</van-col>
          <van-col span="8" @click="toggleModal(true)"
            ><b>配置审批对象</b></van-col
          >
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
            style="padding: 0"
          />
        </van-collapse-item>
        <van-collapse-item title="内容合规点" name="2">
          <div
            class="my-question-item"
            v-for="(item, index) in questions"
            :key="index"
          >
            <van-row align="center">
              <van-col span="16" class="my-col-pad">{{ index + 1 }}、{{ item.question }}</van-col>
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
    <van-popup
      v-model:show="modalVisible"
      position="bottom"
      :style="{ width: '100%', height: '100%' }"
    >
      <PeopleList
        :list="peopleList"
        :value="approvers"
        :visible="modalVisible"
        idKey="number"
        @change="handlePeopleChange"
        @close="toggleModal(false)"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, watch, toRefs, defineComponent, onMounted, computed } from 'vue';
import { $toast } from '@/utils';
import PeopleList from './PeopleList.vue';

export default defineComponent({
  name: 'TodoDetailValidate',
  components: {
    PeopleList
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { visible: propVisible } = toRefs(props);
    const activeNames = ref(['1', '2']);
    const approvers = ref<string[]>([]);
    const peopleList = ref<{ name: string; number: number }[]>([]);
    const modalVisible = ref(false);
    const toggleModal = (v = !modalVisible.value) => {
      console.log('toggleModal PeopleList!');
      modalVisible.value = v;
    };
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
    const onCancel = (e = null) => {
      emit('close');
    };
    const onConfirm = (e = null) => {
      onCancel();
    };
    const handlePeopleChange = v => {
      approvers.value = v;
      toggleModal(false);
    };
    const nameMap = computed(() => {
      const map = {};
      peopleList.value.forEach(d => (map[d.number] = d.name));
      return map;
    });
    const approverNames = computed(() =>
      approvers.value.map(d => nameMap.value[d]).join('、')
    );

    const init = () => {
      const data = props.data || {};
      peopleList.value = data.peopleList || [];
    };
    const reset = () => {
      peopleList.value = [];
      approvers.value = [];
      comments.value = '';
    };
    watch(propVisible, v => {
      if (v) init();
      else reset();
    });
    onMounted(() => {
      init();
    });
    return {
      activeNames,
      approvers,
      approverNames,
      comments,
      questions,
      modalVisible,
      peopleList,
      toggleModal,
      onConfirm,
      onCancel,
      handlePeopleChange
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

.my-col-pad {
  padding-right: .5em;
}
</style>
