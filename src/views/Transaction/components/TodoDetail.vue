<template>
  <div class="TodoDetail-container">
    <van-nav-bar left-arrow @click-left="onClickLeft" fixed>
      <template #title>详情</template>
    </van-nav-bar>
    <div class="my-detail-cont">
      <div class="my-cont-base">
        <van-row
          v-for="(baseItem, baseIndex) in baseList"
          :key="baseIndex"
          align="center"
        >
          <van-col span="8" class="my-item-title van-ellipsis">{{
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
            <van-col span="8" class="my-item-title">{{
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
        <van-button type="success" size="small">发送</van-button>
        <van-button type="danger" size="small">回退</van-button>
        <van-button type="primary" size="small">转发</van-button>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { $toast } from '@/utils';
import { xhrGetTodoDetail } from '@/api';

export default defineComponent({
  name: 'TodoDetail',
  setup(props: any, { emit }) {
    const onClickLeft = () => {
      $toast('返回');
      emit('toggleDetail', false);
    };
    const baseList = ref([
      {
        title: '表单编号',
        key: 'code1',
        value: ''
      },
      {
        title: '常维项目',
        key: 'code2'
      },
      {
        title: '项目名称',
        key: 'code3'
      },
      {
        title: '承包商',
        key: 'code4'
      },
      {
        title: '检修属性',
        key: 'code5'
      },
      {
        title: '专业',
        key: 'code6'
      },
      {
        title: '施工管理部门',
        key: 'code7'
      },
      {
        title: '合同开工日期',
        key: 'code8'
      },
      {
        title: '合同竣工日期',
        key: 'code9'
      },
      {
        title: '自检质量等级',
        key: 'code10'
      }
    ]);
    const attachList = ref([] as any);
    const historyList = ref([] as any[]);
    onMounted(() => {
      xhrGetTodoDetail({}).then(res => {
        if (res.code > 0) {
          // 基础信息
          const mockBaseObj: any = {
            code1: 'WGYS-001',
            code2: '常维项目阶段性验收'
          };
          baseList.value.forEach(d => {
            d.value = mockBaseObj[d.key] || '';
          });
          //--------
          // 附件
          attachList.value = [
            {
              fileName: '启动命令.txt',
              status: '安全'
            }
          ];
          // 审批历史
          historyList.value = [
            {
              stepTitle: '档案部门验收',
              operator: '王晓丽',
              operateDate: '2021-08-19',
              result: '同意'
            },
            {
              stepTitle: '运行部门验收',
              operator: '刘小天',
              operateDate: '2021-08-18',
              result: '同意'
            },
            {
              stepTitle: '运行部门验收',
              operator: '刘小天',
              operateDate: '2021-08-18',
              result: '同意'
            },
            {
              stepTitle: '运行部门验收',
              operator: '刘小天',
              operateDate: '2021-08-18',
              result: '同意'
            },
            {
              stepTitle: '运行部门验收',
              operator: '刘小天',
              operateDate: '2021-08-18',
              result: '同意'
            },
            {
              stepTitle: '运行部门验收',
              operator: '刘小天',
              operateDate: '2021-08-18',
              result: '同意'
            }
          ];
        }
      });
    });
    const activeNames = ref(['1', '2']);
    return {
      baseList,
      attachList,
      historyList,
      onClickLeft,
      activeNames
    };
  }
});
</script>

<style scoped lang="scss">
.TodoDetail-container {
  height: 100%;
  padding-top: var(--van-nav-bar-height);
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

.my-attach-filename,
.my-item-title {
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
