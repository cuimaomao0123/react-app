import { Image } from 'antd';

export const column1 = [
  { title: '状态',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: () =>  <i className="iconfont icon-tubiaoshangshengqushi"></i> 
  },
  { title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '地点',
    dataIndex: 'loc',
    key: 'loc',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '图像',
    dataIndex: 'img',
    key: 'img',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    render: (img) => 
      <Image className="zmage" 
             src={img} 
             alt="加载中..."
      />
  }
]