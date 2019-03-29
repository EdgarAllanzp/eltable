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
// import Doc from './doc';

export default {
  components: {
    // Doc,
    Eltable
  },

  data() {
    return {
      option: {
        column: [
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '年龄',
            prop: 'age'
          }
        ]
      },
      data: [
        {
          name: '2333',
          age: 23
        }
      ]
    };
  }
};
</script>
