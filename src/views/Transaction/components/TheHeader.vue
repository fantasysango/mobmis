<template>
  <div class="TheHeader-container">
    <van-nav-bar
      left-arrow 
      @click-left="onClickLeft">
      <template #title>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const { ctx } = getCurrentInstance()
    const onClickLeft = () => ctx.$toast('返回');
    const count = ref(0);
    return {
      count,
      onClickLeft
    };
  }
});
</script>

<style scoped lang="scss">

</style>
