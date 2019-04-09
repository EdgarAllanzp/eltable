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

### 带斑马纹的表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo 在 `option` 中使用 `stripe` 属性可以设置带斑马纹的表格。它接受一个`Boolean`，默认为`false`，设置为`true`即为启用。

```html
  <template>
    <eltable :data="tableData" :option="tableOption"></eltable>
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            stripe: true,
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

### 带边框的表格

带边框的表格可拖动调整列的宽度。

:::demo 在 `option` 中使用 `border` 属性可以设置带边框的表格。它接受一个`Boolean`，默认为`false`，设置为`true`即为启用。调整完列宽后会触发 `header-dragend` 事件。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
      @header-dragend="headerDragend"
    />
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            border: true,
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
      },

      methods: {
        headerDragend(newWidth, oldWidth, column, event) {
          this.$message.success(`newWidth: ${newWidth}, oldWidth: ${oldWidth}`);
        }
      }
    }
  </script>
```
:::

### 带状态的表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

:::demo 可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
      :row-class-name="tableRowClassName"
    />
  </template>

  <style>
    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
  </style>

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
      },

      methods: {
        tableRowClassName({ row, rowIndex }) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        }
      }
    }
  </script>
```
:::

### 固定表头

纵向内容过多时，可选择固定表头。

:::demo 在 `option` 中使用 `height` 属性可以设置固定表头的表格。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
    />
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            height: 250,
            border: true,
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
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      }
    }
  </script>
```
:::

### 固定列

横向内容过多时，可选择固定列。

:::demo 在 `option` 的 `column` 中设置 `fixed` 属性，即可实现固定列。它接受 Boolean 值或者`left` `right`，表示左边固定还是右边固定。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
    >
      <template #operation="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </eltable>
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            border: true,
            column: [
              {
                label: '日期',
                prop: 'date',
                width: 250,
                fixed: true
              },
              {
                label: '姓名',
                prop: 'name',
                width: 220
              },
              {
                label: '省份',
                prop: 'province',
                width: 220
              },
              {
                label: '市区',
                prop: 'city',
                width: 220
              },
              {
                label: '地址',
                prop: 'address',
                width: 400
              },
              {
                label: '邮编',
                prop: 'zip',
                width: 220
              },
              {
                label: '操作',
                prop: 'operation',
                width: 200,
                fixed: 'right'
              }
            ]
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
          }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333
          }]
        }
      },

      methods: {
        handleClick(row) {
          this.$message.success(JSON.stringify(row));
        }
      }
    }
  </script>
```
:::

### 固定列和表头

横纵内容过多时，可选择固定列和表头。

:::demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
    >
      <template #operation="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </eltable>
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            height: 250,
            border: true,
            column: [
              {
                label: '日期',
                prop: 'date',
                width: 250,
                fixed: true
              },
              {
                label: '姓名',
                prop: 'name',
                width: 220
              },
              {
                label: '省份',
                prop: 'province',
                width: 220
              },
              {
                label: '市区',
                prop: 'city',
                width: 220
              },
              {
                label: '地址',
                prop: 'address',
                width: 400
              },
              {
                label: '邮编',
                prop: 'zip',
                width: 220
              },
              {
                label: '操作',
                prop: 'operation',
                width: 200,
                fixed: 'right'
              }
            ]
          },
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }]
        }
      },

      methods: {
        handleClick(row) {
          this.$message.success(JSON.stringify(row));
        }
      }
    }
  </script>
```
:::

### 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

:::demo 在 `option` 中使用 `maxHeight` 属性可以设置表格的最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption"
    />
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            maxHeight: 250,
            border: true,
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
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      }
    }
  </script>
```
:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 在 `option` 的 `column` 属性中定义 `children` 属性，实现多级表头。

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
                width: 250
              },
              {
                label: '配送信息',
                children: [
                  {
                    label: '姓名',
                    prop: 'name',
                    width: 220
                  },
                  {
                    label: '地址',
                    children: [
                      {
                        label: '省份',
                        prop: 'province',
                        width: 220
                      },
                      {
                        label: '市区',
                        prop: 'city',
                        width: 220
                      },
                      {
                        label: '地址',
                        prop: 'address',
                        width: 400
                      }
                    ]
                  }
                ]
              }
            ]
          },
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }]
        }
      }
    }
  </script>
```
:::

### 多选

选择多行数据时使用 Checkbox。

:::demo 在 `option` 中使用 `selection` 属性设置多选列。

```html
  <template>
    <eltable 
      ref="multipleTable"
      :data="tableData" 
      :option="tableOption"
      @selection-change="selectionChange"
    />
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            selection: true,
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
      },

      methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },

        selectionChange(selection) {
          this.$message.success(JSON.stringify(selection));
        }
      }
    }
  </script>
```
:::

### 排序 

对表格进行排序，可快速查找或对比数据。

:::demo 在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。可以通过 Table option 的`default-sort`属性设置默认的排序列和排序顺序。可以使用`sort-method`或者`sort-by`使用自定义的排序规则。如果需要后端排序，需将`sortable`设置为`custom`，同时在 Table 上监听`sort-change`事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了`formatter`属性，它用于格式化指定列的值，接受一个`Function`，会传入两个参数：`row`和`column`，可以根据自己的需求进行处理。

