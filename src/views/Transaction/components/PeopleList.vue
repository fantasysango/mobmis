<template>
  <div class="PeopleList-container">
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
    <van-checkbox-group v-model="checked">
      <van-cell-group>
        <van-cell
          v-for="item in list"
          clickable
          :key="getId(item)"
          :title="getName(item)"
          @click="toggle(item)"
        >
          <template #right-icon>
            <van-checkbox
              :name="getId(item)"
              :ref="el => setRef(el, item)"
              @click.stop
            />
          </template>
        </van-cell>
        <template v-if="extraList.length">
          <p v-if="!moreStatus" class="my-split">
            <a @click="moreStatus = !moreStatus">查看更多</a>
          </p>
          <template v-else>
            <van-cell
              v-for="item in extraList"
              clickable
              :key="getId(item)"
              :title="getName(item)"
              @click="toggle(item)"
            >
              <template #right-icon>
                <van-checkbox
                  :name="getId(item)"
                  :ref="el => setRef(el, item)"
                  @click.stop
                />
              </template>
            </van-cell>
          </template>
        </template>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, watch } from 'vue';

export default {
  props: {
    value: {
      type: Array,
      default: () => ([] as string[])
    },
    list: {
      type: Array,
      default: () => ([] as any[])
    },
    extraList: {
      type: Array,
      default: () => ([] as any[])
    },
    visible: {
      type: Boolean,
      default: false
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    idKey: {
      type: String,
      default: 'id'
    }
  },
  setup(props, { emit }) {
    const moreStatus = ref(false)
    const { visible: propVisible } = toRefs(props);
    const checked = ref<string[]>([]);
    const checkboxRefs = ref<any>({});
    const toggle = item => {
      const id = item[props.idKey];
      (checkboxRefs.value[id] as any).toggle();
    };
    const onCancel = () => {
      emit('close')
    }
    const onConfirm = () => {
      emit('change', checked.value)
    }
    const init = () => {
      checked.value = [...(props.value as string[])]
      moreStatus.value = !props.list.length || props.extraList.some((d: any) => checked.value.includes(d[props.idKey]))
    }
    const reset = () => {
      checked.value = []
      checkboxRefs.value = {}
      moreStatus.value = false
    }
    watch(propVisible, v => {
      if (v) init();
      else reset();
    });

    return {
      toggle,
      checked,
      checkboxRefs,
      moreStatus,
      onConfirm,
      onCancel,
      getId: item => item[props.idKey],
      getName: item => item[props.nameKey],
      setRef: (el, item) => (checkboxRefs.value[item[props.idKey]] = el),
    };
  }
};
</script>

<style scoped lang="scss">
.PeopleList-container {
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

.my-split {
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  line-height: var(--van-cell-line-height);
  text-align: center;
  a {
    color: var(--van-button-primary-background-color);
  }
}

</style>
