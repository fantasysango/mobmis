<template>
  <div class="Transaction-container">
    <TheHeader />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import TheHeader from './components/TheHeader.vue'

export default defineComponent({
  name: 'Transaction',
  components: {
    TheHeader,
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0);
    return { count };
  }
});
</script>

<style scoped lang="scss">

</style>
