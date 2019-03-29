<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 表格主体 -->
      <el-table :data="list">
        <el-table-column
          v-for="(column, index) in columnOption"
          :key="index"
          :label="column.label"
          :prop="column.prop"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import bem from './mixins/bem';

export default {
  name: 'Eltable',

  mixins: [bem],

  props: {
    data: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },

    option: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      list: [],
      tableOption: {}
    };
  },

  computed: {
    columnOption() {
      return this.tableOption.column || [];
    }
  },

  watch: {
    data() {
      this.dataInit();
    },

    columnOption() {
      this.columnInit();
    },

    option: {
      handler() {
        this.init();
      },
      deep: true
    }
  },

  created() {
    this.init();
    // 初始化数据
    this.dataInit();
  },

  methods: {
    init() {
      this.tableOption = this.option;
    },

    dataInit() {
      this.list = [...this.data];
    },

    columnInit() {
      console.log('column init');
    }
  }
};
</script>
