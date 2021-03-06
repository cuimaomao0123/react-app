import { Image } from 'antd';
export const column1 = [
  { title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    width: 60
  },
  { title: '地点',
    dataIndex: 'site',
    key: 'site',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '地点类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '捕获时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '设备名称',
    dataIndex: 'facilityName',
    key: 'facilityName',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '最高温度℃',
    dataIndex: 'max',
    key: 'max',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: data => {
      return `${data} ℃`;
    }
  },
  { title: '最低温度℃',
    dataIndex: 'min',
    key: 'min',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: data => {
      return `${data} ℃`;
    }
  },
  { title: '中心温度℃',
    dataIndex: 'center',
    key: 'center',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: data => {
      return `${data} ℃`;
    }
  },
  { title: '平均温度 ℃',
    dataIndex: 'average',
    key: 'average',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: data => {
      return `${data} ℃`;
    }
  },
  { title: '图片编号',
  dataIndex: 'id',
  key: 'id',
  align: 'center',
  textWrap: 'word-break',
  ellipsis: true
  },
  { title: '图像',
    dataIndex: 'pictureUrl',
    key: 'pictureUrl',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: (data) => {
      return <Image 
      src={data}
      width={100}/>;
    }
  }
]
