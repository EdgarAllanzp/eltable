<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 表格主体 -->
      <el-table :data="list">
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
        <el-table-column
          v-for="(column, index) in columnOption"
          :key="index"
          :label="column.label"
          :prop="column.prop"
        />
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

export default {
  name: 'Eltable',

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
    }
  },

  data() {
    return {
      list: [],
      tableOption: {},
      defaultPage: {
        total: 0, // 数据总数
        currentPage: 1, // 当前页码
        pageSize: 10, // 当前页数据量
        pageSizes: [10, 20, 30, 40, 50, 100]
      }
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

    columnInit() {
      console.log('column init');
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
      this.$emit('current-change', val);
    },

    refreshChange() {
      this.$emit('refresh-change');
    }
  }
};
</script>
