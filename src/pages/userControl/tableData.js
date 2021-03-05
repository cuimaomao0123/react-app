import { getFullTime } from '@/utils/date'
export const columns1 = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 100
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 300
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'forbidden',
    key: 'forbidden',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: (data) => {
      const res = data.substring(9)
      return `********${res}`;
    }
  },
  {
    title: '登录有效截止日期',
    dataIndex: 'expireTime',
    key: 'expireTime',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: (data) => {
      return getFullTime(data);
    }
  },
  {
    title: '上一次登录时间',
    dataIndex: 'loginTime',
    key: 'loginTime',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  }
]