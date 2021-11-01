<template>
  <div class="TodoDetailValidate-container">
    <van-nav-bar class="my-header" fixed>
      <template #title>
        <div class="my-btngroup">
          <van-button round plain size="small" @click="onCancel()">取消</van-button>
          <van-button round plain type="primary" size="small" @click="onConfirm()"
            >确定</van-button
          >
        </div>
      </template>
    </van-nav-bar>
    <div class="my-detail-cont">
      <div v-if="Object.keys(nameMap).length" class="my-cont-base">
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
            v-model="suggestion"
            rows="3"
            maxlength="300"
            autosize
            type="textarea"
            placeholder="请填写审批意见"
            style="padding: 0"
          />
        </van-collapse-item>
        <van-collapse-item v-if="questions.length" title="内容合规点" name="2">
          <div
            class="my-question-item"
            v-for="(item, index) in questions"
            :key="item.id"
          >
            <van-row align="center">
              <van-col span="16" class="my-col-pad"
                >{{ index + 1 }}、{{ item.question }}</van-col
              >
              <van-col span="8">
                <van-radio-group v-model="item.answer" direction="horizontal">
                  <van-radio :name="1">是</van-radio>
                  <van-radio :name="0">否</van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
            <van-field
              v-if="!item.answer"
              v-model="item.note"
              rows="1"
              maxlength="100"
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
        :extraList="peopleExtraList"
        :value="approvers"
        :visible="modalVisible"
        :multi="isMultiPeople"
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
import store from '@/store';
import PeopleList from './PeopleList.vue';
import {
  xhrSendValidateInfo,
  xhrSendTransmitValidateInfo,
  xhrSendRollbacktValidateInfo
} from '@/api';

export default defineComponent({
  name: 'TodoDetailValidate',
  components: {
    PeopleList
  },
  props: {
    oprType: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: null
    },
    extraInfo: {
      type: Object,
      required: true
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
    const peopleExtraList = ref<{ name: string; number: number }[]>([]);
    const isMultiPeople = ref<boolean>(false);
    const modalVisible = ref(false);
    const toggleModal = (v = !modalVisible.value) => {
      console.log('toggleModal PeopleList!');
      modalVisible.value = v;
    };
    const suggestion = ref('');
    const questions = ref<
      {
        id: number;
        question: string; // 选否时的意见
        answer: 0 | 1;
        note: string;
      }[]
    >([]);
    const convertToMap = (arr, idKey = 'number', valueKey = 'name') => {
      const map = {};
      arr.forEach(d => {
        map[d[idKey]] = d[valueKey];
      });
      return map;
    };
    const nameMap = computed(() =>
      convertToMap([...peopleList.value, ...peopleExtraList.value])
    );
    const approverNames = computed(() =>
      approvers.value.map(d => nameMap.value[d]).join('、')
    );

    const setLoading = v => store.commit('setLoading', v);
    const onCancel = () => {
      emit('close');
    };
    const onConfirm = () => {
      if (!props.data) return $toast('初始数据有误！');
      // 审批对象备选列表不为空 但 未选择审批人
      if (Object.keys(nameMap.value).length && !approvers.value.length)
        return $toast('请选择审批对象！');
      if (!suggestion.value) return $toast('请输入审批意见！');
      const xhrFn = {
        send: xhrSendValidateInfo,
        transmit: xhrSendTransmitValidateInfo,
        rollback: xhrSendRollbacktValidateInfo
      }[props.oprType];
      if (!xhrFn) throw new Error(`oprType值有误！`);
      setLoading(true);
      const { rtKey, workFlowCode, judgmentCondition } = props.extraInfo;
      const { activityID, activityName, activityDescr, hide, nextActCode } =
        props.data;
      const params = {
        rtKey,
        workFlowCode,
        judgmentCondition,
        suggestion: suggestion.value,
        nextActivityList: [
          {
            actID: activityID,
            actName: activityName,
            actDescr: activityDescr,
            hide
          }
        ],
        activityCandidateList: [
          {
            activityID,
            activityName,
            activityCode: nextActCode,
            peopleList: approvers.value
            // stationList: [],
            // departmentList: []
          }
        ],
        internalControlList: questions.value.map(d => ({
          cR_ID: d.id,
          cR_CK_ID: +d.answer,
          cR_Opinion: +d.answer ? '' : d.note
        }))
      };
      console.log('发送参数 -----', params);
      xhrFn(params)
        .then(res => {
          if (res.flag) {
            $toast(res.msg);
            emit('close', true);
          }
        })
        .finally(() => setLoading(false));
    };
    const handlePeopleChange = v => {
      approvers.value = v;
      toggleModal(false);
    };
    const init = () => {
      const data = props.data || {};
      isMultiPeople.value = data.isJointlySign || false;
      peopleList.value = data.peopleList || [];
      const tmpMap = convertToMap(peopleList.value);
      peopleExtraList.value = (data.peoplePermissionList || []).filter(
        d => tmpMap[d.number] === undefined
      );
      questions.value = (data.internalControlList || []).map(d => ({
        id: d.cR_ID,
        question: d.cR_CM_NAME,
        answer: 1,
        note: ''
      }));
    };
    const reset = () => {
      peopleList.value = [];
      peopleExtraList.value = [];
      approvers.value = [];
      questions.value = [];
      suggestion.value = '';
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
      nameMap,
      suggestion,
      questions,
      modalVisible,
      peopleList,
      peopleExtraList,
      isMultiPeople,
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
  padding-right: 0.5em;
}

.my-question-item {
  padding-bottom: 1em;
}
</style>
