export const column1 = [
  { title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 60
  },
  { title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 80
  },
  { title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 60
  },
  { title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 60
  },
  { title: '体温',
  dataIndex: 'heat',
  key: 'heat',
  align: 'center',
  textWrap: 'word-break',
  ellipsis: true,
  width: 60
},
  { title: '居住地',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 160
  },
  { title: '身份证号',
    dataIndex: 'identity',
    key: 'identity',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 160
  },
  { title: '手机号',
    dataIndex: 'iphone',
    key: 'iphone',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 120
  },
  { title: '异常图像编号',
    dataIndex: 'pictureId',
    key: 'pictureId',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 110
  },
  { title: '近14天到访地',
    dataIndex: 'goSite',
    key: 'goSite',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 150,
    render: (data) => {
      return data === ('' || null) ? '无' : data;
    }
  },
  { title: '近14天有无病例',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 150,
    render: (data) => {
      return data === ('' || null) ? '无' : data;
    }
  },
  { title: '近14天有去过高风险地区',
    dataIndex: 'go',
    key: 'go',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 150,
    render: (data) => {
      return data === ('' || null) ? '无' : data;
    }
  },
  { title: '近14天有无接触过患者',
    dataIndex: 'contact',
    key: 'contact',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 150,
    render: (data) => {
      return data === ('' || null) ? '无' : data;
    }
  },
  { title: '设备采集地',
    dataIndex: 'site',
    key: 'site',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 100
  },
  { title: '采集时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 150
  }
]