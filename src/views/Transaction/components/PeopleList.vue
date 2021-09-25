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
          v-for="(item, index) in list"
          clickable
          :key="getId(item)"
          :title="getName(item)"
          @click="toggle(index)"
        >
          <template #right-icon>
            <van-checkbox
              :name="getId(item)"
              :ref="el => (checkboxRefs[index] = el)"
              @click.stop
            />
          </template>
        </van-cell>
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
    const { visible: propVisible } = toRefs(props);
    const checked = ref<string[]>([]);
    const checkboxRefs = ref<any[]>([]);
    const toggle = index => {
      (checkboxRefs.value[index] as any).toggle();
    };
    const onCancel = () => {
      emit('close')
    }
    const onConfirm = () => {
      emit('change', checked.value)
    }
    const init = () => {
      checked.value = [...(props.value as string[])]
    }
    const reset = () => {
      checked.value = []
    }
    watch(propVisible, v => {
      if (v) init();
      else reset();
    });

    return {
      toggle,
      checked,
      checkboxRefs,
      onConfirm,
      onCancel,
      getId: item => item[props.idKey],
      getName: item => item[props.nameKey],
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

</style>
