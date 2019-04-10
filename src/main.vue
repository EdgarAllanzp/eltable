<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 表格功能列 -->
      <div :class="b('menu')">
        <div :class="b('left')"></div>
        <div :class="b('right')">
          <el-input
            placeholder="搜索列表"
            size="small"
            v-model="searchTerm"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-tooltip content="动态列" placement="top">
            <el-button 
              icon="el-icon-menu" 
              size="small"
              circle
              @click="initColumnBox"
            />
          </el-tooltip>
          <el-dropdown trigger="click" size="small">
            <el-tooltip content="过滤器设置" placement="top">
              <el-button 
                icon="el-icon-setting" 
                size="small"
                circle
              />
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>新建</el-dropdown-item>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 表格主体 -->
      <el-table 
        ref="table"
        :data="data"
        :height="option.height"
        :max-height="option.maxHeight"
        :border="option.border"
        :stripe="option.stripe"
        :default-sort="option.defaultSort"
        :highlight-current-row="option.highlightCurrentRow"
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
          v-if="option.selection"
          type="selection"
          width="50"
          fixed="left"
          align="center"
        />
        <!-- 表格数据列 -->
        <column 
          v-for="(column, index) in columns"
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
      <div :class="b('pagination')" v-if="page">
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

    <!-- 动态列 -->
    <el-dialog 
      title="动态列设置"
      :visible.sync="columnBox">
      <el-transfer 
        v-model="visibleColumnKeys"
        :titles="['隐藏的列', '显示的列']"
        :data="flattenColumnList"
      />
      <span slot="footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bem from './mixins/bem';
import Column from './components/column';
import { flattenArray } from './utils/utils';

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

    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },

    option: {
      type: Object,
      default() {
        return {};
      }
    },

    page: {
      type: [Object, Boolean],
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
      defaultPage: {
        total: -1,
        currentPage: -1,
        pageSize: -1,
        pageSizes: []
      },
      tableSelect: [],
      searchTerm: '',
      columnBox: false,
      flattenColumnList: [],
      visibleColumnKeys: []
    };
  },

  computed: {
  },

  watch: {
    columns: {
      handler() {
        this.columnInit();
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
    this.columnInit();
    this.pageInit();
  },

  methods: {
    columnInit() {
      this.flattenColumnList = flattenArray(this.columns, 'children')
        .map(column => {
          return {
            key: column.prop,
            label: column.label
          };
        });
      this.visibleColumnKeys = this.flattenColumnList.map(column => column.key);
    },

    pageInit() {
      this.defaultPage.total = this.page.total || this.data.length || 0;
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
      this.$emit('size-change', this.defaultPage);
    },

    pageChange(val) {
      this.$emit('page-change', this.defaultPage); },
   
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
    },

    initColumnBox() {
      this.columnBox = true;
    }
  }
};
</script>

<style lang="scss">
.eltable {

  &__menu {
    position: relative;
    width: 100%;
    min-height: 40px;
    height: auto;
    overflow: hidden;
    margin-bottom: 12px;
  }

  &__left,
  &__right {
    position: absolute;
    height: auto;
    overflow: hidden;
  }

  &__left {
    left: 0;
  }

  &__right {
    right: 0;

    .el-input {
      width: 200px;
      margin-right: 10px;
    }

    .el-button + .el-dropdown {
      margin-left: 10px;
    }
  }

  &__pagination {
    position: relative;
    height: 25px;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 10px 20px;

    .el-pagination {
        position: absolute;
        right: 0;
    }
  }
}
</style>
