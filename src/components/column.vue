<template>
  <el-table-column
    :label="columnOption.label"
    :prop="columnOption.prop"
    :width="columnOption.width"
    :fixed="columnOption.fixed"
    :sortable="columnOption.sortable"
  >
    <column 
      v-for="(option, index) in recursiveColumns"
      :key="index"
      :column-option="option"
    />
  </el-table-column>
</template>

<script>
export default {
  name: 'Column',

  props: {
    columnOption: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    recursiveColumns() {
      if (this.columnOption.children && this.columnOption.children.length) {
        return this.columnOption.children;
      }
      return [];
    }
  }
};
</script>
