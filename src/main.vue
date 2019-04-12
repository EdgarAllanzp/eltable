<template>
  <div :class="b()">
    <el-card 
      :class="b('box')"
      :body-style="{
        position: 'relative'
      }"
    >
      <!-- 表格头部 -->
      <div 
        :class="b('header')"
        slot="header"
      >
        <!-- 自定义表格头部 -->
        <slot 
          name="header"
          :tableOption="option"
        />
        <!-- 表格功能列 -->
        <div :class="b('menu')">
          <div :class="b('left')" v-if="hasListViews">
            <el-select
              :disabled="Boolean(editingListView)"
              v-model="currentListView"
              @change="listViewChange"
              placeholder="请选择"
            >
              <el-option-group label="常用检索列表">
                <el-option 
                  v-for="listView in listViews"
                  :key="listView.id"
                  :label="listView.name"
                  :value="listView"
                />
              </el-option-group>
            </el-select>
          </div>
          <div :class="b('right')">
            <el-input
              placeholder="搜索列表"
              size="small"
              v-model.trim="searchTerm"
              @keyup.enter.native="searchChange"
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
            <el-dropdown 
              v-if="hasListViews"
              trigger="click" 
              size="small" 
              @command="listViewSetting"
            >
              <el-tooltip content="常用检索设置" placement="top">
                <el-button 
                  icon="el-icon-setting" 
                  size="small"
                  circle
                />
              </el-tooltip>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="new">新增</el-dropdown-item>
                <el-dropdown-item command="edit">修改</el-dropdown-item>
                <el-dropdown-item 
                  command="delete"
                  :disabled="!currentListView.deletable">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
          v-for="column in displayColumns"
          :key="column.prop"
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

      <!-- 常用检索设置面板 -->
      <slide-x-right-transition>
        <el-card 
          v-if="editingListView && showListViewPanel"
          :class="b('filters--panel')"
        >
          <div slot="header">
            <span>{{ editingListView.name }}</span>
            <i class="el-icon-back close-btn" @click="closeListViewPanel"></i>
          </div>
          <slide-y-up-transition
            v-if="editingListView.conditions.length"
            tag="ul"
            class="condition-list"
            group
          >
            <condition
              v-for="condition in editingListView.conditions"
              :key="condition.id"
              :condition="condition"
              @delete="conditionDelete"
            />
          </slide-y-up-transition>
          <span v-else>暂时没有条件</span>
          <div class="filter-condition-btn">
            <el-button type="text" class="add" @click="addCondition">新增条件</el-button>
            <el-button type="text" class="clear" @click="removeConditions">清空条件</el-button>
          </div>
        </el-card>
      </slide-x-right-transition>
    </el-card>

    <!-- 动态列 -->
    <el-dialog 
      title="动态列设置"
      :custom-class="b('columnbox')"
      :visible.sync="columnBox">
      <el-transfer 
        v-model="visibleColumnKeys"
        :class="b('columnbox--transfer')"
        :titles="['隐藏的列', '显示的列']"
        :data="flattenColumnList"
      />
      <span slot="footer">
        <el-button type="primary" size="medium" @click="setDynamicColumns">确定</el-button>
        <el-button size="medium" @click="columnBox = false;">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bem from './mixins/bem';
import Column from './components/column';
import Condition from './components/condition';
import { flattenArray, guid } from './utils/utils';
import cloneDeep from 'clone-deep';
import { SlideXRightTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'Eltable',

  components: {
    Column,
    Condition,
    SlideYUpTransition,
    SlideXRightTransition
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
    },

    listViews: {
      type: Array,
      default() {
        return [];
      }
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
      showListViewPanel: false,
      currentListView: null,
      editingListView: null,
      tableSelect: [],
      searchTerm: '',
      displayColumns: [],
      columnBox: false,
      flattenColumnList: [],
      visibleColumnKeys: []
    };
  },

  computed: {
    hasListViews() {
      return Boolean(this.listViews.length);
    }
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
    this.listViewInit();
    this.columnInit();
    this.pageInit();
  },

  methods: {
    listViewInit() {
      if (this.hasListViews) {
        this.currentListView = this.listViews[0];
      }
    },

    columnInit() {
      this.displayColumns = cloneDeep(this.columns);
      this.flattenColumnList = flattenArray(this.displayColumns, 'children')
        .map(column => {
          return {
            key: column.prop,
            label: column.label
          };
        });
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

    initColumnBox() {
      this.visibleColumnKeys = flattenArray(this.displayColumns, 'children').map(column => column.prop);
      this.columnBox = true;
    },

    setDynamicColumns() {
      const visibleColumnKeys = this.visibleColumnKeys;
      const traverseColumn = columns => {
        const cloneColumns = [];
        columns.forEach(col => {
          if (visibleColumnKeys.indexOf(col.prop) !== -1) {
            const newColumn = { ...col };
            if (col.children && col.children.length) {
              this.$set(newColumn, 'children', traverseColumn(col.children));
            }
            cloneColumns.push(newColumn);
          }
        });
        return cloneColumns;
      };
      this.displayColumns = traverseColumn(this.columns);
      this.columnBox = false;
    },

    listViewSetting(command) {
      switch (command) {
        case 'edit':
        this.initFilterPanel();
        break;
      }
    },

    initFilterPanel() {
      if (!this.currentListView) {
        return;
      }
      this.editingListView = cloneDeep(this.currentListView);
      this.showListViewPanel = true;
    },

    closeListViewPanel() {
      this.showListViewPanel = false;
      this.editingListView = null;
    },

    conditionDelete({ id, field, operator, value }) {
      const index = this.editingListView.conditions.map(cond => cond.id).indexOf(id);
      if (index >= 0) {
        this.editingListView.conditions.splice(index, 1);
      }
    },

    addCondition() {
      this.editingListView.conditions.push({ id: guid() });
    },

    removeConditions() {
      this.editingListView.conditions = [];
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

    searchChange() {
      this.$emit('search-change', this.searchTerm, this.currentListView);
    },

    listViewChange(listView) {
      this.$emit('list-view-change', this.searchTerm, listView);
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

<style lang="scss">
.eltable {

  &__menu {
    position: relative;
    width: 100%;
    min-height: 40px;
    height: auto;
    overflow: hidden;
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

  &__filters--panel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 320px;
    z-index: 2;

    .el-card__header {
      position: relative;
      height: 60px;
    }

    .el-card__body {
      height: calc(100% - 100px);
      overflow: auto;
    }

    .close-btn {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%) rotateZ(180deg);
      cursor: pointer;
    }

    .filter-condition-btn {
      position: relative;
      height: 60px;

      .el-button {
        position: absolute;
      }

      .add {
        left: 0;
      }

      .clear {
        right: 0;
      }
    }

    .condition-list {
      padding-left: 0;
      margin: 0;
    }
  }
}

.el-dialog.eltable__columnbox {
  .el-dialog__header {
    text-align: center;
  }

  .el-dialog__body {
    text-align: center;
  }

  .eltable__columnbox--transfer {
    display: inline-block;
    text-align: initial;
  }
}
</style>
