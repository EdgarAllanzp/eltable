import dream from 'dreamjs';

const option = {
  emptyText: '自定义暂无数据提示语',
  height: 500,
  column: [
    {
      label: '姓名',
      prop: 'name'
    },
    {
      label: '性别',
      prop: 'gender'
    },
    {
      label: '公司',
      prop: 'company'
    },
    {
      label: '城市',
      prop: 'city'
    },
    {
      label: '年龄',
      prop: 'age'
    },
    {
      label: '生日',
      prop: 'birthday'
    },
    {
      label: '邮箱',
      prop: 'email'
    }
  ]
};

const data = dream
  .schema({
    id: 'guid',
    name: 'name',
    gender: 'gender',
    company: 'company',
    city: 'city',
    age: 'age',
    birthday: 'birthday',
    email: 'email'
  })
  .generateRnd(100)
  .output();

export {
  option,
  data
};
