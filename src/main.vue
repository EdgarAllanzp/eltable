<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 表格主体 -->
      <el-table 
        ref="table"
        :data="list"
        :height="tableOption.height"
        :max-height="tableOption.maxHeight"
        :border="tableOption.border"
        :stripe="tableOption.stripe"
        :default-sort="tableOption.defaultSort"
        :highlight-current-row="tableOption.highlightCurrentRow"
        :row-class-name="rowClassName"
        :header-cell-class-name="headerCellClassName"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @header-dragend="headerDragend"
      >
        <!-- 暂无数据提醒 -->
        <template slot="empty">
          <slot 
            v-if="$slots.empty"
            name="empty" 
          />
          <span 
            v-else
            style="cursor: pointer;"
            @click="refreshChange"
          >暂无数据，点击刷新</span>
        </template>
        <!-- 多选框 -->
        <el-table-column
          v-if="tableOption.selection"
          type="selection"
          width="50"
          fixed="left"
          align="center"
        />
        <!-- 表格数据列 -->
        <column 
          v-for="(column, index) in columnOption"
          :key="index"
          :index="index"
          :column-option="column"
        >
          <template #[column.prop]="scope">
            <slot 
              :name="column.prop"
              :row="scope.row"
              :column="scope.column"
              :$index="scope.$index"
            />
          </template>
        </column>
      </el-table>
      <!-- 分页 -->
      <div :class="b('pagination')">
        <el-pagination 
          :current-page.sync="defaultPage.currentPage"
          :page-size="defaultPage.pageSize"
          :page-sizes="defaultPage.pageSizes"
          layout="total, sizes, prev, pager, next, jumper" 
          :total="defaultPage.total"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import bem from './mixins/bem';
import Column from './components/column';

export default {
  name: 'Eltable',

  components: {
    Column
  },

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
    },

    page: {
      type: Object,
      default() {
        return {};
      }
    },

    rowClassName: {
      type: [Function, String],
      default: ''
    },

    headerCellClassName: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      clientHeight: document.documentElement.clientHeight,
      list: [],
      tableOption: {},
      defaultPage: {
        total: -1, // 数据总数
        currentPage: -1, // 当前页码
        pageSize: -1, // 当前页数据量
        pageSizes: []
      },
      tableSelect: []
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

    option: {
      handler() {
        this.init();
      },
      deep: true
    },

    page: {
      handler() {
        this.pageInit();
      },
      deep: true
    }
  },

  created() {
    this.init();
    // 初始化数据
    this.dataInit();
    // 初始化分页
    this.pageInit();
    this.$emit('on-load', this.defaultPage);
  },

  methods: {
    init() {
      this.tableOption = this.option;
    },

    dataInit() {
      this.list = [...this.data];
    },

    pageInit() {
      this.defaultPage.total = this.page.total || this.list.length || 0;
      this.defaultPage.currentPage = this.page.currentPage || 1;
      this.defaultPage.pageSize = this.page.pageSize || 10;
      this.defaultPage.pageSizes = this.page.pageSizes || [
        10,
        20,
        50,
        100
      ];
    },

    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$emit('on-load', this.defaultPage);
      this.$emit('size-change', val);
    },

    pageChange(val) {
      this.$emit('on-load', this.defaultPage);
      this.$emit('page-change', val); },
   
    refreshChange() {
      this.$emit('refresh-change', this.defaultPage);
    },

    selectionChange(selection) {
      this.tableSelect = selection;
      this.$emit('selection-change', this.tableSelect);
    },

    select(selection, row) {
      this.$emit('select', selection, row);
    },

    selectAll(selection) {
      this.$emit('select-all', selection);
    },

    sortChange(val) {
      this.$emit('sort-change', val);
    },

    clearSelection() {
      this.$refs.table.clearSelection();
    },

    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },

    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },

    clearSort() {
      this.$refs.table.clearSort();
    },

    sort(prop, order) {
      this.$refs.table.sort(prop, order);
    },

    clearFilter(columnKey) {
      this.$refs.table.clearFilter(columnKey);
    },

    filterChange(filters) {
      this.$emit('filter-change', filters);
    },

    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },

    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    },

    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event);
    }
  }
};
</script>