```html
  <template>
    <eltable 
      :data="tableData" 
      :option="tableOption" 
    />
  </template>

  <script>
    export default {
      data() {
        return {
          tableOption: {
            defaultSort: {
              prop: 'date',
              order: 'descending'
            },
            column: [
              {
                label: '日期',
                prop: 'date',
                width: '300px',
                sortable: true
              },
              {
                label: '姓名',
                prop: 'name',
                width: 250
              },
              {
                label: '地址',
                prop: 'address',
                formatter: (row, column, cellValue, index) => {
                  return row.address;
                }
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

### 筛选

对表格进行筛选，可快速查找到自己想看的数据。

:::demo 在列中设置`filters` `filter-method`属性即可开启该列的筛选，filters 是一个数组，`filter-method`是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`, `row` 和 `column`。

```html
  <template>
    <eltable 
      ref="filterTable"
      :data="tableData" 
      :option="tableOption"
      @filter-change="filterChange"
    >
      <template #tag="scope">
        <el-tag 
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions
        >
          {{ scope.row.tag }}
        </el-tag>
      </template>
    </eltable>
    <div style="margin-top: 20px">
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
    </div>
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
                width: '300px',
                sortable: true,
                filters: [
                  {
                    text: '2016-05-01',
                    value: '2016-05-01'
                  },
                  {
                    text: '2016-05-02',
                    value: '2016-05-02'
                  },
                  {
                    text: '2016-05-03',
                    value: '2016-05-03'
                  },
                  {
                    text: '2016-05-04',
                    value: '2016-05-04'
                  }
                ],
                filterMethod: (value, row, column) => {
                  const property = column['property'];
                  return row[property] === value;
                }
              },
              {
                label: '姓名',
                prop: 'name',
                width: 250
              },
              {
                label: '地址',
                prop: 'address'
              },
              {
                label: '标签',
                prop: 'tag',
                width: 100,
                filters: [
                  {
                    text: '家',
                    value: '家'
                  },
                  {
                    text: '公司',
                    value: '公司'
                  }
                ],
                filterMethod: (value, row) => {
                  return row.tag === value;
                }
              }
            ]
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '公司'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司'
          }]
        }
      },

      methods: {
        resetDateFilter() {
          this.$refs.filterTable.clearFilter('date');
        },

        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },

        filterChange(filters) {
          this.$message.success(JSON.stringify(filters));
        }
      }
    }
  </script>
```
:::

### 自定义列模板

自定义列的显示内容，可组合其他组件使用。

:::demo 通过 `Scoped slot` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。
```html
  <template>
    <eltable :data="tableData" :option="tableOption">
      <template #date="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      <template #name="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" :style="{display: 'inline-block'}">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
      <template #operation="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </eltable>
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
                width: 180
              },
              {
                label: '操作',
                prop: 'operation'
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
      },

      methods: {
        handleEdit(index, row) {
          this.$message.success(`index: ${index}, row: ${JSON.stringify(row)}`);
        },

        handleDelete(index, row) {
          this.$message.success(`index: ${index}, row: ${JSON.stringify(row)}`);
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
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex}) / String | - | '' |

### Table Events

| 事件名 | 说明 | 参数 |
|-------|------|-----|
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| select-change | 当选择项发生变化时会触发该事件 | selection |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组 | filters |

### Table Methods

| 方法名 | 说明 | 参数 |
|-------|------|-----|
| clearSelection | 用于多选表格，清空用户的选择 | - |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selection |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 | - |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | - |
| sort | 手动对 Table 进行排序。参数`prop`属性指定排序列，`order`指定排序顺序。 | prop: string, order: string |
| clearFilter | 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件 | columnKey |

### Table Scoped Slot

| name | 说明 | 参数 |
|------|-----|------|
| 列的 prop | 自定义列的内容 | { row } |

### Option Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
| column | 列信息，详情见下表 | Array | - | [] |
| stripe | 是否为斑马纹 table | Boolean | - | false |
| border | 是否为带边框 table | Boolean | - | false |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式 | String / Number | - | - |
| maxHeight | Table 的最大高度 | String / Number | - | - |
| selection | 行可勾选 | Boolean | - | false |
| defaultSort | 默认的排序列的 prop 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序| Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| sortMethod | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致 | Function(a, b) | - | - |
| sortBy | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | String/Array/Function(row, index) | - | - |
| type | 与 `format` 结合使用，对日期时间格式化 | String | 'date', 'time', 'datetime' | - |
| format | 与 `type` 结合使用，内部使用 dayjs 对日期时间格式化 | String | 格式化字符串，例如：'yyyy-MM-dd' | - |

### Table-column Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
| label | 显示的标题 | String | - | - |
| prop | 列的 Key | String | - | - |
| width | 对应列的宽度 | String / Number | - | - |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | String / Boolean | true, left, right | - |
| children | 嵌套 column，用于多级表头 | Column Object | - | - |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | Boolean / String | true, false, 'custom'	 | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性 | Array[{ text, value }] | - | - |
| filterMethod | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示 | Function(value, row, column) | - | - |
