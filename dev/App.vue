<template>
  <div class="app-container">
    <!-- <doc /> -->
    <eltable
      :data="data"
      :option="option"
    />
  </div>
</template>

<script>
import Eltable from '../src/index';
import { option, data } from './mock';
// import Doc from './doc';

export default {
  components: {
    // Doc,
    Eltable
  },

  data() {
    return {
      option,
      data
    };
  }
};
</script>
