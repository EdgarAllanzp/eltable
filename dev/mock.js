import dream from 'dreamjs';

const option = {
  emptyText: '自定义暂无数据提示语',
  maxHeight: 500,
  border: true,
  stripe: true,
  highlightCurrentRow: true,
  selection: true,
  column: [
    {
      label: 'ID',
      prop: 'id',
    },
    {
      label: 'Name',
      prop: 'name',
      children: [
        {
          width: 200,
          label: 'Firstname',
          prop: 'first'
        },
        {
          width: 200,
          label: 'Lastname',
          prop: 'last'
        }
      ]
    },
    {
      label: 'Gender',
      prop: 'gender',
      width: 200,
      filters: [
        {
          text: 'Male',
          value: 'male'
        },
        {
          text: 'Female',
          value: 'female'
        }
      ],
      filterMethod: (value, row, column) => {
        return row.gender.toLowerCase() === value;
      }
    },
    {
      label: 'Company',
      prop: 'company',
      width: 200
    },
    {
      label: 'City',
      prop: 'city',
      width: 200
    },
    {
      label: 'Age',
      prop: 'age',
      width: 200,
      sortable: true
    },
    {
      label: 'Birthday',
      prop: 'birthday',
      width: 200,
      format: 'yyyy-MM-dd',
      type: 'date'
    },
    {
      label: 'Email',
      prop: 'email',
      fixed: 'right'
    }
  ]
};

dream.customType(
  'incrementalId',
  (helper) => helper.previousItem ? helper.previousItem.id + 1 : 1
);

const data = dream
  .schema({
    id: 'incrementalId',
    first: 'first',
    last: 'last',
    gender: 'gender',
    company: 'company',
    city: 'city',
    age: 'age',
    birthday: 'birthday',
    email: 'email'
  })
  .generateRnd(100)
  .output();

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData(
  offset = 0,
  limit = 10,
  term = '',
  filter = {},
  sort = []
) {
  await timeout(200);
  const filtedData = data.slice(offset, offset + limit);
  return {
    data: filtedData,
    total: data.length
  };
}

export {
  option,
  data,
  getData
};
