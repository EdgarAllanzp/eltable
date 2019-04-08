## Table 表格

基于 `Element-UI` 封装的表格组件。

### 基础表格

基础的表格展示用法。

:::demo 在 `option` 中使用 `column` 属性定义表格列，`prop` 对应列的 key，`label` 对应列的显示名称，`width` 定义列宽，详情见下表 **Table-column**。`data` 为表格数据。

```html
  <template>
    <eltable :data="tableData" :option="tableOption"></eltable>
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            column: [
              {
                label: '日期',
                prop: 'date',
                width: '300px'
              },
              {
                label: '姓名',
                prop: 'name',
                width: 250
              },
              {
                label: '地址',
                prop: 'address'
              }
            ]
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::

### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
| data | 表格数据 | Array | - | - |
| option | 表格配置项，配置详情见下表 | Object | - | - |

### Option Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
| column | 列信息，详情见下表 | Array | - | [] |

### Table-column Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
| label | 显示的标题 | String | - | - |
| prop | 列的 Key | String | - | - |
| width | 对应列的宽度 | String / Number | - | - |

### Table Scoped Slot

| name | 说明 |
|------|-----|
| - | 自定义列的内容 |
