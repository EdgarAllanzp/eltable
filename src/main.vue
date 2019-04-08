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
        @selection-change="selectionChange"
        @sort-change="sortChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
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
          :column-option="column"
        >
          <template #[column.prop]="scope">
            <slot 
              :name="column.prop"
              :row="scope.row"
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
          @current-change="currentChange"
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
    // 表格数据
    data: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },

    // 表格配置项
    option: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },

    // 分页
    page: {
      type: Object,
      default() {
        return {};
      }
    },

    // 为 Table 中的某一行添加 class
    rowClassName: {
      type: Function,
      default: null
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
        total: 0, // 数据总数
        currentPage: 1, // 当前页码
        pageSize: 10, // 当前页数据量
        pageSizes: [10, 20, 30, 40, 50, 100]
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
      this.defaultPage.total = this.page.total || 0;
      this.defaultPage.currentPage = this.page.currentPage || 1;
      this.defaultPage.pageSize = this.page.pageSize || 10;
      this.defaultPage.pageSizes = this.page.pageSizes || [
        10,
        20,
        30,
        40,
        50,
        100
      ];
    },

    // 页大小回调
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$emit('on-load', this.defaultPage);
      this.$emit('size-change', val);
    },

    // 页码回调
    currentChange(val) {
      this.$emit('on-load', this.defaultPage);
      this.$emit('current-change', val); },
   
    refreshChange() {
      this.$emit('refresh-change', this.defaultPage);
    },

    // 多选框回调
    selectionChange(val) {
      this.tableSelect = val;
      this.$emit('selection-change', this.tableSelect);
    },

    // 排序回调
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

    handleHeaderCellMouseEnter($event) {
      console.log($event);
    },

    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },

    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    }
  }
};
</script>
