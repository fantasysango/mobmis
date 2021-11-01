<template>
  <div class="TodoDetail-container">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft()"
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
          <van-col span="8" class="my-base-item">{{ baseItem.title }}</van-col>
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
            :clickable="true"
            @click="() => onDownload(attachItem.url)"
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
        <van-collapse-item v-if="!isJointlySign" title="会签意见" name="2">
          <van-field
            v-model="suggestionVal"
            rows="3"
            maxlength="300"
            autosize
            type="textarea"
            placeholder="请填写会签意见"
            style="padding: 0"
          />
        </van-collapse-item>
        <van-collapse-item title="审批历史" name="3">
          <van-row
            v-for="(historyItem, historyIndex) in historyList"
            class="my-row-history"
            :key="historyIndex"
          >
            <van-col span="8" class="my-base-item">{{
              historyItem.stepTitle
            }}</van-col>
            <van-col span="16" class="my-item-cont">
              <template v-if="historyItem.details">
                <div v-for="(detailItem, detailIndex) in historyItem.details" :key="detailIndex">
                  <p>{{ detailItem.operator }}</p>
                  <p>{{ detailItem.operateDate }}</p>
                  <p>{{ detailItem.result }}</p>
                </div>
              </template>
              <template v-else>
                <p>{{ historyItem.operator }}</p>
                <p>{{ historyItem.operateDate }}</p>
                <p>{{ historyItem.result }}</p>
              </template>
            </van-col>
          </van-row>
          <van-row class="my-row-opinion">

          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="my-footer">
      <van-row class="my-foot-btngroup" justify="space-between">
        <van-button
          round
          plain
          type="success"
          size="small"
          @click="onSend('send')"
          >发送</van-button
        >
        <van-button
          round
          plain
          type="danger"
          size="small"
          @click="onSend('rollback')"
          >回退</van-button
        >
        <van-button
          round
          plain
          type="primary"
          size="small"
          @click="onSend('transmit')"
          >转发</van-button
        >
      </van-row>
    </div>
    <van-popup
      v-model:show="modalVisible"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <TodoDetailValidate
        :oprType="activeOprType"
        :extraInfo="extraInfo"
        :data="validateInfo"
        :visible="modalVisible"
        @close="onCloseValidate"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, toRefs, defineComponent, onMounted } from 'vue';
import { $toast, $dialog } from '@/utils';
import { xhrGetTodoDetail } from '@/api';
import TodoDetailValidate from './TodoDetailValidate.vue';
import { ITodoItem, TOprType } from '@/types';
import { TODO_DETAIL_COLUMNS } from '@/constants';
import store from '@/store';
import {
  xhrGetValidateInfo,
  xhrGetTransmitValidateInfo,
  xhrGetRollbackValidateInfo
} from '@/api';

