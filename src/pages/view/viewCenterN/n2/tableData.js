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
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true
  },
  { title: '地点',
    dataIndex: 'site',
    key: 'site',
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
    render: (img) => 
      <Image className="zmage" 
             src={img} 
             alt="加载中..."
      />
  }
]