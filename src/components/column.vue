<template>
  <el-table-column
    :label="columnOption.label"
    :prop="columnOption.prop"
    :column-key="columnOption.prop"
    :width="columnOption.width"
    :fixed="columnOption.fixed"
    :sortable="columnOption.sortable"
    :sort-method="columnOption.sortMethod"
    :sort-by="columnOption.sortBy"
    filter-placement="bottom-end"
    :filters="columnOption.filters"
    :filter-method="columnOption.filterMethod"
    :render-header="columnOption.renderHeader"
    show-overflow-tooltip
  >
    <column 
      v-for="(option, index) in recursiveColumns"
      :key="index"
      :column-option="option"
    />
    <template #default="scope">
      <slot
        :name="columnOption.prop"
        :row="scope.row"
        :column="scope.column"
        :$index="scope.$index"
      >
        {{ formatData(scope.row, columnOption, scope.column, scope.$index) }}
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import { validatenull } from '../utils/validate';
import dayjs from 'dayjs';

export default {
  name: 'Column',

  props: {
    index: {
      type: Number,
      default: -1
    },

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
  },

  methods: {
    formatData(row, columnOption, column, index) {
      const { type, prop, formatter } = columnOption;
      let result = row[prop];

      if (validatenull(result)) {
        result = '-';
      }

      if (type) {
        if (
          ['date', 'time', 'datetime'].includes(type) && 
          columnOption.format &&
          !validatenull(result)
        ) {
          const format = columnOption.format
            .replace('dd', 'DD')
            .replace('yyyy', 'YYYY');
          result = dayjs(result).format(format);
        }
      }

      if (columnOption.formatter && typeof columnOption.formatter === 'function') {
        result = columnOption.formatter(row, column, row[prop], index);
      }
      return result;
    }
  }
};
</script>