export default defineComponent({
  name: 'TodoDetail',
  components: {
    TodoDetailValidate
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props: any, { emit }) {
    const { visible: propVisible } = toRefs(props);
    const baseList = ref(
      (o =>
        Object.keys(o).map(k => ({
          key: k,
          title: o[k],
          value: ''
        })))(TODO_DETAIL_COLUMNS.formData)
    );
    const suggestionVal = ref('');
    const activeNames = ref(['1', '2', '3']);
    const attachList = ref([] as any[]);
    const historyList = ref([] as any[]);
    const modalVisible = ref(false);
    const validateInfo = ref<any>(null);
    const extraInfo = ref<any>(null);
    const activeOprType = ref<TOprType | ''>('');
    let judgementText = '';
    const setLoading = v => store.commit('setLoading', v);
    const onClickLeft = () => {
      emit('close');
    };
    const toggleModal = (v = !modalVisible.value) => {
      modalVisible.value = v;
    };
    const isJointlySign = computed(() => (props.data || {}).isJointlySign || 0)
    const convertData = (oprType, data) => {
      if (oprType !== 'rollback') return data;
      return {
        procSetID: data.procSetID,
        activityID: data.procVerID, // TODO: ?
        activityName: data.preActionName,
        activityDescr: data.preActionDescr,
        nextActCode: '', // TODO: data.nextActCode ?
        isJointlySign: isJointlySign.value,
        hide: false,
        peopleList: data.callbackUserList.map(d => ({
          number: d.employeeNumber,
          name: d.employeeName,
          pinYin: '',
          deptID: d.departmentID,
          deptName: d.departmentName,
          orgID: 0,
          orgName: ''
        }))
      };
    };
    const onSend = async (oprType: TOprType = 'send') => {
      const { workFlowKey, workFlowCode } = (props.data || {}) as ITodoItem;
      let judgmentCondition = 'false';
      if (oprType === 'send' && judgementText) {
        await $dialog
          .confirm({
            message: judgementText
          })
          .then(() => (judgmentCondition = 'true'))
          .catch(() => (judgmentCondition = 'false'));
      }
      const xhrFn = {
        send: xhrGetValidateInfo,
        rollback: xhrGetRollbackValidateInfo,
        transmit: xhrGetTransmitValidateInfo
      }[oprType];
      if (!xhrFn) throw new Error(`oprType值有误！`);
      setLoading(true);
      const params = {
        rtKey: workFlowKey,
        workFlowCode: workFlowCode,
        judgmentCondition: judgmentCondition,
        ...(oprType === 'send' ? { suggestion: suggestionVal.value } : {}),
      };
      console.log('params =====>', params)
      xhrFn(params)
        .then(res => {
          if (res.flag) {
            if (oprType === 'send' && res.msg === 'success') {
              emit('close', true);
              return;
            }
            validateInfo.value = convertData(oprType, (res.data || [])[0]);
            console.log('validateInfo.value', validateInfo.value);
            extraInfo.value = params;
            activeOprType.value = oprType;
            toggleModal(true);
          }
        })
        .finally(() => setLoading(false));
    };
    const onDownload = url => {
      if (!url) return;
      const el = document.createElement('a');
      el.href = url;
      el.target = '_blank';
      el.click();
    };
    const onCloseValidate = (allClose = false) => {
      toggleModal(false);
      if (allClose) emit('close', true);
    };
    const init = () => {
      console.log('===== init =====');
      const { workFlowCode, workFlowKey } = (props.data || {}) as ITodoItem;
      xhrGetTodoDetail({
        workFlowCode,
        workFlowKey
      }).then(res => {
        if (res.flag) {
          const { formData, ftpAttachment, suggestions } = res.data;
          // 基础信息
          if (formData) {
            baseList.value.forEach(d => {
              const v = formData[d.key];
              d.value = v || v === 0 ? v : '';
            });
            judgementText = formData.judgementText;
          }
          // 附件
          if (ftpAttachment)
            attachList.value = ftpAttachment.map(d => ({
              fileName: d.fileFullName,
              status: '安全',
              url: d.fileAddress
            }));
          // 审批历史
          if (suggestions) {
            const tmpFn = d => ({
              operator: d.uName,
              operateDate: d.suggestionTime,
              result: d.suggestionContent
            });
            historyList.value = suggestions.map(d => ({
              stepTitle: d.workNodeName || d.workFlowNode, // '档案部门验收',
              details: d.suggestionsDetails ? d.suggestionsDetails.map(tmpFn) : null,
              ...tmpFn(d),
            }));
          }
        }
      });
    };
    const reset = () => {
      console.log('===== reset =====');
      judgementText = '';
      attachList.value = [];
      historyList.value = [];
      validateInfo.value = null;
    };
    watch(propVisible, v => {
      if (v) init();
      else reset();
    });
    onMounted(() => {
      init();
    });
    return {
      activeOprType,
      activeNames,
      baseList,
      attachList,
      historyList,
      suggestionVal,
      isJointlySign,
      modalVisible,
      validateInfo,
      extraInfo,
      onClickLeft,
      toggleModal,
      onCloseValidate,
      onSend,
      onDownload
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
  margin: 0.5em 0;
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

.my-attach-item {
  &:active {
    background-color: var(--van-cell-active-color);
  }
}

::v-deep .van-collapse-item {
  .van-cell {
    font-weight: bold;
  }
}

.my-row-history {
  margin-top: .5em;
  &:first-child {
    margin-top: 0;
  }
}
</style>
