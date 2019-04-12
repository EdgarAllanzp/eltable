<template>
  <li class="filter-conditon-item">
    <el-card shadow="hover">
      <p>{{ condition.field || '新条件' }}</p>
      <p>{{ message }}</p>
      <el-button 
        size="mini"
        icon="el-icon-close"
        circle
        @click="onDelete"
      />
    </el-card>
  </li>
</template>

<script>
export default {
  props: {
    condition: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },

  computed: {
    message() {
      const { operator, value } = this.condition;
      if (operator && value) {
        return `${operator} ${value}`;
      }
      return ' '
    }
  },

  methods: {
    onDelete() {
      this.$emit('delete', this.condition);
    }
  }
};
</script>

<style lang="scss">
.filter-conditon-item {
  list-style: none;

  .el-card {
    position: relative;
    margin-bottom: 8px;
  }

  .el-button {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }

  p {
    margin: 0;
  }
}
</style>
