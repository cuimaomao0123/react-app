import React, { memo } from 'react';
import { columns, data } from './tableData'
import VirtualTable from '@/components/virtualTable'
import { DeviceDetailWrapper } from './style'
export default memo(function DeviceDetail() {

  return (
    <DeviceDetailWrapper>
      <VirtualTable dataSource={data}
                    columns={columns}
                    scroll={{y: 300, x:'100vw'}}
                    bordered={true}
      />
    </DeviceDetailWrapper>
  )
})
