<template>
  <div class="app-container page-container">
    <el-card>
      <doc />
    </el-card>
    <!-- <eltable
      :data="data"
      :option="option"
      :page="page"
      :row-class-name="tableRowClassName"
      :header-cell-class-name="headerCellClassName"
      @size-change="sizeChange"
      @page-change="pageChange"
      @on-load="onLoad"
      @refresh-change="refreshChange"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
      <template #city="scope">
        <a 
          target="_blank" 
          :href="`https://www.google.com/search?q=${scope.row.city.toLowerCase()}`"
        >
          {{ scope.row.city }}
        </a>
      </template>
    </eltable> -->
  </div>
</template>

<script>
import Eltable from '../src/index';
import { option, getData } from './mock';
import Doc from './doc';

export default {
  components: {
    Doc,
    Eltable
  },

  data() {
    return {
      option,
      data: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },

  async created() {
    // await this.getList();
  },

  methods: {
    async onLoad(page) {
      this.$message.success('分页信息：' + JSON.stringify(page));
      this.page = page;
      this.getList();
    },

    async getList() {
      const { currentPage, pageSize } = this.page;
      const offset = (currentPage - 1) * pageSize;
      const { data, total } = await getData(offset, pageSize);
      this.data = data;
      this.page.total = total;
    },

    sizeChange(val) {
      console.log('size-change: ' + val);
    },

    pageChange(val) {
      console.log('page-change: ' + val);
    },

    refreshChange(page) {
      cosnole.log('refresh-change: ' + JSON.stringify(page));
    },

    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 2) {
        return 'success-row';
      }
      return '';
    },

    headerCellClassName() {
      return 'table-header-ellipsis';
    },

    selectionChange(list) {
      this.$message.success('选中的数据：' + JSON.stringify(list));
    },

    sortChange(val) {
      this.$message.success('排序：' + JSON.stringify(val));
    }
  }
};
</script>

<style lang="scss">
.eltable {
  .table-header-ellipsis > .cell {
    white-space: nowrap;
    min-width: 50px;
  }
}
</style>
